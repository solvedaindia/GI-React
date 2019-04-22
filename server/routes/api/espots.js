const express = require('express');
const router = express.Router();
const espotsHandler = require('../../handlers/espotshandler');
const filter = require('../../filters/filter');

router.get('/:espotName', (req, res, next) => {
  espotsHandler.getEspotsData(
    req.headers,
    req.params.espotName,
    (err, result) => {
      if (err) {
        next(err);
        return;
      }
      const resJson = filter.filterData('espotcontent', result) || {};
      res.status(200).send({
        status: 'success',
        data: resJson,
      });
    },
  );
});

module.exports = router;
