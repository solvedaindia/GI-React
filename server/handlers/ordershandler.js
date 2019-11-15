const async = require('async');
const logger = require('../utils/logger.js');
const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const origin = require('../utils/origin.js');
const productUtil = require('../utils/productutil');

const profileFilter = require('../filters/profilefilter');
const productDetailFilter = require('../filters/productdetailfilter');
const cartFilter = require('../filters/cartfilter');
const orderFilter = require('../filters/orderfilter');

/**
 * Get Order List
 * @param storeId,access_token
 * @return 200,OK orderList Array
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getOrdersList = getOrdersList;
function getOrdersList(headers, query, callback) {
  const reqHeaders = headerutil.getWCSHeaders(headers);
  let pageSize = 20;
  let pageNumber = 1;
  if (query.pagesize) {
    pageSize = query.pagesize;
  }
  if (query.pagenumber) {
    pageNumber = query.pagenumber;
  }
  const orderListURL = `${constants.ordersList.replace(
    '{{storeId}}',
    headers.storeId,
  )}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  origin.getResponse(
    'GET',
    orderListURL,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        const orderResponse = {
          orderList: [],
        };
        if (response.body.Order && response.body.Order.length > 0) {
          async.map(
            response.body.Order,
            (orderItem, cb) => {
              if (
                orderItem.orderStatus === 'P' ||
                orderItem.orderStatus === 'J' ||
                orderItem.orderStatus === 'X'
              ) {
                cb(null, null);
              } else {
                const orderID = orderItem.orderId;
                if (
                  orderItem.orderStatus !== 'M' &&
                  orderItem.orderStatus !== 'C'
                ) {
                  getCompleteOrderDetails(
                    headers,
                    orderItem,
                    (error, orderDetails) => {
                      if (error) {
                        cb(error);
                        return;
                      }
                      cb(null, orderDetails);
                    },
                  );
                } else {
                  getOrderbyId(headers, orderID, (error, orderDetails) => {
                    if (error) {
                      cb(error);
                      return;
                    }
                    cb(null, orderDetails);
                  });
                }
              }
            },
            (errors, results) => {
              if (errors) {
                callback(errors);
                return;
              }
              results.forEach(result => {
                if (result) {
                  orderResponse.orderList.push(result);
                }
              });
              callback(null, orderResponse);
            },
          );
        } else {
          callback(null, orderResponse);
        }
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}

/**
 * Get Order Details by OrerID
 * @param headers,orderId
 * @return 200,Order Details
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getOrderbyId = getOrderbyId;
function getOrderbyId(headers, orderId, callback) {
  const reqHeaders = headerutil.getWCSHeaders(headers);

  let orderDetailURL = `${constants.orderDetail
    .replace('{{storeId}}', headers.storeId)
    .replace('{{orderId}}', orderId)}`;
  let reqType = 'GET';

  if (headers.profileName === 'guest') {
    reqType = 'POST';
    orderDetailURL = `${constants.guestOrderDetail
      .replace('{{storeId}}', headers.storeId)
      .replace('{{orderId}}', orderId)}`;
  }

  origin.getResponse(
    reqType,
    orderDetailURL,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        if (headers.profileName === 'guest') {
          response.body = response.body.orderDetail;
          if (response.body.errors && response.body.errors.length > 0) {
            response.status = 400;
            callback(errorutils.handleWCSError(response));
            return;
          }
        }
        let fetchOrderData = [];
        if (
          response.body.orderStatus === 'P' ||
          response.body.orderStatus === 'J' ||
          response.body.orderStatus === 'X'
        ) {
          callback(errorutils.errorlist.order_not_found);
          return;
        }
        if (
          headers.profile === 'summary' ||
          response.body.orderStatus === 'M' ||
          response.body.orderStatus === 'C'
        ) {
          fetchOrderData = [
            getOOBOrderDetails.bind(null, headers, response.body),
          ];
        } else {
          fetchOrderData = [
            getCompleteOrderDetails.bind(null, headers, response.body),
          ];
        }
        async.waterfall(fetchOrderData, (err, results) => {
          if (err) {
            callback(err);
          } else {
            logger.debug('Got all the origin resposes');
            callback(null, results);
          }
        });
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}

/**
 * Get Current Order Details
 * @param headers
 * @return 200,Order Details
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getOngoingOrders = getOngoingOrders;
function getOngoingOrders(headers, callback) {
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const ongoingOrders = `${constants.ongoingOrders.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

  origin.getResponse(
    'GET',
    ongoingOrders,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        const resJSON = {
          ongoingOrders: [],
        };
        if (response.body.OngoingOrder) {
          const orderID = response.body.OngoingOrder;

          getOMSOrderDetails(headers, orderID, (error, orderDetails) => {
            if (error) {
              callback(error);
              return;
            }
            const orderData = orderDetails;
            delete orderData.orderSummary;
            delete orderData.address;
            delete orderData.invoices;
            delete orderData.address;
            delete orderData.address;

            resJSON.ongoingOrders.push(orderData);
            callback(null, resJSON);
          });
        } else {
          callback(null, resJSON);
        }
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}

/* Get Product List for OOB Order Details */
function getOrderProductList(headers, orderItemArray, callback) {
  const productListArray = [];

  if (orderItemArray && orderItemArray.length > 0) {
    const productIDs = []; // Params to Find Product Details
    const reqParamArray = []; // Params to Find Inventory Details
    orderItemArray.forEach(item => {
      const reqParam = {
        pincode: item.zipCode,
        partNumber: item.partNumber,
        quantity: Number(item.quantity),
      };
      reqParamArray.push(reqParam);
      productIDs.push(item.productId);
    });
    productUtil.getProductListByIDs(
      headers,
      productIDs,
      (error, productList) => {
        if (error) {
          callback(error);
          return;
        }

        productList.forEach(product => {
          const productDetail = productDetailFilter.productDetailSummary(
            product,
          );
          productDetail.shipmentData = [];
          for (let index = 0; index < orderItemArray.length; index += 1) {
            if (productDetail.uniqueID === orderItemArray[index].productId) {
              productDetail.deliveryDate = '';
              if (
                orderItemArray[index].orderItemExtendAttribute &&
                orderItemArray[index].orderItemExtendAttribute.length > 0
              ) {
                orderItemArray[index].orderItemExtendAttribute.forEach(
                  attribute => {
                    if (attribute.attributeName === 'ExpectedDeliveryDate') {
                      productDetail.deliveryDate = orderFilter.getFormattedDate(
                        attribute.attributeValue,
                      );
                    }
                  },
                );
              }
              productListArray.push(productDetail);
              break;
            }
          }
        });
        callback(null, productListArray);
      },
    );
  } else {
    callback(null, productListArray);
  }
}

