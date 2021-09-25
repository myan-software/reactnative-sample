export const numberFormat = (
  number: string | number,
  thousandSeparator: string,
) => {
  if (Number(number) < 1) return 0;
  const numberString = number.toString();

  const rest = numberString.length % 3;
  let result = numberString.substr(0, rest);
  const thousands = numberString.substr(rest).match(/\d{3}/gi);

  if (thousands) {
    const separator = rest ? thousandSeparator : '';
    result += separator + thousands.join(thousandSeparator);
  }
  return result;
};

export const moneyFormat = (
  number: string | number,
  thousandSeparator = '.',
  dot = ' đ',
) => {
  if (!number) {
    return '0';
  }
  return numberFormat(number, thousandSeparator) + dot;
};
