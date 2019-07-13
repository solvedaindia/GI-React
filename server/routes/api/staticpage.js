const express = require('express');
const router = express.Router();
const bookConsultantHandler = require('../../handlers/staticpagehandler');

router.post('/bookconsultation', (req, res, next) => {
  bookConsultantHandler.bookConsultant(req.headers, req.body, (err, result) => {
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

router.get('/getconsultation', (req, res, next) => {
  bookConsultantHandler.getConsultant(req.headers, (err, result) => {
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
