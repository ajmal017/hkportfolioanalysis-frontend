export function convertNumberToPercent(num, decimals = null) {
  num = num * 100;
  num = decimals ? num.toFixed(decimals) : num;
  return `${num}%`;
}

export function formatNumberToHumanReadable(num, decilmals) {
  const isNegative = num < 0 ? true : false;
  const pureNumber = Math.abs(num);
  const readableNumber = pureNumber.toLocaleString(undefined, {
    minimumFractionDigits: decilmals,
    maximumFractionDigits: decilmals
  });
  return `${isNegative ? "-" : ""}$${readableNumber}`;
}
