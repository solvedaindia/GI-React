const express = require('express');
const router = express.Router();
const categoriesHandler = require('../../handlers/categoryhandler');
const categoryUtil = require('../../utils/categoryutil');

router.get('/breadcrumb', async (req, res, next) => {
  categoriesHandler.getBreadcrumb(req, (err, result) => {
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
router.get('/details/:categoryID', async (req, res, next) => {
  try {
    const result = await categoryUtil.getCategoryDetails2(
      req.headers,
      req.params.categoryID,
    );
    res.status(200).send({
      status: 'success',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

/* Get Category Details by Identifier */
router.get('/details/byidentifier/:catIdentifier', async (req, res, next) => {
  try {
    const result = await categoryUtil.getCategoryDetailsByIdentifier(
      req.headers,
      req.params.catIdentifier,
    );
    res.status(200).send({
      status: 'success',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
