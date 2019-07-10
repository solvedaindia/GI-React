const express = require('express');
const router = express.Router();
const footerhandler = require('../../handlers/footerhandler');

/* Footer Data */
router.get('/', (req, res, next) => {
  footerhandler.getFooterData(req.headers, (err, result) => {
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
