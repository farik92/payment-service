import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeponentsService } from './deponents.service';
import { CreateDeponentDto } from './dto/create-deponent.dto';
import { UpdateDeponentDto } from './dto/update-deponent.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Депоненты')
@Controller('deponents')
export class DeponentsController {
  constructor(private readonly deponentsService: DeponentsService) {}

  @Post()
  create(@Body() createDeponentDto: CreateDeponentDto) {
    return this.deponentsService.create(createDeponentDto);
  }

  @Get()
  findAll() {
    return this.deponentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deponentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeponentDto: UpdateDeponentDto,
  ) {
    return this.deponentsService.update(+id, updateDeponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deponentsService.remove(+id);
  }
}
