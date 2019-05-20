const express = require('express');
const router = express.Router();
const emiUtils = require('../../utils/emiutil');

router.get('/emidetails/:sellingprice', (req, res, next) => {
  emiUtils.emiDataBySellingPrice(
    req.params.sellingprice,
    req.headers,
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

router.get('/minimumemivalue/:sellingprice', (req, res, next) => {
  emiUtils.getMinimumEmiValue(
    req.params.sellingprice,
    req.headers,
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
