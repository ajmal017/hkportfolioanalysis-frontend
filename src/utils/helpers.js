import PropTypes from "prop-types";

export function convertNumberToPercent(num, decimals = null) {
  num = num * 100;
  num = decimals ? num.toFixed(decimals) : num;
  return `${num}%`;
}

convertNumberToPercent.propTypes = {
  num: PropTypes.number.isRequired,
  decimals: PropTypes.number,
};

export function formatNumberToHumanReadable(num, decilmals) {
  const isNegative = num < 0 ? true : false;
  const pureNumber = Math.abs(num);
  const readableNumber = pureNumber.toLocaleString(undefined, {
    minimumFractionDigits: decilmals,
    maximumFractionDigits: decilmals,
  });
  return `${isNegative ? "-" : ""}$${readableNumber}`;
}

formatNumberToHumanReadable.propTypes = {
  num: PropTypes.number.isRequired,
  decimals: PropTypes.number,
};

export function checkFilledObject(obj) {
  return Object.keys(obj).length > 0;
}

checkFilledObject.propTypes = {
  obj: PropTypes.object.isRequired,
};

export function validateEmail(value) {
  const regExRequirement = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const correct = regExRequirement.test(value);
  let error;
  if (!correct) {
    error = "Invalid email";
  }
  return error;
}

validateEmail.propTypes = {
  value: PropTypes.string.isRequired,
};
