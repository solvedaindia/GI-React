const async = require('async');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');
const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils');
const cartFilter = require('../filters/cartfilter');
const productUtil = require('../utils/productutil');
const promotionUtil = require('../utils/promotionutil');
const pincodeUtil = require('../utils/pincodeutil');

const cartProfileName = 'IBM_Details';
const cartCalculationUsage = '-1,-2,-4,-5,-7';
const cartCalculationUsageAddAddress = '-2,-4,-7';
const cartCalculateOrder = '1';

/**
 * Fetch Mini Cart Details.
 * @return return minicart Data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.fetchMiniCart = function fetchCartMain(headers, callback) {
  logger.debug('calling cart API to fetch product Items');

  const fetchMiniCartData = [
    getCartData.bind(null, headers),
    getMiniCartProductDetails,
    mergeMiniCart,
  ];
  async.waterfall(fetchMiniCartData, (err, results) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      callback(null, results);
    }
  });

  /*  getCartData(headers, (error, res) => {
    if (error) {
      callback(error);
      return;
    }
    const miniCartJson = {
      miniCartData: [],
    };
    if (res.orderItem && res.orderItem.length > 0) {
      const productIDs = [];
      res.orderItem.forEach(item => {
        productIDs.push(item.productId);
      });
      productUtil.productByProductIDs(productIDs, headers, (err, result) => {
        if (err) {
          callback(err);
          return;
        }
        const productListArray = result.productList;
        miniCartJson.miniCartData = cartFilter.minicart(res, productListArray);
        callback(null, miniCartJson);
      });
    } else {
      callback(null, miniCartJson);
    }
  }); */
};

/**
 * fetch Cart Details.
 * @return return Quantity of items in Cart
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.fetchCartQuantity = function fetchCartMain(headers, callback) {
  logger.debug('calling cart API to fetch product Items');
  getCartData(headers, (err, results) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      callback(null, cartFilter.quantity(results));
    }
  });
};

/**
 * fetch Cart Order Summary.
 * @return return Order Summary Data for Cart
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.cartOrderSummary = function cartOrderSummary(headers, callback) {
  logger.debug('calling cart API to fetch Cart Order Summary');
  getCartData(headers, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      const cartSummary = {
        orderSummary: {},
      };
      if (result.orderItem && result.orderItem.length > 0) {
        cartSummary.orderSummary = cartFilter.getOrderSummary(result);
      }
      callback(null, cartSummary);
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
  if (!headers.pincode) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  /* eslint no-param-reassign: "error" */
  headers.promotionData = 'false';
  const fetchCartData = [
    getCartData.bind(null, headers),
    getcartPageProductDetails,
    mergeCartData,
  ];

  // const fetchCartData = [getCartData.bind(null, headers)];
  async.waterfall(fetchCartData, (err, results) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      callback(null, results);
    }
  });
};

module.exports.addToCart = function addCart(params, headers, callback) {
  logger.debug('calling cart API to ADD product Items');
  if (!params || !params.orderItem || params.orderItem.length === 0) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  const reqBody = {
    orderItem: [],
    x_calculationUsage: cartCalculationUsage,
    x_calculateOrder: cartCalculateOrder,
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const item of params.orderItem) {
    if (!item.sku_id || !item.quantity) {
      callback(errorutils.errorlist.invalid_params);
      return;
    }
    const orderItemJSON = {
      productId: item.sku_id,
      quantity: item.quantity,
    };
    reqBody.orderItem.push(orderItemJSON);
  }

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
    reqBody,
    null,
    '',
    response => {
      if (response.status === 201) {
        logger.debug('Got all the origin resposes');
        callback(null, response.body, reqHeader);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );

  /*  const addToCartTaskCMD = [addToCart.bind(null, headers, reqBody)];

  async.waterfall(addToCartTaskCMD, (err, results) => {
    if (err) {
      logger.error('Error', JSON.stringify(err));
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      callback(null, results);
    }
  }); */
};

/**
 * Remove all products from cart
 * @param access_token,storeId
 * @return 204,OK with remove all items from cart
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
module.exports.emptyCart = function emptyCart(headers, callback) {
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
        callback(errorutils.handleWCSError(response));
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
  reqBody.x_calculationUsage = cartCalculationUsage;
  reqBody.x_calculateOrder = cartCalculateOrder;

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

/**
 * Update Quantity of Item in Cart
 * @param access_token,storeId
 * @return 200,OK with updaing the quantity successfully
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
module.exports.updateitem = function updateitem(params, headers, callback) {
  if (!params || !params.orderItem || params.orderItem.length === 0) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const item of params.orderItem) {
    if (!item.orderItemId || !item.quantity) {
      callback(errorutils.errorlist.invalid_params);
      return;
    }
  }
  const fetchCartOriginURL = `${constants.cartData.replace(
    '{{storeId}}',
    headers.storeId,
  )}/@self/update_order_item`;

  const reqHeader = headerutil.getWCSHeaders(headers);

  const reqBody = params;
  reqBody.x_calculationUsage = cartCalculationUsage;
  reqBody.x_calculateOrder = cartCalculateOrder;

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

function getCartData(headers, callback) {
  const cartUrl = `${constants.cartData.replace(
    '{{storeId}}',
    headers.storeId,
  )}/@self?profileName=${cartProfileName}`;
  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    'GET',
    cartUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        logger.debug('Successfully Fetched Cart Data');
        callback(null, response.body, headers);
      } else if (response.status === 404) {
        callback(null, getEmptyRecord(), headers);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}

/* Get Product Details for MiniCart Items */
function getMiniCartProductDetails(cartData, headers, callback) {
  let productListArray = [];

  if (cartData.orderItem && cartData.orderItem.length > 0) {
    const productIDs = [];
    cartData.orderItem.forEach(item => {
      productIDs.push(item.productId);
    });
    productUtil.productByProductIDs(productIDs, headers, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      productListArray = result.productList;
      callback(null, cartData, productListArray, headers);
    });
  } else {
    callback(null, cartData, productListArray, headers);
  }
}

