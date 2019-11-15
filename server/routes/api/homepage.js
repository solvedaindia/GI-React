const express = require('express');
const router = express.Router();
const homepagehandler = require('../../handlers/homepagehandler');

/* Homepage Body Static Data */
router.get('/recommendedproduct', (req, res, next) => {
  homepagehandler.getRecommendedProducts(req.headers, (err, result) => {
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
