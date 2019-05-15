const express = require('express');
const router = express.Router();
const pdpHandler = require('../../handlers/pdphandler');
// const productDetail = require('../../configs/pdpjson');

router.get('/productDetails/:productId', (req, res, next) => {
  pdpHandler.getProductDetails(req, (err, result) => {
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
