const express = require('express');
const router = express.Router();
const searchHandler = require('../../handlers/searchhandler');

/* Fetches Suggested Keywords */
router.get('/autosuggest/:byterm', (req, res, next) => {
  searchHandler.getAutoSuggestResult(req, (err, result) => {
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
