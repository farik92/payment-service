import { Test, TestingModule } from '@nestjs/testing';
import { IncomingTransactionsService } from './incoming-transactions.service';

describe('IncomingTransactionsService', () => {
  let service: IncomingTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomingTransactionsService],
    }).compile();

    service = module.get<IncomingTransactionsService>(IncomingTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
