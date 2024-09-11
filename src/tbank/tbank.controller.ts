import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TbankService } from './tbank.service';
import { Request } from 'express';

@Controller('tbank')
export class TbankController {
  constructor(private readonly tbankService: TbankService) {}

  @Get('beneficiaries')
  async getBeneficiaries(@Req() request: Request) {
    return await this.tbankService.getBeneficiaries();
  }

  @Post('beneficiaries')
  createBeneficiary(@Req() request: Request, @Body() body: any) {
    //return request.headers;
    return this.tbankService.createBeneficiary(body);
  }

  @Post('make')
  async makePayment(@Req() request: Request) {
    return await request.body;
  }
}
