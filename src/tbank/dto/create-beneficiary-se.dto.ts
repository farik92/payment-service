import {
  IsString,
  IsDateString,
  IsBoolean,
  IsEmail,
  IsArray,
  ValidateNested,
  IsEnum,
  Matches,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InnValidator } from '../../validate/validate-inn';

enum BeneficiaryType {
  FL_RESIDENT = 'FL_RESIDENT',
}

enum DocumentType {
  PASSPORT = 'PASSPORT',
}

enum AddressType {
  REGISTRATION_ADDRESS = 'REGISTRATION_ADDRESS',
}

class DocumentDto {
  @IsEnum(DocumentType)
  type: DocumentType;

  @IsString()
  serial: string;

  @IsString()
  number: string;

  @IsDateString()
  date: string;

  @IsString()
  organization: string;

  @IsString()
  @Matches('^(\\d{3}-\\d{3})$')
  division: string;
}

class AddressDto {
  @IsEnum(AddressType)
  type: AddressType;

  @IsString()
  address: string;
}

export class CreateBeneficiarySeDto {
  @IsEnum(BeneficiaryType)
  type: BeneficiaryType;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  middleName: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  citizenship: string;

  @IsString()
  @Matches('^((\\+[0-9])([0-9]){6,14})$')
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isSelfEmployed: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents: DocumentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];

  @IsString()
  @Validate(InnValidator)
  inn: string;
}
