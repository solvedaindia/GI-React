const express = require('express');
const router = express.Router();
const activityHandler = require('../../handlers/activityhandler');
const espotNames = require('../../configs/espotnames');

/* Add Product to Recently Viewed */
router.post('/recentlyviewed/:productID', (req, res, next) => {
  activityHandler.addRecentlyViewedProduct(
    req.headers,
    req.params.productID,
    (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.status(200).send({
        status: 'success',
        data: result,
      });
    },
  );
});

/* Get Recommended Products */
router.get('/recommendedproduct/:activityName', (req, res, next) => {
  activityHandler.getRecommendedProducts(
    req.headers,
    req.params.activityName,
    (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.status(200).send({
        status: 'success',
        data: result,
      });
    },
  );
});

/* Get Best Seller Products By Category */
router.get('/bestseller', (req, res, next) => {
  activityHandler.getBestSellerProducts(req, (err, result) => {
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

/* Get Recommended Category */
router.get('/recommendedcategory/:activityName', (req, res, next) => {
  activityHandler.getRecommendedCategories(
    req.headers,
    req.params.activityName,
    (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.status(200).send({
        status: 'success',
        data: result,
      });
    },
  );
});

/* Get Featured Categories Data */
router.get('/featuredcategories', (req, res, next) => {
  activityHandler.getRecommendedCategories(
    req.headers,
    espotNames.featuredCategories,
    (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.status(200).send({
        status: 'success',
        data: result,
      });
    },
  );
});

module.exports = router;
