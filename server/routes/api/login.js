const express = require('express');
const router = express.Router();
const loginHandler = require('../../handlers/loginhandler');

/* Registered User Login */
router.post('/user', (req, res, next) => {
  loginHandler.userLogin(req.body, req.headers, (err, result) => {
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

/* Social Login */
router.post('/sociallogin', (req, res, next) => {
  loginHandler.socialLogin(req.body, req.headers, (err, result) => {
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
