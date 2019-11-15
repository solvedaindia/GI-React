const express = require('express');
const router = express.Router();
const clpHandler = require('../../handlers/clphandler');

/* Get CLP Themes Data */
router.get('/themes/:espotName', (req, res, next) => {
  clpHandler.getInspirationThemes(req.headers, req.params, (err, result) => {
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
