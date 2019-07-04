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
        storeDataParsing(values, storeDataArray);

<<<<<<< Updated upstream
        // values.forEach(element => {
        //   const storeDataObject = {};
        //   storeDataObject.type = [];

        //   storeDataObject.latitude = element.latitude;
        //   storeDataObject.longitude = element.longitude;
        //   storeDataObject.uniqueID = element.uniqueID;
        //   storeDataObject.telephone = element.telephone1.trim();
        //   storeDataObject.city = element.city;
        //   storeDataObject.pinCode = element.postalCode.trim();
        //   storeDataObject.storeName = element.storeName;

        //   element.Description.forEach(storename => {
        //     storeDataObject.storeName = storename.displayStoreName.trim();
        //   });

        //   element.Attribute.forEach(storeinfo => {
        //     if (storeinfo.displayName === 'Type') {
        //       storeDataObject.type.push(storeinfo.displayValue);
        //     } else if (storeinfo.name === 'OwnerShip') {
        //       storeDataObject.ownership = storeinfo.displayValue;
        //     } else if (storeinfo.displayName === 'Label') {
        //       storeDataObject.ribbonText = storeinfo.displayValue;
        //     } else {
        //       storeDataObject.ribbonText = '';
        //     }
        //   });

        //   storeDataObject.address1 = `${element.addressLine[0]}`;
        //   storeDataObject.address2 = `${element.addressLine[1]}`;

        //   storeDataArray.push(storeDataObject);
        // });
=======
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
>>>>>>> Stashed changes
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
        const values = response.body.PhysicalStore;

        const storeDataArray = [];
        storeDataParsing(values, storeDataArray);
        // values.forEach(element => {
        //   const storeDataObject = {};
        //   storeDataObject.type = [];

        //   storeDataObject.latitude = element.latitude;
        //   storeDataObject.longitude = element.longitude;
        //   storeDataObject.uniqueID = element.uniqueID;
        //   storeDataObject.telephone = element.telephone1.trim();
        //   storeDataObject.city = element.city;
        //   storeDataObject.pinCode = element.postalCode.trim();
        //   // storeDataObject.storeName = element.storeName;

        //   element.Description.forEach(storename => {
        //     storeDataObject.storeName = storename.displayStoreName.trim();
        //   });

        //   element.Attribute.forEach(storeinfo => {
        //     if (storeinfo.displayName === 'Type') {
        //       storeDataObject.type.push(storeinfo.displayValue);
        //     } else if (storeinfo.name === 'OwnerShip') {
        //       storeDataObject.ownership = storeinfo.displayValue;
        //     } else if (storeinfo.displayName === 'Label') {
        //       storeDataObject.ribbonText = storeinfo.displayValue;
        //     } else {
        //       storeDataObject.ribbonText = '';
        //     }
        //   });

        //   storeDataObject.address1 = `${element.addressLine[0]}`;
        //   storeDataObject.address2 = `${element.addressLine[1]}`;

<<<<<<< Updated upstream
        //   storeDataArray.push(storeDataObject);
        // });
