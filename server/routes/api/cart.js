const express = require('express');
const router = express.Router();
const cartHandler = require('../../handlers/carthandler');

/**
 * fetch cart details
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
router.get('/checkout', (req, res, next) => {
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

module.exports = router;
