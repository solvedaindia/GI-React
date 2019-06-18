const express = require('express');
const router = express.Router();
const comparehandler = require('../../handlers/comparehandler');
// const productDetail = require('../../configs/pdpjson');

router.get('/products', (req, res, next) => {
    comparehandler.getCompareData(req, (err, result) => {
        if (err) {
            console.log(err, "this is compare error");
            next(err);
            return;
        } else {
            console.log(data, "this is response data")
            res.status(200).send({
                status: 'success',
                data: result,
            });
        }
    });
});

// router.get('/productData', (req, res) => {
//   res.status(200).send({
//     status: 'success',
//     data: productDetail,
//   });
// });

module.exports = router;