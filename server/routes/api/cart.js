const express = require('express');
const router = express.Router();
const cartHandler = require('../../handlers/carthandler');
const promotionUtil = require('../../utils/promotionutil');
const checkoutHandler = require('../../handlers/checkouthandler');

/**
 * fetch cart details
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
router.get('/page', (req, res, next) => {
  cartHandler.fetchCart(req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

/**
 * fetch cart order summary
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
router.get('/ordersummary', (req, res, next) => {
  cartHandler.cartOrderSummary(req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

/**
 * fetch cart item quantity
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
router.get('/quantity', (req, res, next) => {
  cartHandler.fetchCartQuantity(req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

/**
 * fetch MiniCart Data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
router.get('/minicart', (req, res, next) => {
  cartHandler.fetchMiniCart(req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

/**
 * Add Item to Cart
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
router.post('/add', (req, res, next) => {
  cartHandler.addToCart(req.body, req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

/**
 * Remove all products from cart
 * @param access_token,storeId
 * @return 200,OK with remove all items from cart
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
router.post('/empty', (req, res, next) => {
  cartHandler.emptyCart(req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

/**
 * Remove specific product from cart
 * @param access_token,storeId
 * @return 200,OK with remove specific items from cart
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
router.post('/remove', (req, res, next) => {
  cartHandler.removeitem(req.body, req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

/**
 * Update Quantity of Item in Cart
 * @param access_token,storeId
 * @return 200,OK with updaing the quantity successfully
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
router.post('/update', (req, res, next) => {
  cartHandler.updateitem(req.body, req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

/**
 * Apply Promocode to Cart
 * @param access_token,storeId
 * @return 200,OK Applying the Promotion Successfully
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
router.post('/applypromotion', (req, res, next) => {
  promotionUtil.applyCartPromotion(req.headers, req.body, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

/**
 * Remove Promocode from Cart
 * @param access_token,storeId
 * @return 200,OK Removed the Promotion Successfully
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
router.post('/removepromotion/:promoCode', (req, res, next) => {
  promotionUtil.removeCartPromotion(req.headers, req.params, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

/**
 * Get Public Promotions
 * @param access_token,storeId
 * @return 200, return promocode data
 * @throws contexterror,badreqerror if storeid or access_token is invalid or null
 */
router.get('/promocode', (req, res, next) => {
  cartHandler.getPromoCodes(req, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

module.exports = router;
