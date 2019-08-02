const express = require('express');
const router = express.Router();
const usersHandler = require('../../handlers/usershandler');

/* User Registration */
router.post('/', (req, res, next) => {
  usersHandler.registerUser(req.body, req.headers, (err, result) => {
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
