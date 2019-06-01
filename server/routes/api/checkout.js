const express = require('express');
const router = express.Router();
const checkoutHandler = require('../../handlers/checkouthandler');

router.post('/saveGSTIN', (req, res, next) => {
  checkoutHandler.storeGSTINValue(req, (err, result) => {
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
