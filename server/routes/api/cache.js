const express = require('express');
const router = express.Router();
const apiCache = require('../../utils/apicache.js');

router.post('/clear', (req, res, next) => {
  apiCache.clearCache(resMsg => {
    res.send(resMsg);
  });
});

/**
 * Get Cached Keys
 */
router.get('/keys', (req, res, next) => {
  apiCache.getKeys(req, response => {
    res.send(response);
  });
});

/**
 * Get Cached Keys
 */
router.post('/deletekey', (req, res, next) => {
  apiCache.deletekey(req.body.keys, response => {
    res.send(response);
  });
});
module.exports = router;
