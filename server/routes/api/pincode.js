const express = require('express');
const router = express.Router();
const pincodeUtils = require('../../utils/pincodeutil');

router.get('/city/:pincode', (req, res, next) => {
  pincodeUtils.getCityAndState(
    req.params.pincode,
    req.headers,
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

module.exports = router;
