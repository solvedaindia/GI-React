const express = require('express');
const router = express.Router();
const usersHandler = require('../../handlers/usershandler');

router.get('/', (req, res, next) => {
  usersHandler.getUserDetails(req.headers, (err, result) => {
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

router.put('/changepassword', (req, res, next) => {
  usersHandler.changeUserPassword(req.body, req.headers, (err, result) => {
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

router.get('/addresses', (req, res, next) => {
  usersHandler.getUserAddress(req.headers, (err, result) => {
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

router.get('/notifications', (req, res, next) => {
  usersHandler.getNotifications(req.headers, (err, result) => {
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

router.get('/giftcard', (req, res, next) => {
  usersHandler.getGiftCards(req.headers, (err, result) => {
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

router.get('/godrejcredit', (req, res, next) => {
  usersHandler.getGodrejCredit(req.headers, (err, result) => {
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

router.post('/forgotpassword', (req, res) => {
  usersHandler.forgotPassword(req.body, req.headers, (err, result) => {
    if (err) {
      res.status(err.status_code).send({
        status: 'failure',
        error: err,
      });
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
});

module.exports = router;
