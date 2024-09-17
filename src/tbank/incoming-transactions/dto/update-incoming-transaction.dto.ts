import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomingTransactionDto } from './create-incoming-transaction.dto';

export class UpdateIncomingTransactionDto extends PartialType(CreateIncomingTransactionDto) {}
