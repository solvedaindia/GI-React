const async = require('async');
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
          storeDataObject.type = [];

          storeDataObject.latitude = element.latitude;
          storeDataObject.longitude = element.longitude;
          storeDataObject.uniqueID = element.uniqueID;
          storeDataObject.telephone = element.telephone1.trim();
          storeDataObject.city = element.city;
          storeDataObject.pinCode = element.postalCode.trim();
          storeDataObject.storeName = element.storeName;

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

          storeDataArray.push(storeDataObject);
        });
        callback(null, response);
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
      if (response.status === 200 && response.body) {
        const values = response.body.PhysicalStore;

        const storeDataArray = [];

        values.forEach(element => {
          const storeDataObject = {};
          storeDataObject.type = [];

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
  // eslint-disable-next-line no-console
  console.log('in handler....', giStoreId.length);
  const reqHeaders = headerUtil.getWCSHeaders(headers);
  const storeDetailsArr = [];
  const resultsArr = [];
  async.map(
    giStoreId,
    (storeID, cb) => {
      const PhysicalStoreUrl = `${constants.storeLocatorByPhysicalIdentifier
        .replace('{{storeId}}', headers.storeId)
        .replace('{{gi_storeId}}', storeID)}`;

      origin.getResponse(
        'GET',
        PhysicalStoreUrl,
        reqHeaders,
        null,
        null,
        null,
        null,
        response => {
          const storeDetailsObj = {};
          if (response.status === 200) {
            if (Object.keys(response.body).length !== 0) {
              // storeDetailsObj.type = [];
              storeDetailsObj.latitude = response.body.latitude;
              storeDetailsObj.longitude = response.body.longitude;
              storeDetailsObj.telephone = response.body.phone.trim();
              storeDetailsObj.storeName = response.body.storeName;
              storeDetailsObj.city = response.body.city;
              storeDetailsObj.type = response.body.displayvalue;
              storeDetailsObj.address1 = response.body.address1;
              storeDetailsObj.address2 = response.body.address2;
              storeDetailsObj.pinCode = response.body.zipcode.trim();
              storeDetailsObj.ownership = response.body.value2;
              storeDetailsObj.uniqueID = response.body.stloc_id;

              storeDetailsArr.push(storeDetailsObj);
            }
            cb(null, storeDetailsArr);
          } else {
            cb(errorUtils.handleWCSError(response));
          }
        },
      );
    },
    (errors, results) => {
      if (errors) {
        callback(errors);
        return;
      }
      resultsArr.push(results);
      // console.log(results, 'results..........');
      callback(null, storeDetailsArr);
    },
  );
};
