import { size } from 'lodash';

export function isValidEmail(email: string) {
  const index1 = email.indexOf('@');
  const index2 = email.indexOf('.');
  return index1 > -1 && index2 > -1 && index1 < size(email) - 2 && index2 < size(email) - 2;
}

export function isRequired(str: string) {
  return str && str.length > 0;
}

export function validateRequired(str: string) {
  const isValid = str && str.length > 0;
  return { error: !isValid, message: !isValid ? 'Vui lòng nhập giá trị' : '' };
}
