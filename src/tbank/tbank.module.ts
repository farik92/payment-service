import { Module } from '@nestjs/common';
import { TbankService } from './tbank.service';
import { TbankController } from './tbank.controller';
import { BeneficiariesController } from './beneficiaries/beneficiaries.controller';
import { BeneficiariesModule } from './beneficiaries/beneficiaries.module';
import { BeneficiariesService } from './beneficiaries/beneficiaries.service';
import { DealsController } from './deals/deals.controller';
import { DealsModule } from './deals/deals.module';
import { DealsService } from './deals/deals.service';
import { IncomingTransactionsModule } from './incoming-transactions/incoming-transactions.module';
import { PaymentsModule } from './payments/payments.module';
import { VirtualAccountsModule } from './virtual-accounts/virtual-accounts.module';

@Module({
  imports: [
    BeneficiariesModule,
    DealsModule,
    IncomingTransactionsModule,
    PaymentsModule,
    VirtualAccountsModule,
  ],
  providers: [TbankService, BeneficiariesService, DealsService],
  controllers: [BeneficiariesController, DealsController],
  exports: [],
})
export class TbankModule {}
