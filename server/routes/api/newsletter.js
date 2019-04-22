const express = require('express');
const router = express.Router();
const newsletterHandler = require('../../handlers/newsletterhandler');

router.post('/subscribe', (req, res, next) => {
  newsletterHandler.newsLetterSubscription(
    req.body,
    req.headers,
    (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.status(200).send({
        status: 'success',
        data: result,
      });
    },
  );
});

router.get('/status', (req, res, next) => {
  newsletterHandler.getSubscriptionStatus(req.headers, (err, result) => {
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
