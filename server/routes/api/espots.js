const express = require('express');
const router = express.Router();
const espotsHandler = require('../../handlers/espotshandler');
const espotFilter = require('../../filters/espotfilter');

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
