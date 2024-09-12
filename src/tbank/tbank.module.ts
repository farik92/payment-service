import { Module } from '@nestjs/common';
import { TbankService } from './tbank.service';
import { TbankController } from './tbank.controller';

@Module({
  imports: [],
  providers: [TbankService],
  controllers: [TbankController],
  exports: [TbankService],
})
export class TbankModule {}
