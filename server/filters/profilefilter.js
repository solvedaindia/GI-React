const stateCode = require('../configs/statecode');

/**
 * Filter User Profile Data-Summary.
 * @return User Profile JSON Data
 */
module.exports.userInfoSummary = function getSummaryUserProfile(profileData) {
  const userDetails = {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    pincode: profileData.zipCode,
    logonID: profileData.logonId,
  };
  return userDetails;
};

/**
 * Filter User Profile Data-Details.
 * @return User Profile JSON Data
 */
module.exports.userInfoDetails = function getDetailedUserProfile(profileData) {
  const regexMobileNo = /^\d{10}$/; // Mobile Number
  const userDetails = {};
  userDetails.name = profileData.firstName;
  /*  if (profileData.lastName && profileData.lastName !== '') {
    userDetails.name = `${userDetails.name} ${profileData.lastName}`;
  } */
  if (regexMobileNo.test(profileData.logonId)) {
    userDetails.mobileNo = profileData.logonId;
    userDetails.emailID = profileData.x_userField1 || '';
  } else {
    userDetails.emailID = profileData.logonId;
    userDetails.mobileNo = profileData.x_userField1 || '';
  }
  userDetails.logonID = profileData.logonId;
  userDetails.pincode = profileData.zipCode;
  userDetails.field3 = 0;

  if (profileData.x_userField3 === '1') {
    userDetails.field3 = 1;
  }
  return userDetails;
};

/**
 * Filter User Contact Address.
 * @return User Contact Address
 */
module.exports.userAddress = function getUserAddress(contactAddress) {
  const res = {};
  res.addressID = contactAddress.addressId;
  res.nickName = contactAddress.nickName;
  res.name = contactAddress.firstName;
  /* if (contactAddress.lastName && contactAddress.lastName !== '') {
    res.name = `${res.name} ${contactAddress.lastName}`;
  } */
  res.phoneNumber = contactAddress.phone1 || '';
  res.emailId = contactAddress.email1;
  res.pincode = contactAddress.zipCode || '';
  res.address = '';
  res.city = contactAddress.city;
  res.state =
    stateCode.getStateName[contactAddress.state] || contactAddress.state;
  res.isDefault = false;
  if (contactAddress.primary === 'true') {
    res.isDefault = true;
  }
  if (contactAddress.addressLine && contactAddress.addressLine.length > 0) {
    contactAddress.addressLine.forEach(addressField => {
      res.address += addressField;
    });
  }
  return res;
};
