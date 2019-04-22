const express = require('express');
const router = express.Router();
const activityHandler = require('../../handlers/activityhandler');

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

/* Get Recently Viewed Products */
router.get('/recentlyviewed', (req, res, next) => {
  activityHandler.getRecentlyViewedProduct(req.headers, (err, result) => {
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

/* Get Best Seller Products By Category */
router.get('/bestseller/bycategory/:categoryID', (req, res, next) => {
  activityHandler.getBestSellerProducts(
    req.headers,
    req.params.categoryID,
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
  activityHandler.getFeaturedCategories(req.headers, (err, result) => {
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
