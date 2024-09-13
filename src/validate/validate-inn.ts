import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import isINNvalid from '../helper/validate-nn';

@ValidatorConstraint({ name: 'inn', async: false })
export class InnValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    if (text) {
      return isINNvalid({ Value: text });
    }
  }

  defaultMessage() {
    return 'INN not valid';
  }
}
