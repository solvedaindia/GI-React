const express = require('express');
const router = express.Router();
const url = require('url');
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
<<<<<<< Updated upstream
  // let idArray = [];
  const url1 = req.originalUrl;
  const parsedUrl = url.parse(url1, true);
  const ids = parsedUrl.search.slice(1);
  console.log(ids, 'query params....');
  // if (req.query.id instanceof Array) {
  //   idArray = req.query;
  // } else {
  //   idArray.push(req.query.id);
  // }
=======
  let idArray = [];
  if (req.query.id instanceof Array) {
    idArray = req.query.id;
  } else {
    idArray.push(req.query.id);
  }
>>>>>>> Stashed changes
  storeLocatorHandler.storeByPhysicalIdentifier(
    req.headers,
    ids,
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
