import { regexMobileNo, validateEmptyObject, regexEmail, regexPincode } from './validationManager';

/** -----------------------------------------------------------------------
 * Validate FullName
 * @param {*} data
 * Should be less then 100 characters
 */
export function validateFullName(data) {
  if (data.length <= 100 && validateEmptyObject(data)) {
    return true
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
  return false
}

/** -----------------------------------------------------------------------
 * Validate Email Id
 * @param {*} data
 * Should be 10 digit and all numeric
 */
export function validateEmailId(data) {
  console.log('Validate Email- ---- ',data);
  if (regexEmail.test(data) || data === '' || data === undefined) {
    return true;
  }
  return false
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
  return false
}

/** -----------------------------------------------------------------------
 * Validate Address
 * @param {*} data
 * Should be 200 character limit
 */
export function validateAddress(data) {
  if (data.length <= 200 && validateEmptyObject(data)) {
    return true
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
    return true
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
    return true
  }
  return false;
}