=======
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
>>>>>>> Stashed changes
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
  storeUniqueId,
  callback,
) {
  // eslint-disable-next-line no-console
  console.log('in handler....', storeUniqueId);
  const reqHeaders = headerUtil.getWCSHeaders(headers);
  const storeDetailsArr = [];
  const resultsArr = [];
<<<<<<< Updated upstream

  const PhysicalStoreUrl = `${constants.storeLocatorByPhysicalIdentifier
    .replace('{{storeId}}', headers.storeId)
    .replace('{{queryParams}}', storeUniqueId)}`;

  origin.getResponse(
    'GET',
    PhysicalStoreUrl,
    reqHeaders,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        if (Object.keys(response.body).length !== 0) {
          const values = response.body.PhysicalStore;
          storeDataParsing(values, storeDetailsArr);
        }
        callback(null, storeDetailsArr);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
=======
  async.map(
    storeUniqueId,
    (uniqueId, cb) => {
      const PhysicalStoreUrl = `${constants.storeLocatorByPhysicalIdentifier
        .replace('{{storeId}}', headers.storeId)
        .replace('{{unique_id}}', uniqueId)}`;

      origin.getResponse(
        'GET',
        PhysicalStoreUrl,
        reqHeaders,
        null,
        null,
        null,
        null,
        response => {
          // const storeDetailsObj = {};
          if (response.status === 200) {
            if (Object.keys(response.body).length !== 0) {
              const values = response.body.PhysicalStore;

              // const storeDataArray = [];

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

                storeDetailsArr.push(storeDataObject);
              });

              // storeDetailsArr.push(response);
              cb(null, storeDetailsArr);
            }
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
      // resultsArr.push(results);
      // console.log(results, 'results..........');
      callback(null, results[0]);
>>>>>>> Stashed changes
    },
  );
  // async.map(
  //   storeUniqueId,
  //   (uniqueId, cb) => {
  //     const PhysicalStoreUrl = `${constants.storeLocatorByPhysicalIdentifier
  //       .replace('{{storeId}}', headers.storeId)
  //       .replace('{{unique_id}}', uniqueId)}`;

  //     origin.getResponse(
  //       'GET',
  //       PhysicalStoreUrl,
  //       reqHeaders,
  //       null,
  //       null,
  //       null,
  //       null,
  //       response => {
  //         // const storeDetailsObj = {};
  //         if (response.status === 200) {
  //           if (Object.keys(response.body).length !== 0) {
  //             const values = response.body.PhysicalStore;
  //             storeDataParsing(values, storeDetailsArr);
  //             // const storeDataArray = [];

  //             // values.forEach(element => {
  //             //   const storeDataObject = {};
  //             //   storeDataObject.type = [];

  //             //   storeDataObject.latitude = element.latitude;
  //             //   storeDataObject.longitude = element.longitude;
  //             //   storeDataObject.uniqueID = element.uniqueID;
  //             //   storeDataObject.telephone = element.telephone1.trim();
  //             //   storeDataObject.city = element.city;
  //             //   storeDataObject.pinCode = element.postalCode.trim();
  //             //   // storeDataObject.storeName = element.storeName;

  //             //   element.Description.forEach(storename => {
  //             //     storeDataObject.storeName = storename.displayStoreName.trim();
  //             //   });

  //             //   element.Attribute.forEach(storeinfo => {
  //             //     if (storeinfo.displayName === 'Type') {
  //             //       storeDataObject.type.push(storeinfo.displayValue);
  //             //     } else if (storeinfo.name === 'OwnerShip') {
  //             //       storeDataObject.ownership = storeinfo.displayValue;
  //             //     } else if (storeinfo.displayName === 'Label') {
  //             //       storeDataObject.ribbonText = storeinfo.displayValue;
  //             //     } else {
  //             //       storeDataObject.ribbonText = '';
  //             //     }
  //             //   });

  //             //   storeDataObject.address1 = `${element.addressLine[0]}`;
  //             //   storeDataObject.address2 = `${element.addressLine[1]}`;

  //             //   storeDetailsArr.push(storeDataObject);
  //             // });

  //             // storeDetailsArr.push(response);
  //             cb(null, storeDetailsArr);
  //           }
  //         } else {
  //           cb(errorUtils.handleWCSError(response));
  //         }
  //       },
  //     );
  //   },
  //   (errors, results) => {
  //     if (errors) {
  //       callback(errors);
  //       return;
  //     }
  //     // resultsArr.push(results);
  //     // console.log(results, 'results..........');
  //     callback(null, results[0]);
  //   },
  // );
};

function storeDataParsing(storeData, parsedStoreData) {
  storeData.forEach(element => {
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

    parsedStoreData.push(storeDataObject);
  });
}
