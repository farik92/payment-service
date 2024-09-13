import { Module } from '@nestjs/common';
import { BankDetailsService } from './bank-details.service';

@Module({
  providers: [BankDetailsService]
})
export class BankDetailsModule {}
