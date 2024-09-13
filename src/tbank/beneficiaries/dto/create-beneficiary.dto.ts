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
  @IsEnum(AddressType)
  type: AddressType;

  @IsNotEmpty()
  @IsString()
  address: string;
}

class DocumentDto {
  @IsEnum(DocumentType)
  type: DocumentType;

  @IsNotEmpty()
  @IsString()
  serial: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  organization: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^(\\d{3}-\\d{3})$')
  division: string;
}

export class CreateBeneficiaryDto {
  @IsEnum(BeneficiaryType)
  type: BeneficiaryType;

  @ValidateIf((o) => o.type === BeneficiaryType.UL_RESIDENT)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf(
    (o) =>
      o.type === BeneficiaryType.IP_RESIDENT ||
      o.type === BeneficiaryType.FL_RESIDENT,
  )
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ValidateIf(
    (o) =>
      o.type === BeneficiaryType.IP_RESIDENT ||
      o.type === BeneficiaryType.FL_RESIDENT,
  )
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ValidateIf(
    (o) =>
      o.type === BeneficiaryType.IP_RESIDENT ||
      o.type === BeneficiaryType.FL_RESIDENT,
  )
  @IsNotEmpty()
  @IsString()
  middleName: string;

  @ValidateIf(
    (o) =>
      o.type === BeneficiaryType.IP_RESIDENT ||
      o.type === BeneficiaryType.FL_RESIDENT,
  )
  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @ValidateIf(
    (o) =>
      o.type === BeneficiaryType.IP_RESIDENT ||
      o.type === BeneficiaryType.FL_RESIDENT,
  )
  @IsNotEmpty()
  @IsString()
  citizenship: string;

  @IsString()
  @Matches('^((\\+[0-9])([0-9]){6,14})$')
  phoneNumber: string;

  @IsEmail()
  email: string;

  @ValidateIf((o) => o.type === BeneficiaryType.FL_RESIDENT)
  @IsBoolean()
  isSelfEmployed: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];

  @ValidateIf(
    (o) =>
      o.type === BeneficiaryType.IP_RESIDENT ||
      o.type === BeneficiaryType.FL_RESIDENT,
  )
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents: DocumentDto[];

  @ValidateIf((o) => o.type === BeneficiaryType.IP_RESIDENT)
  @IsDateString()
  registrationDate: string;

  @IsString()
  @Validate(InnValidator)
  inn: string;
}
