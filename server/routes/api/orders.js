const express = require('express');
const router = express.Router();
const ordersHandler = require('../../handlers/ordershandler');

router.get('/', (req, res, next) => {
  ordersHandler.getOrdersList(req.query, req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result
    });
  });
});

module.exports = router;
