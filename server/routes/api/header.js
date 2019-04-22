const express = require('express');
const router = express.Router();
const headerhandler = require('../../handlers/headerhandler');

/* Header Static Data */
router.get('/', (req, res, next) => {
  headerhandler.getHeaderData(req.headers, (err, result) => {
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
