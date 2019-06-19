const express = require('express');
const router = express.Router();
const otpHandler = require('../../handlers/otphandler');

/* Generate OTP */
router.post('/generate', (req, res, next) => {
  otpHandler.generateOtp(req.body, req.headers, (err, result) => {
    if (err) {
      res.status(err.status_code).send({
        status: 'failure',
        error: err,
      });
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

/* Validate OTP */
router.post('/validate', (req, res, next) => {
  otpHandler.validateOtp(req.body, req.headers, (err, result) => {
    if (err) {
      res.status(err.status_code).send({
        status: 'failure',
        error: err,
      });
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

module.exports = router;
