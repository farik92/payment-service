import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';
import { StepsModule } from './steps/steps.module';
import { TbankService } from '../tbank.service';

@Module({
  controllers: [DealsController],
  providers: [DealsService, TbankService],
  imports: [StepsModule],
})
export class DealsModule {}
