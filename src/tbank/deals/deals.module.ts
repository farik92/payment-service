import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { StepsModule } from './steps/steps.module';
import { TbankService } from '../tbank.service';
import { RecipientsModule } from './recipients/recipients.module';
import { DeponentsModule } from './deponents/deponents.module';

@Module({
  providers: [DealsService, TbankService],
  imports: [StepsModule, RecipientsModule, DeponentsModule],
})
export class DealsModule {}
