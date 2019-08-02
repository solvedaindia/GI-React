const express = require('express');
const router = express.Router();
const usersHandler = require('../../handlers/usershandler');

/* Get User Details */
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

/* Vaidate User Details */
router.post('/validate', (req, res, next) => {
  usersHandler.validateUserDetails(req.body, req.headers, (err, result) => {
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

/* Update User Details */
router.post('/update', (req, res, next) => {
  usersHandler.updateUserDetails(req.body, req.headers, (err, result) => {
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

/* Change Password */
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

/* Get Address List */
router.get('/address/list', (req, res, next) => {
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

/* Delete Address List */
router.post('/address/delete/:nickname', (req, res, next) => {
  usersHandler.deleteAddress(req, (err, result) => {
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

/* Add Address */
router.post('/address/add', (req, res, next) => {
  usersHandler.createAddress(req.headers, req.body, (err, result) => {
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

/* Update Address */
router.post('/address/update/:nickname', (req, res, next) => {
  usersHandler.updateAddress(req, (err, result) => {
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

/* router.get('/notifications', (req, res, next) => {
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
}); */

/* router.get('/giftcard', (req, res, next) => {
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
}); */

/* router.get('/godrejcredit', (req, res, next) => {
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
}); */

/** Reset Password in case of you forget your old password */
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

/* Set Password For Social Logged in User */
router.post('/sociallogin/setpassword', (req, res, next) => {
  usersHandler.setSocialPassword(req.body, req.headers, (err, result) => {
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
