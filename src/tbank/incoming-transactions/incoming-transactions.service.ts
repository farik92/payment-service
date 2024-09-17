import { Injectable } from '@nestjs/common';
import { CreateIncomingTransactionDto } from './dto/create-incoming-transaction.dto';
import { UpdateIncomingTransactionDto } from './dto/update-incoming-transaction.dto';

@Injectable()
export class IncomingTransactionsService {
  create(createIncomingTransactionDto: CreateIncomingTransactionDto) {
    return 'This action adds a new incomingTransaction';
  }

  findAll() {
    return `This action returns all incomingTransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incomingTransaction`;
  }

  update(id: number, updateIncomingTransactionDto: UpdateIncomingTransactionDto) {
    return `This action updates a #${id} incomingTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} incomingTransaction`;
  }
}
