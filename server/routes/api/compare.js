const express = require('express');
const router = express.Router();
const comparehandler = require('../../handlers/comparehandler');
// const productDetail = require('../../configs/pdpjson');

router.get('/products', (req, res, next) => {
  comparehandler.getCompareData(req, (err, result) => {
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

// router.get('/productData', (req, res) => {
//   res.status(200).send({
//     status: 'success',
//     data: productDetail,
//   });
// });

module.exports = router;
