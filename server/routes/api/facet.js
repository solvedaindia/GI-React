const express = require('express');
const router = express.Router();
const plphandler = require('../../handlers/plphandler');

/* To Get Facet List for PLP */
router.get('/bycategory/:categoryId', (req, res, next) => {
  plphandler.getPLPFacetList(req, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    const resJSON = {
      status: 'success',
      data: result,
    };
    res.status(200).send(resJSON);
  });
});

/* To Get Facet List for PLP */
router.get('/bysearchterm/:searchterm', (req, res, next) => {
  plphandler.getSearchFacetList(req, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    const resJSON = {
      status: 'success',
      data: result,
    };
    res.status(200).send(resJSON);
  });
});

module.exports = router;
