import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TbankService } from './tbank.service';
import { TbankController } from './tbank.controller';

@Module({
  imports: [HttpModule],
  providers: [TbankService],
  controllers: [TbankController],
  exports: [TbankService],
})
export class TbankModule {}
