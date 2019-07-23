const express = require('express');
const router = express.Router();
const wishlistHandler = require('../../handlers/wishlisthandler');

/* Fetches Wishlist Complete Data */
router.get('/page', (req, res, next) => {
  wishlistHandler.fetchWishlist(req.headers, (err, result) => {
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

/* router.get('/itemlist', (req, res, next) => {
  wishlistHandler.wishlistItemList(req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
}); */

/* Fetches Wishlist Item Count */
router.get('/itemcount', (req, res, next) => {
  wishlistHandler.wishlistItemCount(req.headers, (err, result) => {
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

/* router.get('/listnames', (req, res, next) => {
  wishlistHandler.fetchlistnames(req.headers, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
}); */

/* router.post('/create', (req, res, next) => {
  wishlistHandler.createlist(req.headers, req.body, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
}); */

/* router.post('/rename', (req, res, next) => {
  wishlistHandler.rename(req.headers, req.body, (err, result) => {
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
 */
/* router.post('/create_add', (req, res, next) => {
  wishlistHandler.createAndAdd(req.headers, req.body, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
}); */

/* router.post('/additem', (req, res, next) => {
  wishlistHandler.addItem(req.headers, req.body, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
}); */

/* Add Item to Wishlist */
router.post('/additem', (req, res, next) => {
  wishlistHandler.addItemInWishlist(req.headers, req.body, (err, result) => {
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

/* router.post('/deletelist', (req, res, next) => {
  wishlistHandler.deletelist(req.headers, req.body, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send({
      status: 'success',
      data: result,
    });
  });
}); */

/* Deletes Item from Wishlist */
router.post('/deleteitem', (req, res, next) => {
  wishlistHandler.deleteitem(req.headers, req.body, (err, result) => {
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

/* router.post('/share/:externalId', (req, res, next) => {
  wishlistHandler.shareWishlist(
    req.headers,
    req.body,
    req.params,
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
}); */

/* Fetches Wishlist Data for External User */
router.get('/externalpage/:externalId', (req, res, next) => {
  wishlistHandler.getExternalWishlist(
    req.headers,
    req.params,
    req.query,
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

module.exports = router;
