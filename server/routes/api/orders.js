const express = require('express');
const router = express.Router();
const ordersHandler = require('../../handlers/ordershandler');

router.get('/list', (req, res, next) => {
  ordersHandler.getOrdersList(req.headers, req.query, (err, result) => {
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

router.get('/guestdetails/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  req.headers.profileName = 'guest';
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

router.get('/current', (req, res, next) => {
  ordersHandler.getOngoingOrders(req.headers, (err, result) => {
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

router.get('/servicerequestform', (req, res, next) => {
  ordersHandler.getServiceRequestDetails(req, (err, result) => {
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

router.post('/cancel', (req, res, next) => {
  ordersHandler.cancelOrder(req, (err, result) => {
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

router.post('/return', (req, res, next) => {
  ordersHandler.returnOrder(req, (err, result) => {
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

router.post('/servicerequest', (req, res, next) => {
  ordersHandler.createServiceRequest(req, (err, result) => {
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
