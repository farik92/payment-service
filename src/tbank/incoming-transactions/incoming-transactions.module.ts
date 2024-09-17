import { Module } from '@nestjs/common';
import { IncomingTransactionsService } from './incoming-transactions.service';
import { IncomingTransactionsController } from './incoming-transactions.controller';

@Module({
  controllers: [IncomingTransactionsController],
  providers: [IncomingTransactionsService],
})
export class IncomingTransactionsModule {}
