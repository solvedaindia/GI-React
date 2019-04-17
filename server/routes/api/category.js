const express = require('express');
const router = express.Router();
const categoriesHandler = require('../../handlers/categoryhandler');
const testJson = require('../../configs/testjson');

router.get('/:keyword', (req, res, next) => {
  categoriesHandler.getCategories(
    req.params.keyword,
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

router.get('/subcategories/:categoryID', (req, res, next) => {
  /* res.status(200).send({
    status: 'success',
    data: testJson.subcategories,
  }); */
  categoriesHandler.getSubCategories(req, (err, result) => {
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

router.get('/details/:categoryID', (req, res, next) => {
  categoriesHandler.getCategoryDetails(
    req.headers,
    req.params.categoryID,
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
