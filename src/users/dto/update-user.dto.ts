import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsISO8601 } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly firstName?: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly lastName?: string;

  @ApiProperty({ example: '2002-01-05', description: 'Дата рождения' })
  @IsOptional()
  @IsISO8601({})
  readonly birthday?: string;
}
