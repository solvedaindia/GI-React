const express = require('express');
const router = express.Router();
const espotsHandler = require('../../handlers/espotshandler');
const espotFilter = require('../../filters/espotfilter');
const apiCache = require('../../utils/apicache');

/* Get Espot Data */
router.get('/:espotName', (req, res, next) => {
  apiCache.getCachedResponse('espot', req, cacheRes => {
    if (cacheRes) {
      res.status(200).send(cacheRes);
    } else {
      espotsHandler.getEspotsData(
        req.headers,
        req.params.espotName,
        (err, result) => {
          if (err) {
            next(err);
            return;
          }
          const resJSON = {
            status: 'success',
            data: espotFilter.espotContent(result) || {},
          };
          apiCache.cacheResponse('espot', req, resJSON);
          res.status(200).send(resJSON);
        },
      );
    }
  });
});

/* Get Espot Data */
router.get('/:espotName', (req, res, next) => {
  espotsHandler.getEspotsData(
    req.headers,
    req.params.espotName,
    (err, result) => {
      if (err) {
        next(err);
        return;
      }
      const resJson = espotFilter.espotContent(result) || {};
      res.status(200).send({
        status: 'success',
        data: resJson,
      });
    },
  );
});

module.exports = router;
