import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  async create() {
    return await this.dealsService.create();
  }

  @Get()
  async findAll() {
    return await this.dealsService.findAll();
  }

  @Post(':id/draft')
  async toDraft(@Param('id') id: string) {
    return await this.dealsService.toDraft(id);
  }

  @Post(':id/accept')
  async accept(@Param('id') id: string) {
    return await this.dealsService.accept(id);
  }

  @Post(':id/cancel')
  async cancel(@Param('id') id: string) {
    return await this.dealsService.cancel(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dealsService.remove(id);
  }
}
