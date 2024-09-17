import { Test, TestingModule } from '@nestjs/testing';
import { DeponentsController } from './deponents.controller';
import { DeponentsService } from './deponents.service';

describe('DeponentsController', () => {
  let controller: DeponentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeponentsController],
      providers: [DeponentsService],
    }).compile();

    controller = module.get<DeponentsController>(DeponentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
