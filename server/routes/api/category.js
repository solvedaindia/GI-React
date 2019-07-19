const express = require('express');
const router = express.Router();
const categoriesHandler = require('../../handlers/categoryhandler');
const categoryUtil = require('../../utils/categoryutil');
const testJson = require('../../configs/testjson');

/* Get Category List for Navigation */
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

/* Get Subcategory List */
router.get('/subcategories/:categoryID', (req, res, next) => {
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

/* Get Category Details */
router.get('/details/:categoryID', (req, res, next) => {
  categoryUtil.getCategoryDetails(
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
