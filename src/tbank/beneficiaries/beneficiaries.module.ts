import { Module } from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { BankDetailsController } from './bank-details/bank-details.controller';
import { BankDetailsModule } from './bank-details/bank-details.module';
import { TbankService } from '../tbank.service';

@Module({
  providers: [BeneficiariesService, TbankService],
  controllers: [BankDetailsController],
  imports: [BankDetailsModule],
  exports: [BeneficiariesService],
})
export class BeneficiariesModule {}
