const origin = require('../utils/origin');
const constants = require('../utils/constants');
const originMethod = 'GET';
const logger = require('../utils/logger.js');
const errorUtils = require('../utils/errorutils');
// const filter = require('../filters/filter');
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
  // .replace('{{giStoreType}}', req.query.type);

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
        const values = response.body.PhysicalStore;

        const storeDataArray = [];

        values.forEach(element => {
          const storeDataObject = {};

          storeDataObject.latitude = element.latitude;
          storeDataObject.longitude = element.longitude;
          storeDataObject.uniqueID = element.uniqueID;
          storeDataObject.telephone = element.telephone1.trim();
          storeDataObject.city = element.city;
          storeDataObject.pinCode = element.postalCode.trim();
          // storeDataObject.storeName = element.storeName;

          element.Description.forEach(storename => {
            storeDataObject.storeName = storename.displayStoreName.trim();
          });

          element.Attribute.forEach(storeinfo => {
            if (storeinfo.name === 'Type') {
              storeDataObject.type = storeinfo.displayValue;
            } else if (storeinfo.name === 'StoreHours') {
              storeDataObject.storeHours = storeinfo.displayValue;
            } else if (storeinfo.name === 'Ownership') {
              storeDataObject.ownership = storeinfo.displayValue;
            } else if (storeinfo.displayName === 'Label') {
              storeDataObject.ribbonText = storeinfo.displayValue;
            } else {
              storeDataObject.ribbonText = '';
            }
          });

          storeDataObject.address = `${element.addressLine.join(',')}`;

          storeDataArray.push(storeDataObject);
        });
        callback(null, storeDataArray);
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
  // .replace('{{giStoreType}}', req.query.type);

  if (req.query.radius) {
    originUrl += `&radius=${req.query.radius}`;
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
        const values = response.body.PhysicalStore;

        const storeDataArray = [];

        values.forEach(element => {
          const storeDataObject = {};

          storeDataObject.latitude = element.latitude;
          storeDataObject.longitude = element.longitude;
          storeDataObject.uniqueID = element.uniqueID;
          storeDataObject.telephone = element.telephone1.trim();
          storeDataObject.city = element.city;
          storeDataObject.pinCode = element.postalCode.trim();
          // storeDataObject.storeName = element.storeName;

          element.Description.forEach(storename => {
            storeDataObject.storeName = storename.displayStoreName.trim();
          });

          element.Attribute.forEach(storeinfo => {
            if (storeinfo.name === 'Type') {
              storeDataObject.type = storeinfo.displayValue;
            } else if (storeinfo.name === 'StoreHours') {
              storeDataObject.storeHours = storeinfo.displayValue;
            } else if (storeinfo.name === 'Ownership') {
              storeDataObject.ownership = storeinfo.displayValue;
            } else if (storeinfo.displayName === 'Label') {
              storeDataObject.ribbonText = storeinfo.displayValue;
            } else {
              storeDataObject.ribbonText = '';
            }
          });

          storeDataObject.address = `${element.addressLine.join(',')}`;

          storeDataArray.push(storeDataObject);
        });
        callback(null, storeDataArray);
      } else {
        logger.debug('Error While fetching Store Details By Coordinates API');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};

module.exports.storeByPhysicalIdentifier = function storeByPhysicalIdentifier(
  headers,
  giStoreId,
  callback,
) {
  const reqHeaders = headerUtil.getWCSHeaders(headers);

  const PhysicalStoreUrl = `${constants.storeLocatorByPhysicalIdentifier
    .replace('{{storeId}}', headers.storeId)
    .replace('{{gi_storeId}}', giStoreId)}`;

  origin.getResponse(
    'GET',
    PhysicalStoreUrl,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        const storedetailsObj = {};

        storedetailsObj.latitude = response.body.latitude;
        storedetailsObj.longitude = response.body.longitude;
        storedetailsObj.telephone = response.body.phone;
        // storedetailsObj.storeName = response.body.storeName;
        storedetailsObj.city = response.body.city;
        storedetailsObj.storeHours = response.body.value1;
        storedetailsObj.type = response.body.displayvalue;
        storedetailsObj.address1 = response.body.address1;
        storedetailsObj.address2 = response.body.address2;
        storedetailsObj.pinCode = response.body.zipcode;
        storedetailsObj.ownership = response.body.value2;
        storedetailsObj.uniqueID = response.body.stloc_id;

        callback(null, storedetailsObj);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};
