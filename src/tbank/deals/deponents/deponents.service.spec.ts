import { Test, TestingModule } from '@nestjs/testing';
import { DeponentsService } from './deponents.service';

describe('DeponentsService', () => {
  let service: DeponentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeponentsService],
    }).compile();

    service = module.get<DeponentsService>(DeponentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