/* Get OOB Order Details */
function getOOBOrderDetails(headers, wcsOrderDetails, callback) {
  const orderData = wcsOrderDetails;
  const orderDetails = {
    orderID: '',
    orderStatus:
      orderFilter.getOOBOrderStatus[wcsOrderDetails.orderStatus] ||
      wcsOrderDetails.orderStatus,
    orderDate: '',
    paymentMethod: '',
    address: '',
    invoices: [],
    orderTotalItems: 0,
    orderItems: [],
    orderSummary: {},
    wcsOrderStatus: wcsOrderDetails.orderStatus,
  };
  orderDetails.orderID = orderData.orderId;
  orderDetails.orderDate = orderFilter.getFormattedDate(orderData.placedDate);
  if (orderData.paymentInstruction && orderData.paymentInstruction.length > 0) {
    orderDetails.paymentMethod =
      orderData.paymentInstruction[0].payMethodId || '';
  }

  if (orderData.orderItem && orderData.orderItem.length > 0) {
    orderDetails.address = profileFilter.userAddress(orderData.orderItem[0]);
    orderDetails.orderSummary = cartFilter.getOrderSummary(orderData);
    getOrderProductList(headers, orderData.orderItem, (error, productList) => {
      if (error) {
        callback(error);
        return;
      }

      const mergedCartData = cartFilter.mergeOrderItem(
        orderData.orderItem,
        productList,
      );
      orderDetails.orderTotalItems = mergedCartData.cartTotalItems;
      orderDetails.orderItems = mergedCartData.orderItemList;
      callback(null, orderDetails);
    });
  } else {
    callback(null, orderDetails);
  }
}

