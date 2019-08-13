const express = require('express');
const router = express.Router();
const comparehandler = require('../../handlers/comparehandler');

router.get('/products', (req, res, next) => {
  comparehandler.getCompareData(req, (err, result) => {
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
