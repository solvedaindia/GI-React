const express = require('express');
const router = express.Router();
const pdpHandler = require('../../handlers/pdphandler');

router.get('/productDetails/:skuId', (req, res, next) => {
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

router.get('/productavailability/:pincode', (req, res, next) => {
  req.query.pincode = req.params.pincode;
  pdpHandler.getPincodeServiceability(req.headers, req.query, (err, result) => {
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

router.post('/notifyme', (req, res, next) => {
  pdpHandler.setProductNotification(req, (err, result) => {
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
