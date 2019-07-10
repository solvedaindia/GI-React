const origin = require('../utils/origin');
const constants = require('../utils/constants');
const originMethod = 'GET';
const logger = require('../utils/logger.js');
const errorUtils = require('../utils/errorutils');
const headerUtil = require('../utils/headerutil');

/**
 *  Get Stores by Location i.e CityName
 */
module.exports.storesByLocation = function getStoresByLocation(req, callback) {
  const header = req.headers;
  if (!req.query.cityname) {
    logger.debug('Store Locator By Location :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const originUrl = constants.storeLocatorByLocation
    .replace('{{storeId}}', header.storeId)
    .replace('{{cityName}}', req.query.cityname);

  const reqHeader = headerUtil.getWCSHeaders(header);

  origin.getResponse(
    originMethod,
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const storeData = response.body.PhysicalStore;

        const storeDataByCityArray = [];
        storeDataParsing(storeData, storeDataByCityArray);
        callback(null, storeDataByCityArray);
      } else {
        logger.debug('Error While fetching Store Details By Location API');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};

/**
 *  Get Stores by Coordinates
 */
module.exports.storesByCoordinates = function getStoresByCoordinates(
  req,
  params,
  callback,
) {
  const header = req.headers;
  if (!params.latitude || !params.longitude) {
    logger.debug('Store Locator By Coordinates :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  let originUrl = constants.storeLocatorByCoordinates
    .replace('{{storeId}}', header.storeId)
    .replace('{{latitude}}', req.query.latitude)
    .replace('{{longitude}}', req.query.longitude);

  const radius = 25;
  if (req.query.radius) {
    originUrl += `&radius=${req.query.radius}`;
  } else {
    originUrl += `&radius=${radius}`;
  }

  const reqHeader = headerUtil.getWCSHeaders(header);

  origin.getResponse(
    originMethod,
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const storeData = response.body.PhysicalStore;

        const storeDataByCoordinatesArray = [];
        storeDataParsing(storeData, storeDataByCoordinatesArray);
        callback(null, storeDataByCoordinatesArray);
      } else {
        logger.debug('Error While fetching Store Details By Coordinates API');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};

/**
 *  Get Stores by Physical Store ID
 */
module.exports.storeByPhysicalIdentifier = function storeByPhysicalIdentifier(
  headers,
  storeUniqueId,
  callback,
) {
  const reqHeaders = headerUtil.getWCSHeaders(headers);

  const PhysicalStoreUrl = `${constants.storeLocatorByPhysicalIdentifier
    .replace('{{storeId}}', headers.storeId)
    .replace('{{queryParams}}', storeUniqueId)}`;

  origin.getResponse(
    originMethod,
    PhysicalStoreUrl,
    reqHeaders,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const storeDataByStoreIdArray = [];
        if (Object.keys(response.body).length !== 0) {
          const storeData = response.body.PhysicalStore;
          storeDataParsing(storeData, storeDataByStoreIdArray);
        }
        callback(null, storeDataByStoreIdArray);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};

/**
 *  Parse the Store Data function
 */
function storeDataParsing(storeData, parsedStoreData) {
  const resBody = {};
  if (storeData !== 0 && storeData !== undefined && storeData !== null) {
    storeData.forEach(element => {
      const storeDataObject = {};
      storeDataObject.type = [];
      storeDataObject.latitude = element.latitude;
      storeDataObject.longitude = element.longitude;
      storeDataObject.uniqueID = element.uniqueID;
      storeDataObject.telephone = element.telephone1.trim();
      storeDataObject.city = element.city;
      storeDataObject.pinCode = element.postalCode.trim();
      element.Description.forEach(storename => {
        storeDataObject.storeName = storename.displayStoreName.trim();
      });
      element.Attribute.forEach(storeinfo => {
        if (storeinfo.displayName === 'Type') {
          storeDataObject.type.push(storeinfo.displayValue);
        } else if (storeinfo.name === 'OwnerShip') {
          storeDataObject.ownership = storeinfo.displayValue;
        } else if (storeinfo.displayName === 'Label') {
          storeDataObject.ribbonText = storeinfo.displayValue;
        } else {
          storeDataObject.ribbonText = '';
        }
      });
      storeDataObject.address1 = `${element.addressLine[0]}`;
      storeDataObject.address2 = `${element.addressLine[1]}`;
      parsedStoreData.push(storeDataObject);
    });
  }
}
