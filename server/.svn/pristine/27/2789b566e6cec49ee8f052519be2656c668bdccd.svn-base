const async = require('async');
const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const origin = require('../utils/origin.js');
const productUtil = require('../utils/productutil');

module.exports.getOrdersList = function getOrdersList(headers, callback) {
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const orderListURL = `${constants.ordersList.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

  origin.getResponse(
    'GET',
    orderListURL,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      const orderIdArray = [];
      if (response.status === 200) {
        for (let i = 0; i < response.body.Order.length; i += 1) {
          // console.log('response', response.body.orderItem[i].productId);
          const orderId = {
            orderID: response.body.Order[i].orderId,
          };
          orderIdArray.push(orderId);
        }
        async.map(
          orderIdArray,
          (orderId, cb) => {
            this.getOrderbyId(headers, orderId.orderID, (err, result) => {
              if (!err) {
                // eslint-disable-next-line no-param-reassign
                orderId.orderDetails = result;
                cb(null, orderId);
              } else {
                cb(err);
              }
            });
          },
          (errors, results) => {
            if (errors) {
              callback(errors);
              return;
            }
            callback(null, results);
          },
        );
        // this.getOrderbyId(headers, orderIds, callback);
        // // console.log(orderIds);
        // callback(null, response);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
  // const response = {
  //   message: 'WCS Integration Pending',
  // };
  // callback(null, response);
};

module.exports.getOrderbyId = function getOrderbyId(
  headers,
  orderId,
  callback,
) {
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const orderDetailURL = `${constants.orderDetail
    .replace('{{storeId}}', headers.storeId)
    .replace('{{orderId}}', orderId)}`;
  origin.getResponse(
    'GET',
    orderDetailURL,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      // console.log(id,"id")
      if (response.status === 200) {
        // console.log(orderId, 'orderId');
        const productIds = [];
        for (let i = 0; i < response.body.orderItem.length; i += 1) {
          // console.log('response', response.body.orderItem[i].productId);
          productIds.push(response.body.orderItem[i].productId);
        }
        // console.log(JSON.stringify(response.body.orderItem.length));
        productUtil.productByProductIDs(productIds, headers, (err, result) => {
          if (err) {
            callback(err);
            return;
          }
          response.body.allProductList = result.productList;
          callback(null, response);
        });
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
