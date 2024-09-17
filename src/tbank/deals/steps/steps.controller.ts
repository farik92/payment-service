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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Этапы сделки')
@Controller('deals')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Post(':dealId/steps')
  async create(@Param('dealId') dealId: string, @Body() body) {
    return await this.stepsService.create(dealId, body);
  }

  @Get(':dealId/steps')
  async findAll(@Param('dealId') dealId: string) {
    return await this.stepsService.findAll(dealId);
  }

  @Put(':dealId/steps/:stepId')
  update(
    @Param('dealId') dealId: string,
    @Param('stepId') stepId: string,
    @Body() body,
  ) {
    return this.stepsService.update(dealId, stepId, body);
  }

  @Delete(':dealId/steps/:stepId')
  remove(@Param('dealId') dealId: string, @Param('stepId') stepId: string) {
    return this.stepsService.remove(dealId, stepId);
  }

  @Post(':dealId/steps/:stepId/complete')
  async complete(
    @Param('dealId') dealId: string,
    @Param('stepId') stepId: string,
  ) {
    return await this.stepsService.complete(dealId, stepId);
  }
}