/* Get OMS  and OOB Order Details */
function getCompleteOrderDetails(headers, wcsOrderDetails, callback) {
  const orderData = wcsOrderDetails;
  const orderDetails = {
    orderID: '',
    orderStatus: '',
    orderDate: '',
    paymentMethod: '',
    address: '',
    invoices: [],
    orderTotalItems: 0,
    orderItems: [],
    orderSummary: {},
    wcsOrderStatus: wcsOrderDetails.orderStatus,
  };
  const wcsOrderID = orderData.orderId;
  getOMSOrderDetails(headers, wcsOrderID, (error, omsOrderResponse) => {
    if (error) {
      callback(error);
      return;
    }
    const omsData = omsOrderResponse;
    // orderDetails.orderID = omsData.orderID;
    orderDetails.orderID = wcsOrderID;
    orderDetails.orderSummary = cartFilter.getOrderSummary(orderData);
    orderDetails.orderDate = omsData.orderDate;
    orderDetails.paymentMethod = omsData.paymentMethod || '';
    orderDetails.address = omsData.address;
    orderDetails.orderStatus = omsData.orderStatus;
    orderDetails.invoices = omsData.invoices;
    if (omsData.orderItems && omsData.orderItems.length > 0) {
      orderDetails.orderTotalItems = omsData.orderItems.length;
      orderDetails.orderItems = omsData.orderItems;
    }
    callback(null, orderDetails);
  });
}

module.exports.getOMSOrderDetails = getOMSOrderDetails;
function getOMSOrderDetails(headers, orderID, callback) {
  const wcsOrderID = orderID;
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const orderDetails = `${constants.orderDetailOMS
    .replace('{{storeId}}', headers.storeId)
    .replace('{{orderId}}', orderID)}`;

  origin.getResponse(
    'GET',
    orderDetails,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      const resJson = {
        orderID: '',
        orderTotal: '',
        orderDate: '',
        orderStatus: '',
        paymentMethod: '',
        invoices: [],
        address: '',
        orderItems: [],
      };
      if (response.status === 200) {
        if (response.body.result.order) {
          const omsOrderDetail = response.body.result.order;
          resJson.orderID = wcsOrderID;
          resJson.orderTotal = omsOrderDetail.orderTotal;
          resJson.orderDate = orderFilter.getFormattedDate(
            omsOrderDetail.orderDate,
          );
          resJson.orderStatus = omsOrderDetail.orderStatus;
          resJson.paymentMethod = omsOrderDetail.paymentMethod || '';
          if (omsOrderDetail.invoices && omsOrderDetail.invoices.length > 0) {
            resJson.invoices = omsOrderDetail.invoices;
          }
          if (omsOrderDetail.deliveryAddress) {
            resJson.address = orderFilter.getOMSOrderAddress(
              omsOrderDetail.deliveryAddress,
            );
          }
          if (
            omsOrderDetail.orderLines &&
            omsOrderDetail.orderLines.length > 0
          ) {
            const productIds = [];
            omsOrderDetail.orderLines.forEach(orderItem => {
              if (orderItem.catentryId && orderItem.catentryId !== '') {
                productIds.push(orderItem.catentryId);
              }
            });
            productUtil.getProductListByIDs(
              headers,
              productIds,
              (err, result) => {
                if (err) {
                  callback(err);
                  return;
                }
                if (result.length > 0) {
                  omsOrderDetail.orderLines.forEach(orderItem => {
                    for (let index = 0; index < result.length; index += 1) {
                      if (orderItem.catentryId === result[index].uniqueID) {
                        const productDetail = productDetailFilter.productDetailSummary(
                          result[index],
                        );

                        delete productDetail.actualPrice;
                        delete productDetail.offerPrice;
                        delete productDetail.ribbonText;
                        delete productDetail.emiData;
                        delete productDetail.inStock;

                        productDetail.quantity = Number(orderItem.quantity);
                        productDetail.offerPrice = parseFloat(
                          orderItem.unitPrice,
                        );
                        productDetail.shipmentData = [];
                        if (
                          orderItem.shipments &&
                          orderItem.shipments.length > 0
                        ) {
                          orderItem.shipments.forEach(shipment => {
                            productDetail.shipmentData.push(
                              orderFilter.getShipmentDetails(
                                shipment,
                                productDetail,
                              ),
                            );
                          });
                        }
                        resJson.orderItems.push(productDetail);
                        break;
                      }
                    }
                  });
                }
                callback(null, resJson);
              },
            );
          } else {
            callback(null, resJson);
          }
        } else if (response.body.result.error) {
          const errorBody = {
            status_code: 400,
            error_key: 'order_failed',
            error_message: response.body.result.error.errorDescription,
          };
          // callback(errorBody);
          callback(null, resJson);
        }
      } else {
        callback(null, resJson);
        // callback(errorutils.handleWCSError(response));
      }
    },
  );
}