/* Get Product Details for Cart Page with Inventory Details */
function getcartPageProductDetails(cartData, headers, callback) {
  let productListArray = [];

  if (cartData.orderItem && cartData.orderItem.length > 0) {
    const productIDs = []; // Params to Find Product Details
    const reqParamArray = []; // Params to Find Inventory Details
    cartData.orderItem.forEach(item => {
      const reqParam = {
        pincode: headers.pincode,
        partNumber: item.partNumber,
        quantity: Number(item.quantity),
      };
      reqParamArray.push(reqParam);
      productIDs.push(item.productId);
    });

    const productListTask = [
      productUtil.productByProductIDs.bind(null, productIDs, headers),
      getInventoryDetails.bind(null, headers, reqParamArray),
    ];

    async.parallel(productListTask, (err, result) => {
      if (err) {
        callback(err);
      } else {
        productListArray = result[0].productList;
        productListArray.forEach(product => {
          for (let index = 0; index < result[1].length; index += 1) {
            if (
              product.uniqueID === result[1][index].inventoryDetails.uniqueID
            ) {
              // eslint-disable-next-line no-param-reassign
              product.inventoryStatus =
                result[1][index].inventoryDetails.inventoryStatus;
              // eslint-disable-next-line no-param-reassign
              product.deliveryDate =
                result[1][index].inventoryDetails.deliveryDate || '';
              break;
            }
          }
        });
        callback(null, cartData, productListArray, headers);
      }
    });
  } else {
    callback(null, cartData, productListArray, headers);
  }
}

function getInventoryDetails(headers, reqParamArray, callback) {
  async.map(
    reqParamArray,
    (reqParam, cb) => {
      pincodeUtil.findInventory(headers, reqParam, (error, result) => {
        if (!error) {
          // eslint-disable-next-line no-param-reassign
          reqParam.inventoryDetails = result;
          cb(null, reqParam);
        } else {
          cb(error);
        }
      });
    },
    (errors, results) => {
      if (errors) {
        callback(errors);
        return;
      }
      const inventoryDetail = [];
      results.forEach(element => {
        inventoryDetail.push(element);
      });
      callback(null, inventoryDetail);
    },
  );
}

/* Merge Cart Data and Product Details to Get MiniCart Data */
function mergeMiniCart(cartData, productList, headers, callback) {
  // callback(null, cartFilter.minicart(cartData, productList));

  const minicartJson = {
    orderID: '',
    cartTotalQuantity: 0,
    cartTotalItems: 0,
    miniCartData: [],
  };
  if (
    cartData.orderItem &&
    cartData.orderItem.length > 0 &&
    productList.length > 0
  ) {
    const orderItemDetails = cartFilter.mergeOrderItem(
      cartData.orderItem,
      productList,
    );
    minicartJson.orderID = cartData.orderId;
    minicartJson.cartTotalQuantity = orderItemDetails.cartTotalQuantity;
    minicartJson.cartTotalItems = orderItemDetails.cartTotalItems;
    minicartJson.miniCartData = orderItemDetails.orderItemList;
  }
  callback(null, minicartJson);
}

/* Merge Cart Data and Product Details to Get Cart Page Data */
function mergeCartData(cartData, productList, headers, callback) {
  const cartDetails = {
    orderSummary: {},
    cartTotalItems: 0,
    cartItems: [],
  };
  if (
    cartData.orderItem &&
    cartData.orderItem.length > 0 &&
    productList.length > 0
  ) {
    cartDetails.orderSummary = cartFilter.getOrderSummary(cartData);
    const mergedCartData = cartFilter.mergeOrderItem(
      cartData.orderItem,
      productList,
    );
    cartDetails.cartTotalItems = mergedCartData.cartTotalItems;
    cartDetails.cartItems = mergedCartData.orderItemList;
    // cartDetails.actualCartData = cartData;
  }
  callback(null, cartDetails);
}

