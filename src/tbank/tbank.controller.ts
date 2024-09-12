import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TbankService } from './tbank.service';
import { Request } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { CreateBeneficiaryIpDto } from './dto/create-beneficiary-ip.dto';
import { CreateBeneficiarySeDto } from './dto/create-beneficiary-se.dto';

@Controller('tbank')
export class TbankController {
  constructor(private readonly tbankService: TbankService) {}

  @Get('beneficiaries')
  async getBeneficiaries() {
    return await this.tbankService.getBeneficiaries();
  }

  @Post('beneficiaries')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createBeneficiary(@Body() body: any) {
    const { type } = body;
    let dto:
      | CreateBeneficiaryDto
      | CreateBeneficiaryIpDto
      | CreateBeneficiarySeDto;
    if (type === 'UL_RESIDENT') {
      console.log('Beneficiary type is UL_RESIDENT');
      dto = plainToInstance(CreateBeneficiaryDto, body);
    } else if (type === 'IP_RESIDENT') {
      console.log('Beneficiary type is IP_RESIDENT');
      dto = plainToInstance(CreateBeneficiaryIpDto, body);
    } else if (type === 'FL_RESIDENT') {
      console.log('Beneficiary type is FL_RESIDENT');
      dto = plainToInstance(CreateBeneficiarySeDto, body);
    } else {
      throw new BadRequestException('Invalid beneficiary type');
    }

    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return await this.tbankService.createBeneficiary(dto);
  }

  @Get('balance')
  async getBalance(@Req() request: Request) {
    return await this.tbankService.getBalance(request.query.id);
  }

  @Post('make')
  async makePayment(@Req() request: Request) {
    return await request.body;
  }
}