/**
 * Get Invoice Details
 * @param headers,invoiceNo
 * @return 200,Order Details
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getInvoiceDetails = getInvoiceDetails;
function getInvoiceDetails(headers, params, callback) {
  if (!params.invoiceNo) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const invoiceDetails = `${constants.invoiceDetails
    .replace('{{storeId}}', headers.storeId)
    .replace('{{invoiceNo}}', params.invoiceNo)}`;
  origin.getResponse(
    'GET',
    invoiceDetails,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        let invoiceData = {};
        if (response.body.response && response.body.response.InvoiceHeader) {
          const invoiceJson = response.body.response.InvoiceHeader;
          invoiceData = {
            cinNO: invoiceJson.CINNo,
            salesInvoiceNo: invoiceJson.InvoiceNo,
            invoiceDate: invoiceJson.InvoiceDate,
            salesmanCode: invoiceJson.SalesmanCode,
            invoiceTime: invoiceJson.InvoiceTime,
            currency: invoiceJson.Order.PriceInfo.Currency,
            areaCode: invoiceJson.Reference1,
            truckNo: invoiceJson.Shipment.Extn.ExtnTruckNo,
          };
          const shipNode = invoiceJson.Shipment.ShipNode;

          invoiceData.companyAddress = orderFilter.getInvoiceAddress(
            shipNode.ContactPersonInfo,
          );
          invoiceData.companyAddress.panNo = shipNode.CompanyPanID;
          invoiceData.companyAddress.gstinNo = shipNode.CompanyGSTINID;

          invoiceData.consignorAddress = orderFilter.getInvoiceAddress(
            shipNode.ShipNodePersonInfo,
          );
          invoiceData.consignorAddress.warehouseCode = `${
            invoiceJson.Shipment.ShipNode.ShipNode
          } / ${shipNode.Description}`;
          invoiceData.consignorAddress.gstinNo = shipNode.ShipNodeGSTIN;

          invoiceData.customerCode = invoiceJson.Extn.ExtnCustomerCode;
          invoiceData.customerName = invoiceJson.Extn.ExtnCustomerName;
          invoiceData.orderNo = invoiceJson.OrderNo;
          invoiceData.orderDate = invoiceJson.Order.OrderDate;

          const order = invoiceJson.Order;

          invoiceData.billTo = orderFilter.getInvoiceAddress(
            order.PaymentMethods.PaymentMethod[0].PersonInfoBillTo,
          );

          invoiceData.billTo.gstinNo = invoiceJson.Extn.ExtnCustomerGSTINID;

          invoiceData.shipTo = orderFilter.getInvoiceAddress(
            invoiceJson.Shipment.ToAddress,
          );
          invoiceData.shipTo.gstinNo = invoiceJson.Extn.ExtnCustomerGSTINID;

          const lineDetails = invoiceJson.LineDetails;
          const itemList = [];
          if (lineDetails.LineDetail && lineDetails.LineDetail.length > 0) {
            lineDetails.LineDetail.forEach(lineItem => {
              const lineItemJSON = {
                itemCode: lineItem.ItemID,
                salesOrderNo: invoiceJson.Shipment.Extn.ExtnLNOrderNo,
                hsnCode: lineItem.InvoiceLineReference,
                quantity: lineItem.Quantity,
                quantityUOM: lineItem.UnitOfMeasure,
                packageQuantity: lineItem.Extn.ExtnNoOfPackages,
                itemWeight: lineItem.Extn.ExtnItemWeight,
                weightUOM: lineItem.Extn.ExtnWeightUOM,
                itemPrice: lineItem.UnitPrice,
                priceUnit: lineItem.Extn.ExtnPriceUnit,
                taxableValue: lineItem.Extn.ExtnOrdLineTaxableVal,
              };
              if (
                invoiceJson.Shipment.ShipmentLines.ShipmentLine &&
                invoiceJson.Shipment.ShipmentLines.ShipmentLine.length > 0
              ) {
                lineItemJSON.pos =
                  invoiceJson.Shipment.ShipmentLines.ShipmentLine[0].Extn.ExtnLNLinePosition;
                lineItemJSON.seq =
                  invoiceJson.Shipment.ShipmentLines.ShipmentLine[0].Extn.ExtnLNScheduleNo;
              }
              if (lineItem.OrderLine && lineItem.OrderLine.Item) {
                lineItemJSON.itemDesc =
                  lineItem.OrderLine.Item.ItemShortDesc || '';
              }
              if (
                lineItem.LineCharges.LineCharge &&
                lineItem.LineCharges.LineCharge.length > 0
              ) {
                lineItemJSON.discountPercentage =
                  lineItem.LineCharges.LineCharge[0].Reference;
                lineItemJSON.discountAmount =
                  lineItem.LineCharges.LineCharge[0].ChargePerLine;
              }
              if (
                lineItem.LineTaxes.LineTax &&
                lineItem.LineTaxes.LineTax.length > 0
              ) {
                lineItem.LineTaxes.LineTax.forEach(tax => {
                  if (tax.TaxName === 'CGST') {
                    lineItemJSON.cgstRate = tax.TaxPercentage;
                    lineItemJSON.cgstAmount = tax.Tax;
                  }
                  if (tax.TaxName === 'SGST') {
                    lineItemJSON.sgstRate = tax.TaxPercentage;
                    lineItemJSON.sgstAmount = tax.Tax;
                  }
                  if (tax.TaxName === 'IGST') {
                    lineItemJSON.igstRate = tax.TaxPercentage;
                    lineItemJSON.igstAmount = tax.Tax;
                  }
                });
              }
              lineItemJSON.itemTotalAmount = lineItem.Extn.ExtnLineTotalAmount;
              itemList.push(lineItemJSON);
            });
          }
          const lineItemData = {
            lineItemList: itemList,
            totalPackageQuantity: invoiceJson.Extn.ExtnTotalNoOfPackages,
            totalWeight: invoiceJson.Extn.ExtnTotalWeight,
            totalDiscount: invoiceJson.Extn.ExtnTotalDiscountAmount,
            totalTaxableValue: invoiceJson.Extn.ExtnOrderTaxableVal,
            totalCGSTAmount: invoiceJson.Extn.ExtnTotalCGST,
            totalSGSTAmount: invoiceJson.Extn.ExtnTotalSGST,
            totalIGSTAmount: invoiceJson.Extn.ExtnTotalIGST,
            totalAmount: invoiceJson.Extn.ExtnOrderTotalAmount,
            netTaxableValue: invoiceJson.Extn.ExtnNetAmountTaxableValue,
            netCGSTAmount: invoiceJson.Extn.ExtnNetAmountCGST,
            netSGSTAmount: invoiceJson.Extn.ExtnNetAmountSGST,
            netIGSTAmount: invoiceJson.Extn.ExtnNetAmountIGST,
            netAmount: invoiceJson.Extn.ExtnNetAmountPayable,
            netAmountWords: invoiceJson.NetAmountPayableInWords,
          };
          invoiceData.lineItemDetails = lineItemData;
        }
        callback(null, invoiceData);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}
