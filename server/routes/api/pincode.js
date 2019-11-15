const express = require('express');
const router = express.Router();
const pincodeUtils = require('../../utils/pincodeutil');
const pdpHandler = require('../../handlers/pdphandler');

/* Get City and State Details */
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

/* Set Pincode in Self Address */
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

/* Get Pincode Serviceability */
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

/* Get Inventory Details */
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

router.get('/multiplefindinventory/:pincode', (req, res, next) => {
  req.query.pincode = req.params.pincode;
  pdpHandler.getMultipleFindInventory(req.headers, req.query, (err, result) => {
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
