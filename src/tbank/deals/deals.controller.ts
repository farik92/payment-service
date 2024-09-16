import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { DealsService } from './deals.service';

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

  @Get(':id/is-valid')
  async isValid(@Param('id') id: string) {
    return await this.dealsService.isValid(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dealsService.remove(id);
  }
}
