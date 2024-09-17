import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { TbankService } from './tbank.service';

@Controller('tbank')
export class TbankController {
  constructor(private readonly tbankService: TbankService) {}

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
