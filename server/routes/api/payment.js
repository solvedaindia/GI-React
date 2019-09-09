const express = require('express');
const router = express.Router();
const paymentHandler = require('../../handlers/paymenthandler.js');
const clientUrl =
  `https://${process.env.WEBSERVER_IP}/` || 'https://203.110.85.50/';

router.post('/initiateBDPayment', (req, res, next) => {
  paymentHandler.initiateBDPayment(req.body, req.headers, (err, result) => {
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

router.post('/checkout', (req, res, next) => {
  paymentHandler.confirmCheckout(req.body, req.headers, (err, result) => {
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

router.post('/handlePayment', (req, res, next) => {
  paymentHandler.verifyChecksum(req.headers, req.body, (err, data) => {
    if (err || data.paymentStatus !== 'success') {
      res.redirect(`${clientUrl}checkout?status=fail`);
    } else {
      res.redirect(`${clientUrl}check/payment/${data.orderID}`);
    }
  });
});

module.exports = router;
