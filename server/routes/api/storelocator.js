const express = require('express');
const router = express.Router();
const storeLocatorHandler = require('../../handlers/storelocatorhandler');

router.get('/bylocation', (req, res, next) => {
  storeLocatorHandler.storesByLocation(req, (err, result) => {
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

router.get('/bycoordinates', (req, res, next) => {
  storeLocatorHandler.storesByCoordinates(req, (err, result) => {
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
