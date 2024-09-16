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
} from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';

@Controller('beneficiaries')
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) {}

  @Get()
  async findAll(@Query() params: any) {
    return await this.beneficiariesService.findAll(params.offset);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.beneficiariesService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createBeneficiaryDto: CreateBeneficiaryDto) {
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
  ) {
    return await this.beneficiariesService.update(createBeneficiaryDto, id);
  }

  @Get('scoring')
  async scoringAll() {
    return await this.beneficiariesService.scoringAll();
  }

  @Get('scoring/:id')
  async scoringOne(@Param('id') id: string) {
    const response = await this.beneficiariesService.scoringOne(id);
    console.log(response['results'].length);
    if (response['results'].length !== 0) {
      return response['results'][0].errors[0].description;
    }
    return response;
  }
}
