import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO8601,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
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

  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;
}
