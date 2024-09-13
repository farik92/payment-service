import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TbankService } from './tbank.service';

@Controller('tbank')
export class TbankController {
  constructor(private readonly tbankService: TbankService) {}

  @Get('steps')
  async getDealSteps(@Param('dealId') dealId: string) {
    return await this.tbankService.getDealSteps(dealId);
  }

  @Post('steps')
  async createDealStep(
    @Param('dealId') dealId: string,
    @Param('description') description: string,
  ) {
    return await this.tbankService.createDealSteps(dealId, description);
  }

  @Delete('steps')
  async deleteDealSteps(
    @Param('dealId') dealId: string,
    @Param('stepId') stepId: string,
  ) {
    return await this.tbankService.deleteDealSteps(dealId, stepId);
  }

  async updateDealSteps(
    @Param('dealId') dealId: string,
    @Param('stepId') stepId: string,
    @Param('description') description: string,
  ) {
    return await this.tbankService.updateDealSteps(dealId, stepId, description);
  }

  async completeDealSteps(
    @Param('dealId') dealId: string,
    @Param('stepId') stepId: string,
  ) {
    return await this.tbankService.completeDealSteps(dealId, stepId);
  }

  @Get('balance')
  async getBalance(@Query('id') beneficiaryId: string) {
    if (!beneficiaryId) {
      throw new BadRequestException('Beneficiary ID is required');
    }

    try {
      return await this.tbankService.getBalance(beneficiaryId);
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch balance: ${error.message}`,
      );
    }
  }
}
