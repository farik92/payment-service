import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  DefaultValuePipe,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Бенефициары')
@Controller('beneficiaries')
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) {}

  @Get('scoring')
  @ApiQuery({
    name: 'beneficiaryId',
    type: String,
    required: false,
    description:
      'Идентификатор бенефициара, по которому необходимо вернуть результаты проверки. Если вы не передаете параметр, возвращаются результаты по всем бенефициарам.',
  })
  @ApiQuery({
    name: 'passed',
    type: Boolean,
    required: false,
    description: 'Фильтр по результату проверки (прошел/не прошел).',
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description:
      'Количество результатов проверки, которое нужно пропустить. Значение по умолчанию — 0',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description:
      'Количество результатов проверки, которое нужно вывести. Значение по умолчанию — 50',
  })
  async scoring(
    @Query('beneficiaryId') beneficiaryId?: string,
    @Query('passed') passed: boolean = true,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number = 0,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number = 50,
  ): Promise<any> {
    return await this.beneficiariesService.scoring(
      beneficiaryId,
      passed,
      offset,
      limit,
    );
  }

  @Get()
  async findAll(@Query() params: any): Promise<any> {
    return await this.beneficiariesService.findAll(params.offset);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<any> {
    return await this.beneficiariesService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(
    @Body() createBeneficiaryDto: CreateBeneficiaryDto,
  ): Promise<any> {
    try {
      return await this.beneficiariesService.create(createBeneficiaryDto);
    } catch (error) {
      throw new BadRequestException(
        `Failed to create beneficiary: ${error.message}`,
      );
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Body() createBeneficiaryDto: CreateBeneficiaryDto,
    @Param('id') id: string,
  ): Promise<any> {
    return await this.beneficiariesService.update(createBeneficiaryDto, id);
  }
}
