/** ******* Constants ******* */

/* const regexMobileNo = /^[6-9]\d{9}$/;  //Mobile Number Starts with 6-9 */
export const regexMobileNo = /^\d{10}$/; // Mobile Number
/* eslint-disable-next-line no-useless-escape */
export const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Email
/* Complete Password  */
export const regexPw = /^(?=.*?[0-9]).{6,25}$/;
/* Whether String contains a Number or Not */
export const regexPwNo = /\d/;
/* Whether String contains a Character or Not */
export const regexPwChar = /[a-zA-Z]/;
/* Whether Pincode numeric and 6 digits */
export const regexPincode = /^\d{6}$/;

/** ******* Functions ******* */
/* Validate empty object */
export const validateEmptyObject = input => {
  if (input === null || input === undefined || input === '') {
    return false;
  }

  return true;
};

/* Validate OTP digits */
export const validateOTPDigit = input => {
  const restrictionDigits = 4;
  if (String(input).length == restrictionDigits) {
    return true;
  }

  return false;
};

/** -----------------------------------------------------------------------
 * Validate FullName
 * @param {*} data
 * Should be less then 100 characters
 */
export function validateFullName(data) {
  if (data.length <= 100 && validateEmptyObject(data)) {
    return true;
  }
  return false;
}

/** -----------------------------------------------------------------------
 * Validate Mobile No
 * @param {*} data
 * Should be 10 characters and all numeric
 */
export function validateMobileNo(data) {
  if (regexMobileNo.test(data) && validateEmptyObject(data)) {
    return true;
  }
  return false;
}

/** -----------------------------------------------------------------------
 * Validate Email Id
 * @param {*} data
 * Should be 10 digit and all numeric
 */
export function validateEmailId(data) {
  console.log('Validate Email- ---- ', data);
  if (regexEmail.test(data) || data === '' || data === undefined) {
    return true;
  }
  return false;
}

/** -----------------------------------------------------------------------
 * Validate Pincode
 * @param {*} data
 * Should be 6 Digit and all numeric
 */
export function validatePindcode(data) {
  if (regexPincode.test(data) && validateEmptyObject(data)) {
    return true;
  }
  return false;
}

/** -----------------------------------------------------------------------
 * Validate Address
 * @param {*} data
 * Should be 200 character limit
 */
export function validateAddress(data) {
  if (data.length <= 200 && validateEmptyObject(data)) {
    return true;
  }
  return false;
}

/** -----------------------------------------------------------------------
 * Validate City/District
 * @param {*} data
 * Should be 128 character limit
 */
export function validateCityDistrict(data) {
  if (data.length <= 128 && validateEmptyObject(data)) {
    return true;
  }
  return false;
}

/** -----------------------------------------------------------------------
 * Validate State
 * @param {*} data
 * Should be 128 character limit
 */
export function validateState(data) {
  if (data.length <= 128 && validateEmptyObject(data)) {
    return true;
  }
  return false;
}
