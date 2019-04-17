const express = require('express');
const router = express.Router();
const logoutHandler = require('../../handlers/logouthandler');

router.post('/', (req, res, next) => {
  logoutHandler.logout(req.headers, (err, result) => {
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
