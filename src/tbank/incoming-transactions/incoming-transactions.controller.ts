import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IncomingTransactionsService } from './incoming-transactions.service';
import { CreateIncomingTransactionDto } from './dto/create-incoming-transaction.dto';
import { UpdateIncomingTransactionDto } from './dto/update-incoming-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Неидентифицированные пополнении')
@Controller('incoming-transactions')
export class IncomingTransactionsController {
  constructor(
    private readonly incomingTransactionsService: IncomingTransactionsService,
  ) {}

  @Post()
  create(@Body() createIncomingTransactionDto: CreateIncomingTransactionDto) {
    return this.incomingTransactionsService.create(
      createIncomingTransactionDto,
    );
  }

  @Get()
  findAll() {
    return this.incomingTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomingTransactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIncomingTransactionDto: UpdateIncomingTransactionDto,
  ) {
    return this.incomingTransactionsService.update(
      +id,
      updateIncomingTransactionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomingTransactionsService.remove(+id);
  }
}
