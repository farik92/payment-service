import { Module } from '@nestjs/common';
import { TbankService } from './tbank.service';
import { TbankController } from './tbank.controller';
import { BeneficiariesController } from './beneficiaries/beneficiaries.controller';
import { BeneficiariesModule } from './beneficiaries/beneficiaries.module';
import { BeneficiariesService } from './beneficiaries/beneficiaries.service';
import { BankDetailsController } from './beneficiaries/bank-details/bank-details.controller';
import { BankDetailsModule } from './beneficiaries/bank-details/bank-details.module';
import { BankDetailsService } from './beneficiaries/bank-details/bank-details.service';
import { DealsController } from './deals/deals.controller';
import { DealsModule } from './deals/deals.module';
import { DealsService } from './deals/deals.service';

@Module({
  imports: [BeneficiariesModule, BankDetailsModule, DealsModule],
  providers: [
    TbankService,
    BankDetailsService,
    BeneficiariesService,
    DealsService,
  ],
  controllers: [
    TbankController,
    BeneficiariesController,
    BankDetailsController,
    DealsController,
  ],
  exports: [TbankService, BeneficiariesService, DealsService],
})
export class TbankModule {}
