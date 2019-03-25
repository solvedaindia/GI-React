const express = require('express');
const router = express.Router();
const wishlistHandler = require('../../handlers/wishlisthandler');

router.get('/page', (req, res, next) => {
  wishlistHandler.fetchWishlist(req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send(resultJson(result));
  });
});

router.get('/itemlist', (req, res, next) => {
  wishlistHandler.wishlistItemList(req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send(resultJson(result));
  });
});

router.get('/itemcount', (req, res, next) => {
  wishlistHandler.wishlistItemCount(req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send(resultJson(result));
  });
});

router.get('/listnames', (req, res, next) => {
  wishlistHandler.fetchlistnames(req.headers, (err, result) => {
    if (err) {
      res.send(errorJson(err));
      return;
    }
    res.status(200).send(resultJson(result));
  });
});

router.post('/create', (req, res, next) => {
  wishlistHandler.createlist(req.headers, req.body, (err, result) => {
    if (err) {
      res.send(errorJson(err));
      return;
    }
    res.status(200).send(resultJson(result));
  });
});

router.post('/rename', (req, res, next) => {
  wishlistHandler.rename(req.headers, req.body, (err, result) => {
    if (err) {
      res.send(errorJson(err));
      return;
    }
    res.status(200).send(resultJson(result));
  });
});

router.post('/create_add', (req, res, next) => {
  wishlistHandler.createAndAdd(req.headers, req.body, (err, result) => {
    if (err) {
      res.send(errorJson(err));
      return;
    }
    res.status(200).send(resultJson(result));
  });
});

router.post('/additem', (req, res, next) => {
  wishlistHandler.addItem(req.headers, req.body, (err, result) => {
    if (err) {
      res.send(errorJson(err));
      return;
    }
    res.status(200).send(resultJson(result));
  });
});

router.post('/deletelist', (req, res, next) => {
  wishlistHandler.deletelist(req.headers, req.body, (err, result) => {
    if (err) {
      res.send(errorJson(err));
      return;
    }
    res.status(200).send(resultJson(result));
  });
});

router.post('/deleteitem', (req, res, next) => {
  wishlistHandler.deleteitem(req.headers, req.body, (err, result) => {
    if (err) {
      res.send(errorJson(err));
      return;
    }
    res.status(200).send(resultJson(result));
  });
});

function resultJson(result) {
  return {
    status: 'success',
    data: result,
  };
}

function errorJson(err) {
  return {
    status: 'failure',
    error: err,
  };
}

module.exports = router;
