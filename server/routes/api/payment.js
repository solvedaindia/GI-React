const express = require('express');
const router = express.Router();
const paymentHandler = require('../../handlers/paymenthandler.js');

router.get('/createchecksum', (req, res, next) => {
  paymentHandler.createChecksum(req.query, req.headers, (err, result) => {
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

router.post('/verifychecksum', (req, res, next) => {
  paymentHandler.verifyChecksum(req.body, req.headers, (err, result) => {
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
