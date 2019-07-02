const origin = require('./origin');
const constants = require('./constants');
const headerutil = require('./headerutil');
const originMethod = 'GET';
const errorUtils = require('./errorutils');
const logger = require('./logger.js');

/**
 *  Get User Pincode
 */
module.exports.getPincode = getPincode;
function getPincode(headers, userID, callback) {
  if (!userID) {
    logger.debug('Get User Pincode :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const originUrl = constants.getPincode
    .replace('{{storeId}}', headers.storeId)
    .replace('{{userID}}', userID);

  origin.getResponse(
    originMethod,
    originUrl,
    null,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const pincodeRes = {
          pincode: response.body.zipCode || '',
        };
        callback(null, pincodeRes);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/**
 * Get City and State on the basis of Pincode
 */
module.exports.getCityAndState = function getStateAndCity(
  pinCode,
  headers,
  callback,
) {
  if (!pinCode) {
    logger.debug('GET City&State :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
  }

  const originUrl = constants.getCityAndState
    .replace('{{storeId}}', headers.storeId)
    .replace('{{pincode}}', pinCode);

  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    'GET',
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};

/* To Update Pincode in User's Self Address */
module.exports.setDefaultPincode = updateDefaultPincode;
function updateDefaultPincode(headers, pincode, callback) {
  logger.debug('Call to update Default Pincode');
  const pincodeUpdateURL = `${constants.updateDefaultPincode.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;
  const reqHeader = headerutil.getWCSHeaders(headers);

  const reqBody = {
    updatedZipcodeValue: pincode,
    userId: headers.userId,
  };

  origin.getResponse(
    'PUT',
    pincodeUpdateURL,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, 'success');
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/**
 * Function to return Pincode is serviceable or not
 */
module.exports.getPincodeServiceability = pincodeServiceability;
function pincodeServiceability(headers, pincode, callback) {
  logger.debug('Call to Get Pincode Serviceablity API');
  const originUrl = constants.pincodeServiceablity
    .replace('{{storeId}}', headers.storeId)
    .replace('{{pincode}}', pincode);

  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    'GET',
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const resJSON = {
          serviceable: false,
        };
        if (response.body.serviceAbilityFlag === true) {
          resJSON.serviceable = true;
        }
        callback(null, resJSON);
      } else {
        logger.debug('Error While Checking Pincode Serviceability');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/**  
Find Inventory
* @param: {pincode:'User Pincode',partNumber:'Part Number',quantity:'Quantity'}
* @return Inventory Details
*/
module.exports.findInventory = findInventory;
function findInventory(headers, reqParams, callback) {
  logger.debug('Inside the Find Inventory API');
  if (!reqParams.pincode || !reqParams.partNumber || !reqParams.quantity) {
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const findInventoryUrl = constants.findInvertory
    .replace('{{storeId}}', headers.storeId)
    .replace('{{partNumber}}', reqParams.partNumber)
    .replace('{{pinCode}}', reqParams.pincode)
    .replace('{{quantity}}', reqParams.quantity);

  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    'GET',
    findInventoryUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const inventoryResponse = {
          uniqueID: null,
          inventoryStatus: 'unavailable',
          deliveryDate: null,
        };
        if (
          response.body.InventoryAvailability &&
          response.body.InventoryAvailability.length > 0
        ) {
          inventoryResponse.uniqueID =
            response.body.InventoryAvailability[0].productId;
          if (
            response.body.InventoryAvailability[0].inventoryStatus ===
              'Available' &&
            Number(response.body.InventoryAvailability[0].availableQuantity) >
              Number(reqParams.quantity)
          ) {
            inventoryResponse.inventoryStatus = 'available';
            inventoryResponse.deliveryDate =
              response.body.InventoryAvailability[0].availabilityDateTime;
          }
        }
        callback(null, inventoryResponse);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/**
 * Function to return Shipping charge
 * @param {@pincode, @skuid}
 * @return shipping charge
 */
module.exports.getShippingCharge = getShippingCharge;
function getShippingCharge(headers, reqParams, callback) {
  logger.debug('Inside the shipping charge API');

  const reqHeader = headerutil.getWCSHeaders(headers);
  const originUrl = constants.shippingCharge
    .replace('{{storeId}}', headers.storeId)
    .replace('{{pincode}}', reqParams.pincode)
    .replace('{{uniqueId}}', reqParams.skuId);

  origin.getResponse(
    'GET',
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/**
 * Function to return Experience at our store
 * @param {@pincode, @partNumber}
 * @return store name
 */
module.exports.experienceStore = getExperienceStore;
function getExperienceStore(headers, reqParams, callback) {
  logger.debug('Inside the experience store API');

  const reqHeader = headerutil.getWCSHeaders(headers);
  const originUrl = constants.experienceStore
    .replace('{{storeId}}', headers.storeId)
    .replace('{{pincode}}', reqParams.pincode)
    .replace('{{partNumber}}', reqParams.partNumber);

  origin.getResponse(
    'GET',
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}
