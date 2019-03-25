const express = require('express');
const router = express.Router();
const plphandler = require('../../handlers/plphandler');
const testjson = require('../../configs/testjson');

router.get('/productlist/:categoryId', (req, res, next) => {
  plphandler.getProductList(req, (err, result) => {
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

router.get('/productlist', (req, res, next) => {
  res.status(200).send({
    status: 'success',
    data: testjson.plp,
  });
});

module.exports = router;
