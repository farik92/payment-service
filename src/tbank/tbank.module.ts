import { Module } from '@nestjs/common';
import { TbankService } from './tbank.service';
import { TbankController } from './tbank.controller';
import { BeneficiariesController } from './beneficiaries/beneficiaries.controller';
import { BeneficiariesModule } from './beneficiaries/beneficiaries.module';
import { BeneficiariesService } from './beneficiaries/beneficiaries.service';
import { DealsController } from './deals/deals.controller';
import { DealsModule } from './deals/deals.module';
import { DealsService } from './deals/deals.service';

@Module({
  imports: [BeneficiariesModule, DealsModule],
  providers: [TbankService, DealsService, BeneficiariesService],
  controllers: [TbankController, BeneficiariesController],
  exports: [],
})
export class TbankModule {}
