const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');
const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const productUtil = require('../utils/productutil');
const wishlistFilter = require('../filters/wishlistfilter');

const wishlistName = 'My Wishlist';

/**
 * fetch Wishlist Item Count.
 * @return Wishlist Item Count
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.wishlistItemCount = function getWishlistItemCount(
  headers,
  callback,
) {
  logger.debug('Entering method wishlisthandler: wishlistItemCount');

  getWishlistData(headers, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      callback(null, wishlistFilter.itemcount(result));
    }
  });
};

/**
 * fetch Wishlist Item List.
 * @return Wishlist Item List with Wishlist ID
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.wishlistItemList = function wishlistItemList(headers, callback) {
  logger.debug('Entering method wishlisthandler: wishlistItemList');

  getWishlistData(headers, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      callback(null, wishlistFilter.itemlist(result));
    }
  });
};

/**
 * fetch Wishlist details.
 * @return Wishlist Page Data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.fetchWishlist = function fetchWishlist(headers, callback) {
  logger.debug('Entering method mylisthandler: fetchWishlist');

  getWishlistData(headers, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    const wishlistJson = {
      wishlistID: '',
      wishlistName: '',
      wishlistItemCount: 0,
      wishlistData: [],
    };
    const productIDs = [];
    if (res.GiftList && res.GiftList.length > 0) {
      wishlistJson.wishlistID = res.GiftList[0].uniqueID;
      wishlistJson.wishlistName = res.GiftList[0].descriptionName;
      if (res.GiftList[0].item && res.GiftList[0].item.length > 0) {
        wishlistJson.wishlistItemCount = res.GiftList[0].item.length;
        res.GiftList[0].item.forEach(listItem => {
          productIDs.push(listItem.productId);
        });

        productUtil.productByProductIDs(
          productIDs,
          headers,
          (error, result) => {
            if (error) {
              callback(error);
              return;
            }
            const productListArray = result.productList;
            productListArray.forEach(productDetail => {
              for (
                let index = 0;
                index < res.GiftList[0].item.length;
                index += 1
              ) {
                if (
                  productDetail.uniqueID ===
                  res.GiftList[0].item[index].productId
                ) {
                  // eslint-disable-next-line no-param-reassign
                  productDetail.giftListItemID =
                    res.GiftList[0].item[index].giftListItemID;
                  break;
                }
              }
            });
            wishlistJson.wishlistData = productListArray;
            callback(null, wishlistJson);
          },
        );
      } else {
        callback(null, wishlistJson);
      }
    } else {
      callback(null, wishlistJson);
    }
  });
};

/**
 * fetch Wishlist Names.
 * @return return total count and names of wishlist
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.fetchlistnames = fetchlistNames;
function fetchlistNames(headers, callback) {
  logger.debug('Entering method mylisthandler: Fetch WishList Names');
  getWishlistData(headers, (err, result) => {
    if (err) {
      callback(errorutils.handleWCSError(err));
    } else {
      const wishlistNamesJson = {
        wishlistCount: 0,
        wishlistDetails: [],
      };
      if (result.GiftList && result.GiftList.length > 0) {
        wishlistNamesJson.wishlistCount = result.GiftList.length;
        result.GiftList.forEach(item => {
          const details = {
            wishlistName: item.descriptionName ? item.descriptionName : '',
            wishlistId: item.uniqueID,
          };
          wishlistNamesJson.wishlistDetails.push(details);
        });
      }
      callback(null, wishlistNamesJson);
    }
  });
}

/**
 * Create Wishlist.
 * @return response from WCS
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
/* module.exports.createlist = function createWishlist(headers, body, callback) {
  logger.debug('Entering method mylisthandler: Create Wishlist');
  const error = [];
  if (!body.wishlistname) {
    error.push(errorutils.errorlist.wishlist.listname_missing);
  }
  if (error.length > 0) {
    callback(error);
    return;
  }
  const createWishListURL = constants.createWishlist.replace(
    '{{storeId}}',
    headers.storeId,
  );
  const reqHeader = headerutil.getWCSHeaders(headers);

  const reqBody = {
    descriptionName: body.wishlistname,
  };
  origin.getResponse(
    'POST',
    createWishListURL,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 201 || response.status === 200) {
        callback(null, response.body);
      } else {
        logger.debug('Error while calling CreateWishlist api', response.status);
        error.push(errorutils.handleWCSError(response));
        callback(error);
      }
    },
  );
}; */

