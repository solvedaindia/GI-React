const express = require('express');
const router = express.Router();
const bankHandler = require('../../handlers/bankhandler.js');

router.get('/banklist', (req, res, next) => {
  bankHandler.bankList(req.headers, (err, result) => {
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
