const express = require('express');
const router = express.Router();
const url = require('url');
const storeLocatorHandler = require('../../handlers/storelocatorhandler');

/**
 *  Get Stores by Location i.e CityName
 */
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

/**
 *  Get Stores by Coordinates
 */
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

/**
 *  Get Stores by Physical Store ID
 */
router.get('/byId', (req, res, next) => {
  const physicalStoreIdUrl = req.originalUrl;
  const physicalStoreIdQuery = url.parse(physicalStoreIdUrl, true);
  const physicalStoreId = physicalStoreIdQuery.search.slice(1);
  storeLocatorHandler.storeByPhysicalIdentifier(
    req.headers,
    physicalStoreId,
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