/**
 * Create Wishlist and Add Item.
 * @return response from WCS
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.createAndAdd = createAndAdd;
function createAndAdd(headers, body, callback) {
  logger.debug('Entering method mylisthandler: Create Wishlist and Add Item');
  if (!body.wishlistName || !body.productId) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  const createWishListURL = constants.createWishlist.replace(
    '{{storeId}}',
    headers.storeId,
  );
  const reqHeader = headerutil.getWCSHeaders(headers);
  const reqBody = {
    descriptionName: body.wishlistName,
    item: [{ productId: body.productId, quantityRequested: '1' }],
  };
  origin.getResponse(
    'POST',
    createWishListURL,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 201 || response.status === 200) {
        callback(null, response.body);
      } else {
        logger.error('Error while calling Create&Additem api', response.status);
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}

/**
 * Add Item to a Wishlist.
 * @return response from WCS
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.addItem = addItem;
function addItem(headers, body, callback) {
  logger.debug('Entering method mylisthandler: Add Item');
  if (!body.wishlistId || !body.productId) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const addItems = `${constants.editWishlist
    .replace('{{storeId}}', headers.storeId)
    .replace('{{wishlistid}}', body.wishlistId)}?addItem=true`;
  const reqHeader = headerutil.getWCSHeaders(headers);
  const reqBody = {
    item: [
      {
        productId: body.productId,
        quantityRequested: '1',
      },
    ],
  };
  origin.getResponse(
    'PUT',
    addItems,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 201 || response.status === 200) {
        callback(null, response.body);
      } else {
        logger.error('Error while calling Add Item api', response.status);
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}

/**
 * Rename Wishlist.
 * @return response from WCS
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
/* module.exports.rename = function rename(headers, body, callback) {
  logger.debug('Entering method mylisthandler: Rename Wishlist');
  const error = [];
  if (!body.wishlistid) {
    error.push(errorutils.errorlist.wishlist.listid_missing);
  }
  if (!body.wishlistname) {
    error.push(errorutils.errorlist.wishlist.listname_missing);
  }
  if (error.length > 0) {
    callback(error);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(headers);
  const addItems = `${constants.editWishlist
    .replace('{{storeId}}', headers.storeId)
    .replace('{{wishlistid}}', body.wishlistid)}`;
  const reqBody = {
    descriptionName: body.wishlistname,
  };
  origin.getResponse(
    'PUT',
    addItems,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 201 || response.status === 200) {
        callback(null, response.body);
      } else {
        logger.error('Error while calling RenameWishlist api', response.status);
        error.push(errorutils.handleWCSError(response));
        callback(error);
      }
    },
  );
}; */

/**
 * Delete Wishlist.
 * @return response from WCS
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
/* module.exports.deletelist = function deletelist(headers, body, callback) {
  logger.debug('Entering method mylisthandler: Delete Wishlist');
  const error = [];
  if (!body.wishlistid) {
    error.push(errorutils.errorlist.wishlist.listid_missing);
  }
  if (error.length > 0) {
    callback(error);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(headers);
  const deleteList = `${constants.editWishlist
    .replace('{{storeId}}', headers.storeId)
    .replace('{{wishlistid}}', body.wishlistid)}`;
  origin.getResponse(
    'DELETE',
    deleteList,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 201 || response.status === 200) {
        callback(null, response.body);
      } else {
        logger.error('Error while calling DeleteWishlist api', response.status);
        error.push(errorutils.handleWCSError(response));
        callback(error);
      }
    },
  );
}; */

/**
 * Delete item from Wishlist.
 * @return response from WCS
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.deleteitem = function deleteitem(headers, body, callback) {
  logger.debug('Entering method mylisthandler: Delete Item');
  if (!body.wishlist_id || !body.giftlistitem_id) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  const reqHeader = headerutil.getWCSHeaders(headers);
  const deleteItems = `${constants.editWishlist
    .replace('{{storeId}}', headers.storeId)
    .replace('{{wishlistid}}', body.wishlist_id)}?itemId=${
    body.giftlistitem_id
  }`;
  origin.getResponse(
    'DELETE',
    deleteItems,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 201 || response.status === 200) {
        callback(null, response.body);
      } else {
        logger.error('Error while calling Deleteitem api', response.status);
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

function getWishlistData(headers, callback) {
  const fetchWishListOriginURL = constants.mylistFetch.replace(
    '{{storeId}}',
    headers.storeId,
  );
  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    'GET',
    fetchWishListOriginURL,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else if (response.status === 404) {
        const wishAllList = {
          wishlistTotalItems: 0,
        };
        callback(null, wishAllList);
      } else {
        logger.error('Error while calling wishList api.', response.status);
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}

module.exports.addItemInWishlist = function addItemInWishlist(
  headers,
  body,
  callback,
) {
  logger.debug('entering add Item method');

  if (!body.sku_id) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  fetchlistNames(headers, (err, result) => {
    if (err) {
      logger.error('Error in Fetch List Names');
      callback(errorutils.handleWCSError(err));
    } else {
      // eslint-disable-next-line prefer-destructuring
      const wishlistCount = result.wishlistCount;
      const reqBody = {
        productId: body.sku_id,
      };
      if (wishlistCount === 0) {
        reqBody.wishlistName = wishlistName;
        createAndAdd(headers, reqBody, callback);
      } else {
        reqBody.wishlistId = result.wishlistDetails[0].wishlistId;
        addItem(headers, reqBody, callback);
      }
    }
  });
};
