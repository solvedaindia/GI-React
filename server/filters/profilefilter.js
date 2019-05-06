/**
 * Filter User Profile Data-Summary.
 * @return User Profile JSON Data
 */
module.exports.userInfoSummary = function getSummaryUserProfile(profileData) {
  const userDetails = {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    pincode: profileData.zipCode,
  };
  return userDetails;
};

/**
 * Filter User Profile Data-Details.
 * @return User Profile JSON Data
 */
module.exports.userInfoDetails = function getDetailedUserProfile(profileData) {
  return profileData;
};

