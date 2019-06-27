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
  const reqParams = {
    longitude: req.query.longitude,
    latitude: req.query.latitude,
  };
  storeLocatorHandler.storesByCoordinates(req, reqParams, (err, result) => {
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

router.get('/byId/:gi_storeId', (req, res, next) => {
  const id = req.params.gi_storeId;
  storeLocatorHandler.storeByPhysicalIdentifier(
    req.headers,
    id,
    (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.status(200).send({
        status: 'success',
        data: result,
      });
    },
  );
});

module.exports = router;
