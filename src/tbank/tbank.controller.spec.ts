import { Test, TestingModule } from '@nestjs/testing';
import { TbankController } from './tbank.controller';

describe('TbankController', () => {
  let controller: TbankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TbankController],
    }).compile();

    controller = module.get<TbankController>(TbankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
