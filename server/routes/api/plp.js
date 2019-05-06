const express = require('express');
const router = express.Router();
const plphandler = require('../../handlers/plphandler');
const testjson = require('../../configs/testjson');

/* To Get Product List By Category ID for PLP */
router.get('/bycategory/:categoryId', (req, res, next) => {
  plphandler.getProductsByCategory(req, (err, result) => {
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

/* To Get Product List By Serach Term for PLP */
router.get('/bysearchterm/:searchterm', (req, res, next) => {
  plphandler.getProductsBySearchTerm(req, (err, result) => {
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

/* To Get Static Product List Data */
router.get('/productlist', (req, res, next) => {
  res.status(200).send({
    status: 'success',
    data: testjson.plp,
  });
});

module.exports = router;
