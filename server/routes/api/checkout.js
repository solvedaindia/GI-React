const express = require('express');
const router = express.Router();
const checkoutHandler = require('../../handlers/checkouthandler');

router.post('/savegstin', (req, res, next) => {
  checkoutHandler.storeGSTINValue(req, (err, result) => {
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

router.get('/userinfo', (req, res, next) => {
  checkoutHandler.getUserInfo(req, (err, result) => {
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
