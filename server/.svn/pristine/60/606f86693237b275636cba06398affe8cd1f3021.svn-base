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

router.post('/updatedefault/:pincode', (req, res, next) => {
  pincodeUtils.setDefaultPincode(
    req.headers,
    req.params.pincode,
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

router.get('/serviceable/:pincode', (req, res, next) => {
  pincodeUtils.getPincodeServiceability(
    req.headers,
    req.params.pincode,
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

router.get('/findinventory/:pincode', (req, res, next) => {
  req.query.pincode = req.params.pincode;
  pincodeUtils.findInventory(req.headers, req.query, (err, result) => {
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
