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

router.get('/userstatus/:logonId', (req, res, next) => {
  checkoutHandler.userstatus(req, (err, result) => {
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

router.post('/reserveinventory', (req, res, next) => {
  checkoutHandler.reserveInventory(req, (err, result) => {
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
