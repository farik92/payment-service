import { Test, TestingModule } from '@nestjs/testing';
import { TbankService } from './tbank.service';

describe('TbankService', () => {
  let service: TbankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TbankService],
    }).compile();

    service = module.get<TbankService>(TbankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
