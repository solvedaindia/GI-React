const express = require('express');
const router = express.Router();
const paymentHandler = require('../../handlers/paymenthandler.js');

router.get('/initiateBDPayment', (req, res, next) => {
  paymentHandler.initiateBDPayment(req.query, req.headers, (err, result) => {
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

router.post('/verifyBDPayment', (req, res, next) => {
  paymentHandler.verifyBDPayment(req.body, req.headers, (err, result) => {
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