function getEmptyRecord() {
  const cartJson = {
    cartData: {},
  };
  return cartJson;
}

/**
 * Function to return Promo codes
 * @return return Promocodes Data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getPromoCodes = function getPromoCodesData(req, callback) {
  const reqHeaders = req.headers;
  promotionUtil.getPromotionsList(reqHeaders, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Get all origin response : getPromoCodes');
      const promoData = [];
      const promotions = result.Promotion;
      if (promotions && promotions.length > 0) {
        async.map(
          promotions,
          (promotion, cb) => {
            promotionUtil.getPromoCode(
              promotion.promotionId,
              reqHeaders,
              (error, promotionData) => {
                if (!error) {
                  cb(null, promotionData);
                } else {
                  cb(null, null); // ignore if promocode is not found against promotionId
                }
              },
            );
          },
          (errors, results) => {
            if (errors) {
              callback(errors);
              return;
            }
            results.forEach(element => {
              if (element !== null) {
                promoData.push({
                  promocode: element.promoCode,
                  description: element.description,
                });
              }
            });
            callback(null, promoData);
          },
        );
      } else {
        callback(null, promoData);
      }
    }
  });
};

/**
 * Add Address to cart items
 * @param access_token,storeId,addressID
 * @return 200,OK with adding item to Cart
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
module.exports.addAddress = addAddress;
function addAddress(headers, params, callback) {
  logger.debug('Adding Address To Cart');
  if (
    !params ||
    !params.orderItem ||
    params.orderItem.length === 0 ||
    !params.addressId ||
    !params.shipModeId
  ) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const item of params.orderItem) {
    if (!item.orderItemId || !item.shipModeId || !item.addressId) {
      callback(errorutils.errorlist.invalid_params);
      return;
    }
  }
  const reqBody = params;
  reqBody.shipAsComplete = '1';
  reqBody.x_calculationUsage = cartCalculationUsageAddAddress;

  const addAddressCart = `${constants.cartData.replace(
    '{{storeId}}',
    headers.storeId,
  )}/@self/shipping_info`;

  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    'PUT',
    addAddressCart,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 200) {
        logger.debug('Got all the origin resposes');
        callback(null, response.body);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}

/**
 * Get Ship Modes List
 * @param access_token,storeId,addressID
 * @return 200,OK with fetching all shipmodes
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
module.exports.getShipModes = getShipModes;
function getShipModes(headers, callback) {
  logger.debug('Get Shipmodes');

  // const reqHeader = headerutil.getWCSHeaders(headers);
  const originUrl = `${constants.cartData.replace(
    '{{storeId}}',
    headers.storeId,
  )}/shipping_modes`;

  origin.getResponse(
    'GET',
    originUrl,
    null,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const shippingModes = {
          shipModes: [],
        };
        if (
          response.body.usableShippingMode &&
          response.body.usableShippingMode.length > 0
        ) {
          response.body.usableShippingMode.forEach(shipMode => {
            const shipJson = {
              shipModeId: shipMode.shipModeId,
              shipModeCode: shipMode.shipModeCode || '',
              shipModeDescription: shipMode.shipModeDescription || '',
            };
            shippingModes.shipModes.push(shipJson);
          });
        }
        callback(null, shippingModes);
      } else {
        logger.debug('Error While calling Shipping Modes API');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}

/**
 * Checkout Cart
 * @param access_token,storeId,addressID
 * @return 200,OK with Checkout
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
module.exports.checkout = checkout;
function checkout(headers, params, callback) {
  logger.debug('Adding Address To Cart');
  if (!params || !params.orderId) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const reqBody = {
    orderId: params.orderId,
  };
  const checkoutURL = `${constants.cartData.replace(
    '{{storeId}}',
    headers.storeId,
  )}/@self/checkout`;

  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    'POST',
    checkoutURL,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 201 || response.status === 200) {
        logger.debug('Got all the origin resposes');
        callback(null, response.body);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}

/**
 * Pre Checkout Cart
 * @param access_token,storeId,addressID
 * @return 200,OK with inventory details
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
module.exports.precheckout = function precheckout(req, callback) {
  logger.debug('Inside Reserve Inventory API');
  if (!req.body.order_id) {
    logger.debug('Invalid Params : Reserve Inventory API');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(req.headers);
  const reqBody = {
    orderId: req.body.order_id,
  };
  const originUrl = constants.reserveInventory.replace(
    '{{storeId}}',
    req.headers.storeId,
  );

  origin.getResponse(
    'PUT',
    originUrl,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        logger.debug('Error While Set Reserve Inventory API');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
