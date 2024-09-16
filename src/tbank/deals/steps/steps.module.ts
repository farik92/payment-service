import { Module } from '@nestjs/common';
import { StepsService } from './steps.service';
import { StepsController } from './steps.controller';
import { TbankService } from '../../tbank.service';

@Module({
  controllers: [StepsController],
  providers: [StepsService, TbankService],
})
export class StepsModule {}
