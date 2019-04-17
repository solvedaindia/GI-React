const async = require('async');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');
const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils');
const filter = require('../filters/filter');

/**
 * fetch Cart Details.
 * @return return minicart Data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.fetchMiniCart = function fetchCartMain(headers, callback) {
  logger.debug('calling cart API to fetch product Items');
  const miniCartUrl = `${constants.cartData.replace(
    '{{storeId}}',
    headers.storeId,
  )}/@self?profileName=IBM_Summary`;
  const fetchMiniCartData = [getCartData.bind(null, miniCartUrl, headers)];

  async.waterfall(fetchMiniCartData, (err, results) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      callback(null, filter.filterData('minicart', results));
    }
  });
};

/**
 * fetch Cart Details.
 * @return return Quantity of items in Cart
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.fetchCartQuantity = function fetchCartMain(headers, callback) {
  logger.debug('calling cart API to fetch product Items');
  const cartQuantityUrl = `${constants.cartData.replace(
    '{{storeId}}',
    headers.storeId,
  )}/@self?profileName=IBM_Details`;

  getCartData(cartQuantityUrl, headers, (err, results) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      callback(null, filter.filterData('cart_quantity', results));
    }
  });
};

/**
 * fetch cart details.
 * else returns with product attributes.
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.fetchCart = function fetchCartMain(headers, callback) {
  logger.debug('calling cart API to fetch product Items');
  const mainCartUrl = `${constants.cartData.replace(
    '{{storeId}}',
    headers.storeId,
  )}/@self?profileName=IBM_Details`;
  const fetchCartData = [getCartData.bind(null, mainCartUrl, headers)];
  async.waterfall(fetchCartData, (err, results) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      callback(null, filter.filterData('cart', results));
    }
  });
};

module.exports.addToCart = function addCart(params, headers, callback) {
  logger.debug('calling cart API to ADD product Items');
  const cartBody = {};
  if (!params || !params.orderItem || params.orderItem.length === 0) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const item of params.orderItem) {
    if (!item.skuId || !item.quantity) {
      callback(errorutils.errorlist.invalid_params);
      break;
    }
  }

  cartBody.orderItem = params.orderItem;
  const addToCartTaskCMD = [addToCart.bind(null, headers, cartBody)];

  async.waterfall(addToCartTaskCMD, (err, results) => {
    if (err) {
      logger.error('Error', JSON.stringify(err));
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      callback(null, results);
    }
  });
};

/**
 * Remove all products from cart
 * @param access_token,storeId
 * @return 204,OK with remove all items from cart
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
module.exports.emptyCart = function emptyCart(headers, callback) {
  const error = [];
  const fetchCartOriginURL = `${constants.cartData.replace(
    '{{storeId}}',
    headers.storeId,
  )}/@self`;
  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    'DELETE',
    fetchCartOriginURL,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 204) {
        const resp = {
          message: 'Cart is Empty',
        };
        callback(null, resp);
      } else {
        error.push(errorutils.handleWCSError(response));
        callback(error);
      }
    },
  );
};

/**
 * Remove specific item from cart
 * @param access_token,storeId
 * @return 200,OK with remove all items from cart
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
module.exports.removeitem = function removeitem(params, headers, callback) {
  const error = [];
  if (!params || !params.orderItemId) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const fetchCartOriginURL = `${constants.cartData.replace(
    '{{storeId}}',
    headers.storeId,
  )}/@self/delete_order_item`;
  const reqHeader = headerutil.getWCSHeaders(headers);
  const reqBody = params;
  origin.getResponse(
    'PUT',
    fetchCartOriginURL,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        error.push(errorutils.handleWCSError(response));
        callback(error);
      }
    },
  );
};

/**
 * Update Quantity of Item in Cart
 * @param access_token,storeId
 * @return 200,OK with updaing the quantity successfully
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
module.exports.updateitem = function updateitem(params, headers, callback) {
  const error = [];

  if (!params || !params.orderItem || params.orderItem.length === 0) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const item of params.orderItem) {
    if (!item.orderItemId || !item.quantity) {
      callback(errorutils.errorlist.invalid_params);
      break;
    }
  }
  const fetchCartOriginURL = `${constants.cartData.replace(
    '{{storeId}}',
    headers.storeId,
  )}/@self/update_order_item`;
  const reqHeader = headerutil.getWCSHeaders(headers);
  const reqBody = params;
  origin.getResponse(
    'PUT',
    fetchCartOriginURL,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

function addToCart(headers, cartBody, callback) {
  const addToCartOriginURL = constants.cartData.replace(
    '{{storeId}}',
    headers.storeId,
  );
  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    'POST',
    addToCartOriginURL,
    reqHeader,
    null,
    cartBody,
    null,
    '',
    response => {
      if (response.status === 201) {
        logger.debug(
          `successfully added to cart for${JSON.stringify(cartBody)}`,
        );
        callback(null, response.body, reqHeader);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}

function getCartData(url, headers, callback) {
  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    'GET',
    url,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        logger.debug('Successfully Fetched Cart Data');
        callback(null, response.body);
      } else if (response.status === 404) {
        callback(null, getEmptyRecord());
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}

function getEmptyRecord() {
  const cartJson = {
    cartData: {},
  };
  return cartJson;
}
