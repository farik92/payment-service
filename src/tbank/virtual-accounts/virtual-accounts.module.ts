import { Module } from '@nestjs/common';
import { VirtualAccountsService } from './virtual-accounts.service';
import { VirtualAccountsController } from './virtual-accounts.controller';
import { TbankService } from '../tbank.service';

@Module({
  controllers: [VirtualAccountsController],
  providers: [VirtualAccountsService, TbankService],
})
export class VirtualAccountsModule {}
