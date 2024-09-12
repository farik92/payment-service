import {
  IsString,
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
  UL_RESIDENT = 'UL_RESIDENT',
}

enum AddressType {
  LEGAL_ENTITY_ADDRESS = 'LEGAL_ENTITY_ADDRESS',
}

class AddressDto {
  @IsEnum(AddressType)
  type: AddressType;

  @IsString()
  address: string;
}

export class CreateBeneficiaryDto {
  @IsEnum(BeneficiaryType)
  type: BeneficiaryType;

  @IsString()
  name: string;

  @IsString()
  @Matches('^((\\+[0-9])([0-9]){6,14})$')
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];

  @IsString()
  @Validate(InnValidator)
  inn: string;
}
