import { Injectable } from '@nestjs/common';
import { CreateDeponentDto } from './dto/create-deponent.dto';
import { UpdateDeponentDto } from './dto/update-deponent.dto';

@Injectable()
export class DeponentsService {
  create(createDeponentDto: CreateDeponentDto) {
    return 'This action adds a new deponent';
  }

  findAll() {
    return `This action returns all deponents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deponent`;
  }

  update(id: number, updateDeponentDto: UpdateDeponentDto) {
    return `This action updates a #${id} deponent`;
  }

  remove(id: number) {
    return `This action removes a #${id} deponent`;
  }
}
