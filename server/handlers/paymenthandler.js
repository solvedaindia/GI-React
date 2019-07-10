const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const origin = require('../utils/origin.js');
const checkout = require('../handlers/carthandler');
const logger = require('../utils/logger.js');

module.exports.initiateBDPayment = function initiateBDPayment(
    params,
    headers,
    callback,
) {
    if (!params.orderId ||
        (!params.email && !params.mobile) ||
        !params.payMethodId ||
        !params.amount ||
        !params.callbackUrl ||
        !params.paymentMode ||
        !params.billing_address_id
    ) {
        logger.debug('Registered User Login:::Invalid Params');
        callback(errorutils.errorlist.invalid_params);
        return;
    }

    if (
        params.paymentMode === 'NET_BANKING' ||
        params.paymentMode === 'PAYTM' ||
        // params.paymentMode === 'UPI' ||
        params.paymentMode === 'PHONEPE'
    ) {
        if (!params.BankID) {
            logger.debug('Initiate Payment:::Invalid Params');
            callback(errorutils.errorlist.invalid_params);
            return;
        }
    }
    const initiateBDPaymentBody = {
        orderId: params.orderId,
        email: params.email,
        payMethodId: params.payMethodId,
        amount: params.amount,
        mobile: params.mobile,
        callbackUrl: params.callbackUrl,
        BankID: params.BankID,
        paymentMode: params.paymentMode,
        billing_address_id: params.billing_address_id,
    };
    const reqHeaders = headerutil.getWCSHeaders(headers);

    const initiateBDPaymentURL = `${constants.initiateBDPayment.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;
    // ?orderId=${query.orderId}&email=${query.email}&payMethodId=${query.payMethodId}&amount=${query.amount}&mobile=${query.mobile}&callbackUrl=${query.callbackUrl}&BankID=${query.BankID}&paymentMode=${query.paymentMode}`;

    origin.getResponse(
        'POST',
        initiateBDPaymentURL,
        reqHeaders,
        null,
        initiateBDPaymentBody,
        null,
        '',
        response => {
            if (response.status === 200) {
                // const customInfoData =
                //   'GODREJUAT|50334070111|U1230001002269|1|00000001.00|123|NA|01|INR|DIRECT|NA|NA|.00|27-06-2019 12:32:08|0300|NA|NA|NA|NA|NA|NA|NA|NA|NA|NA|64299DD1CC760969D4EB467B1EAE2D8CC6B7897B24B82FE4CF22EB2C9C7EE3FF';
                // const reqBody = {
                //   orderId: response.body.orderId,
                //   email: response.body.email,
                //   payMethodId: response.body.payMethodId,
                //   amount: response.body.amount,
                //   customInfo: customInfoData,
                //   billing_address_id: response.body.billing_address_id,
                // };

                // this.verifyBDPayment(reqBody, headers, (err, result) => {
                //   if (err) {
                //     callback(err);
                //   } else {
                //     callback(null, result);
                //   }
                // });
                callback(null, response.body);
            } else {
                callback(errorutils.handleWCSError(response));
            }
        },
    );
};

module.exports.verifyBDPayment = function verifyBDPayment(
    params,
    headers,
    callback,
) {
    if (!params.orderId ||
        !params.payMethodId ||
        !params.amount ||
        !params.customInfo ||
        !params.billing_address_id
    ) {
        logger.debug('Verify Payment:::Invalid Params');
        callback(errorutils.errorlist.invalid_params);
        return;
    }
    const reqHeaders = headerutil.getWCSHeaders(headers);

    const verifyBDPaymentURL = `${constants.verifyBDPayment.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

    const verifyBDPaymentBody = {
        orderId: params.orderId,
        email: params.email,
        payMethodId: params.payMethodId,
        amount: params.amount,
        customInfo: params.customInfo,
        billing_address_id: params.billing_address_id,
    };

    origin.getResponse(
        'POST',
        verifyBDPaymentURL,
        reqHeaders,
        null,
        verifyBDPaymentBody,
        null,
        '',
        response => {
            if (response.status === 200) {
                const resBody = {
                    paymentStatus: '',
                    orderPlaced: '',
                };
                if (response.body.response.paymentStatus === 'success') {
                    const orderIdObj = {
                        orderId: response.body.orderId,
                    };
                    checkout.checkout(headers, orderIdObj, (err, result) => {
                        if (err) {
                            resBody.paymentStatus = response.body.response.paymentStatus;
                            resBody.orderPlaced = false;
                            resBody.checkoutError = err;
                            callback(null, resBody);
                            return;
                        }
                        resBody.paymentStatus = response.body.response.paymentStatus;
                        resBody.orderPlaced = true;
                        resBody.orderID = result.orderID;
                        callback(null, resBody);
                    });
                } else {
                    resBody.paymentStatus = response.body.response.paymentStatus;
                    resBody.orderPlaced = false;
                    callback(null, resBody);
                }
                // callback(null, response);
            } else {
                callback(errorutils.handleWCSError(response));
            }
        },
    );
};


module.exports.verifyChecksum = function verifyChecksum(
    params,
    headers,
    callback,
) {
    console.log(params, "these are params in vefiy checksum")
    if (!params.payMethodId ||
        !params.customInfo
    ) {
        logger.debug('Verify Payment:::Invalid Params');
        callback(errorutils.errorlist.invalid_params);
        return;
    }
    // const reqHeaders = headerutil.getWCSHeaders(headers);

    const verifyBDPaymentURL = `${constants.verifyBDPayment.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

    const verifyBDPaymentBody = {
        payMethodId: params.payMethodId,
        customInfo: params.customInfo,
    };

    origin.getResponse(
        'POST',
        verifyBDPaymentURL,
        null,
        null,
        verifyBDPaymentBody,
        null,
        '',
        response => {
            if (response.status === 200) {
                const resBody = {
                    paymentStatus: '',
                    orderPlaced: '',
                };
                if (response.body.response.paymentStatus === 'success') {
                    // const orderIdObj = {
                    //   orderId: response.body.orderId,
                    // };
                    // checkout.checkout(headers, orderIdObj, (err, result) => {
                    //   if (err) {
                    //     resBody.paymentStatus = response.body.response.paymentStatus;
                    //     resBody.orderPlaced = false;
                    //     resBody.checkoutError = err;
                    //     callback(null, resBody);
                    //     return;
                    //   }
                    //   resBody.paymentStatus = response.body.response.paymentStatus;
                    //   resBody.orderPlaced = true;
                    //   resBody.orderID = result.orderID;
                    //   callback(null, resBody);
                    // });
                    resBody.paymentStatus = response.body.response.paymentStatus;
                    resBody.orderPlaced = true;
                    resBody.orderID = response.body.orderId;
                    callback(null, resBody);
                } else {
                    resBody.paymentStatus = response.body.response.paymentStatus;
                    resBody.orderPlaced = false;
                    callback(null, resBody);
                }
                // callback(null, response);
            } else {
                callback(errorutils.handleWCSError(response));
            }
        },
    );
};


module.exports.confirmCheckout = function confirmCheckout(params, headers, callback) {
    const orderIdObj = {
        orderId: params.orderId
    }
    console.log(orderIdObj, "this is order id object --------------")
    var resBody = {};
    checkout.checkout(headers, orderIdObj, (err, result) => {
        if (err) {
            resBody.orderPlaced = false;
            resBody.checkoutError = err;
            callback(null, resBody);
            return;
        }
        resBody.orderPlaced = true;
        callback(null, resBody);
    });
}