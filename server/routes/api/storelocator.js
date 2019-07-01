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

router.get('/byId', (req, res, next) => {
  const idArray = req.query.id;
  // eslint-disable-next-line no-console
  console.log(idArray, 'request params');
  // const id = req.params.gi_storeId;
  storeLocatorHandler.storeByPhysicalIdentifier(
    req.headers,
    idArray,
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
