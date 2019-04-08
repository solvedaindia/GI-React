

/********* Constants ********/

/* const regexMobileNo = /^[6-9]\d{9}$/;  //Mobile Number Starts with 6-9 */
export const regexMobileNo = /^\d{10}$/; // Mobile Number
/* eslint-disable-next-line no-useless-escape */
export const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Email
/* Complete Password  */
export const regexPw = /^(?=.*?[a-z,A-Z])(?=.*?[0-9]).{6,25}$/;
/* Whether String contains a Number or Not */
export const regexPwNo = /\d/;
/* Whether String contains a Character or Not */
export const regexPwChar = /[a-zA-Z]/;



/********* Functions ********/
/* Validate empty object */
export const validateEmptyObject = (input) => {
    if (input === null || input === undefined || input === '') {
        return false;
    }
    else {
        return true;
    }
}

/* Validate OTP digits */
export const validateOTPDigit = (input) => {
    let restrictionDigits = 4;
    if (String(input).length == restrictionDigits) {
        return true;
    }
    else {
        return false;
    }

}



