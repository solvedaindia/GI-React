const express = require('express');
const router = express.Router();
const pdpHandler = require('../../handlers/pdphandler');
const activityHandler = require('../../handlers/activityhandler');
const apiCache = require('../../utils/apicache');

router.get('/productDetails/:skuId', (req, res, next) => {
  apiCache.getCachedResponse('pdp', req, cacheRes => {
    if (cacheRes) {
      activityHandler.addRecentlyViewedProduct(req.headers, req.params.skuId);
      res.status(200).send(cacheRes);
    } else {
      pdpHandler.getProductDetails(req, (err, result) => {
        if (err) {
          next(err);
          return;
        }
        const resJSON = {
          status: 'success',
          data: result,
        };
        apiCache.cacheResponse('pdp', req, resJSON);
        res.status(200).send(resJSON);
      });
    }
  });
});

router.get('/productavailability/:pincode', (req, res, next) => {
  req.query.pincode = req.params.pincode;
  pdpHandler.getPincodeServiceability(req.headers, req.query, (err, result) => {
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

router.get('/productavailabilitybundle/:pincode', (req, res, next) => {
  req.query.pincode = req.params.pincode;
  pdpHandler.getPincodeServiceabilityForBundle(
    req.headers,
    req.query,
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

router.post('/notifyme', (req, res, next) => {
  pdpHandler.setProductNotification(req, (err, result) => {
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
