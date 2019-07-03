const express = require('express');
const router = express.Router();
const ordersHandler = require('../../handlers/ordershandler');

router.get('/list', (req, res, next) => {
  ordersHandler.getOrdersList(req.headers, (err, result) => {
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

router.get('/details/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  ordersHandler.getOrderbyId(req.headers, id, (err, result) => {
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

router.get('/invoice/:invoiceNo', (req, res, next) => {
  ordersHandler.getInvoiceDetails(req.headers, req.params, (err, result) => {
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
