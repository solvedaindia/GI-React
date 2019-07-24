const express = require('express');
const router = express.Router();
const paymentHandler = require('../../handlers/paymenthandler.js')
const urlConfig = require('../../utils/paymentURLutil');

router.post('/initiateBDPayment', (req, res, next) => {
    urlConfig.url = req.headers.origin;
    console.log(urlConfig, "this is url config");
    paymentHandler.initiateBDPayment(req.body, req.headers, (err, result) => {
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

router.post('/verifyBDPayment', (req, res, next) => {
    paymentHandler.verifyBDPayment(req.body, req.headers, (err, result) => {
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

router.post('/checkout', (req, res, next) => {
    paymentHandler.confirmCheckout(req.body, req.headers, (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.status(200).send({
            status: 'success',
            data: result,
        });
    })
})

module.exports = router;