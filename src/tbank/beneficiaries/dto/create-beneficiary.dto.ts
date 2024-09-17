import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateIf,
  ValidateNested,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InnValidator } from '../../../validate/validate-inn';
import { ApiProperty } from '@nestjs/swagger';

export enum BeneficiaryType {
  UL_RESIDENT = 'UL_RESIDENT',
  IP_RESIDENT = 'IP_RESIDENT',
  FL_RESIDENT = 'FL_RESIDENT',
}

enum AddressType {
  LEGAL_ENTITY_ADDRESS = 'LEGAL_ENTITY_ADDRESS',
  REGISTRATION_ADDRESS = 'REGISTRATION_ADDRESS',
}

enum DocumentType {
  PASSPORT = 'PASSPORT',
}

class AddressDto {
  @ApiProperty({ enum: AddressType, description: 'Тип адреса.' })
  @IsEnum(AddressType)
  type: AddressType;

  @ApiProperty({
    example: '127287, г. Москва, ул. 2-я Хуторская, д. 38А, стр. 26',
    description: 'Адрес.',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}

class DocumentDto {
  @ApiProperty({ enum: DocumentType, description: 'Тип документа.' })
  @ApiProperty({
    enum: DocumentType,
    isArray: false,
    description: 'Тип документа.',
  })
  @IsEnum(DocumentType)
  type: DocumentType;

  @ApiProperty({ example: '5000', description: 'Серия документа.' })
  @IsNotEmpty()
  @IsString()
  serial: string;

  @ApiProperty({ example: '287846', description: 'Номер документа.' })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({ example: '1998-01-01', description: 'Дата выдачи.' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    example:
      'Отделом УФМС по всем городам всех областей необъятной нашей Родины',
    description: 'Кем выдан.',
  })
  @IsNotEmpty()
  @IsString()
  organization: string;

  @ApiProperty({ example: '123-456', description: 'Код подразделения.' })
  @IsNotEmpty()
  @IsString()
  @Matches('^(\\d{3}-\\d{3})$')
  division: string;
}

export class CreateBeneficiaryDto {
  @ApiProperty({ enum: BeneficiaryType, description: 'Тип бенефициара.' })
  @IsEnum(BeneficiaryType)
  type: BeneficiaryType;

  @ApiProperty({
    example: 'Акционерное общество «Биайтех»',
    description: 'Наименование организации.',
  })
  @ValidateIf((o) => o.type === BeneficiaryType.UL_RESIDENT)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Олег', description: 'Имя.' })
  @ValidateIf(
    (o) =>
      o.type === BeneficiaryType.IP_RESIDENT ||
      o.type === BeneficiaryType.FL_RESIDENT,
  )
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Анисимов', description: 'Фамилия.' })
  @ValidateIf(
    (o) =>
      o.type === BeneficiaryType.IP_RESIDENT ||
      o.type === BeneficiaryType.FL_RESIDENT,
  )
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Юрьевич', description: 'Отчество.' })
  @ValidateIf(
    (o) =>
      o.type === BeneficiaryType.IP_RESIDENT ||
      o.type === BeneficiaryType.FL_RESIDENT,
  )
  @IsNotEmpty()
  @IsString()
  middleName: string;

  @ApiProperty({ example: '1974-01-23', description: 'Дата рождения.' })
  @ValidateIf(
    (o) =>
      o.type === BeneficiaryType.IP_RESIDENT ||
      o.type === BeneficiaryType.FL_RESIDENT,
  )
  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @ApiProperty({ example: 'RU', description: 'Гражданство.' })
  @ValidateIf(
    (o) =>
      o.type === BeneficiaryType.IP_RESIDENT ||
      o.type === BeneficiaryType.FL_RESIDENT,
  )
  @IsNotEmpty()
  @IsString()
  citizenship: string;

  @ApiProperty({ example: '+71378820200', description: 'Номер телефона.' })
  @IsString()
  @Matches('^((\\+[0-9])([0-9]){6,14})$')
  phoneNumber: string;

  @ApiProperty({
    example: 'KDDwKOwWD0@pijg.com',
    description: 'Электронная почта.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'true', description: 'Самозанятый.' })
  @ValidateIf((o) => o.type === BeneficiaryType.FL_RESIDENT)
  @IsBoolean()
  isSelfEmployed: boolean;

  @ApiProperty({ type: [AddressDto], description: 'Адрес' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];

  @ApiProperty({ type: [DocumentDto], description: 'Документ' })
  @ValidateIf(
    (o) =>
      o.type === BeneficiaryType.IP_RESIDENT ||
      o.type === BeneficiaryType.FL_RESIDENT,
  )
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents: DocumentDto[];

  @ApiProperty({ example: '2010-01-15', description: 'Дата регистрации.' })
  @ValidateIf((o) => o.type === BeneficiaryType.IP_RESIDENT)
  @IsDateString()
  registrationDate: string;

  @ApiProperty({ example: '306707771448', description: 'ИНН.' })
  @IsString()
  @Validate(InnValidator)
  inn: string;
}
