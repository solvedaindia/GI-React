const express = require('express');
const router = express.Router({
  caseSensitive: true,
});

/* Secure Routes */
router.use('/secure/login', require('./api/login'));
router.use('/secure/logout', require('./api/logout'));
router.use('/secure/signup', require('./api/signup'));
router.use('/secure/userinfo', require('./api/users'));
router.use('/secure/users', require('./api/users'));
router.use('/secure/cart', require('./api/cart'));
router.use('/secure/wishlist', require('./api/wishlist'));
router.use('/secure/orders', require('./api/orders'));
router.use('/secure/token', require('./api/guesttoken'));

/* Non-Secure Routes */
router.use('/categories', require('./api/category'));
router.use('/footer', require('./api/footer'));
router.use('/header_static_info', require('./api/header'));
router.use('/homebody', require('./api/homepage'));
router.use('/search', require('./api/search'));
router.use('/espots', require('./api/espots'));
router.use('/otp', require('./api/otp'));
router.use('/clp', require('./api/clp'));
router.use('/plp', require('./api/plp'));
router.use('/newsletter', require('./api/newsletter'));
router.use('/pdp', require('./api/pdp'));

module.exports = router;
