const express = require('express');
const router = express.Router();
const pdpHandler = require('../../handlers/pdphandler');
const productDetail = require('../../configs/pdpjson');

router.get('/', (req, res, next) => {
  pdpHandler.getPdpData(req, (err, result) => {
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

router.get('/productData', (req, res) => {
  res.status(200).send({
    status: 'success',
    data: productDetail.productData,
  });
});

module.exports = router;
