import { Module } from '@nestjs/common';
import { DeponentsService } from './deponents.service';
import { DeponentsController } from './deponents.controller';

@Module({
  controllers: [DeponentsController],
  providers: [DeponentsService],
})
export class DeponentsModule {}
