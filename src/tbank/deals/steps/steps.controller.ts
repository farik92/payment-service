import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { StepsService } from './steps.service';
//import { CreateStepDto } from './dto/create-step.dto';
//import { UpdateStepDto } from './dto/update-step.dto';

@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Post(':dealId')
  async create(@Param('dealId') dealId: string, @Body() body) {
    return await this.stepsService.create(dealId, body);
  }

  @Get(':dealId')
  async findAll(@Param('dealId') dealId: string) {
    return await this.stepsService.findAll(dealId);
  }

  @Put(':id')
  update(
    @Param('dealId') dealId: string,
    @Param('id') id: string,
    @Body() body,
  ) {
    return this.stepsService.update(dealId, id, body);
  }

  @Delete(':id')
  remove(@Param('dealId') dealId: string, @Param('id') id: string) {
    return this.stepsService.remove(dealId, id);
  }
}
