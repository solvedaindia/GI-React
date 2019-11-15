const express = require('express');
const router = express.Router();
const plphandler = require('../../handlers/plphandler');
const apiCache = require('../../utils/apicache');

/* To Get Product List By Category ID for PLP */
router.get('/bycategory/:categoryId', (req, res, next) => {
  apiCache.getCachedResponse('plp', req, cacheRes => {
    if (cacheRes) {
      res.status(200).send(cacheRes);
    } else {
      plphandler.getProductsByCategory(req, (err, result) => {
        if (err) {
          next(err);
          return;
        }
        const resJSON = {
          status: 'success',
          data: result,
        };
        apiCache.cacheResponse('plp', req, resJSON);
        res.status(200).send(resJSON);
      });
    }
  });
});

/* To Get Product List By Serach Term for PLP */
router.get('/bysearchterm/:searchterm', (req, res, next) => {
  plphandler.getProductsBySearchTerm(req, (err, result) => {
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

/* To Get Static Product List Data */
router.get('/byIds', (req, res, next) => {
  plphandler.productListByIds(req.headers, req.query, (err, result) => {
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

router.get('/bypartnumbers', (req, res, next) => {
  plphandler.productListByPartNumbers(req.headers, req.query, (err, result) => {
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
