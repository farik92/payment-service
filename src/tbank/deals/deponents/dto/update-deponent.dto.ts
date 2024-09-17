import { PartialType } from '@nestjs/mapped-types';
import { CreateDeponentDto } from './create-deponent.dto';

export class UpdateDeponentDto extends PartialType(CreateDeponentDto) {}
