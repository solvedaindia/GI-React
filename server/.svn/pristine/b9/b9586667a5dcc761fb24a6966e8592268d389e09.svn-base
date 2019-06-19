const express = require('express');
const router = express.Router();
const loginHandler = require('../../handlers/loginhandler');

/* Guest User Login */
router.post('/guest', (req, res, next) => {
  loginHandler.guestLogin(req.headers, (err, result) => {
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
