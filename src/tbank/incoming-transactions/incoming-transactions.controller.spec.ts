import { Test, TestingModule } from '@nestjs/testing';
import { IncomingTransactionsController } from './incoming-transactions.controller';
import { IncomingTransactionsService } from './incoming-transactions.service';

describe('IncomingTransactionsController', () => {
  let controller: IncomingTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomingTransactionsController],
      providers: [IncomingTransactionsService],
    }).compile();

    controller = module.get<IncomingTransactionsController>(IncomingTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
