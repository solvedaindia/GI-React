const express = require('express');
const router = express.Router();
const clpHandler = require('../../handlers/clphandler');

router.post('/', (req, res, next) => {
  clpHandler.getClpData(req, (err, result) => {
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
