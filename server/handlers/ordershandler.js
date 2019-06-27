const async = require('async');
const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const origin = require('../utils/origin.js');
const productUtil = require('../utils/productutil');

module.exports.getOrdersList = function getOrdersList(headers, callback) {
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const orderListURL = `${constants.ordersList.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

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
        const orderJSON = {
          orders: response.body.Order.length,
          response: response.body.Order,
        };
        callback(null, orderJSON);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

module.exports.getOrderbyId = function getOrderbyId(
  headers,
  orderId,
  callback,
) {
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const orderDetailURL = `${constants.orderDetail
    .replace('{{storeId}}', headers.storeId)
    .replace('{{orderId}}', orderId)}`;
  origin.getResponse(
    'GET',
    orderDetailURL,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      // console.log(id,"id")
      if (response.status === 200) {
        // console.log(orderId, 'orderId');
        const productIds = [];
        for (let i = 0; i < response.body.orderItem.length; i += 1) {
          // console.log('response', response.body.orderItem[i].productId);
          productIds.push(response.body.orderItem[i].productId);
        }
        // console.log(JSON.stringify(response.body.orderItem.length));
        productUtil.productByProductIDs(productIds, headers, (err, result) => {
          if (err) {
            callback(err);
            return;
          }
          response.body.allProductList = result.productList;
          callback(null, response);
        });
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

module.exports.getInvoiceDetails = function getInvoiceDetails(
  headers,
  params,
  callback,
) {
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
          invoiceData = parseInvoiceJSON(response.body.response.InvoiceHeader);
        }

        callback(null, invoiceData);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

function parseInvoiceJSON(invoiceJson) {
  const invoiceData = {
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

  invoiceData.companyAddress = getAddress(shipNode.ContactPersonInfo);
  invoiceData.companyAddress.panNo = shipNode.CompanyPanID;
  invoiceData.companyAddress.gstinNo = shipNode.CompanyGSTINID;

  invoiceData.consignorAddress = getAddress(shipNode.ShipNodePersonInfo);
  invoiceData.consignorAddress.warehouseCode = `${
    invoiceJson.Shipment.ShipNode_scattr
  } / ${shipNode.Description}`;
  invoiceData.consignorAddress.gstinNo = shipNode.ShipNodeGSTIN;

  invoiceData.customerCode = invoiceJson.Extn.ExtnCustomerCode;
  invoiceData.customerName = invoiceJson.Extn.ExtnCustomerName;
  invoiceData.orderNo = invoiceJson.OrderNo;
  invoiceData.orderDate = invoiceJson.Order.OrderDate;

  const order = invoiceJson.Order;

  invoiceData.billTo = getAddress(order.PersonInfoBillTo);
  invoiceData.billTo.gstinNo = invoiceJson.Extn.ExtnCustomerGSTINID;

  invoiceData.shipTo = getAddress(order.PersonInfoShipTo);
  invoiceData.shipTo.gstinNo = invoiceJson.Extn.ExtnCustomerGSTINID;

  const lineDetails = invoiceJson.LineDetails;
  const itemList = [];
  if (lineDetails.LineDetail && lineDetails.LineDetail.length > 0) {
    lineDetails.LineDetail.forEach(lineItem => {
      const lineItemJSON = {
        itemCode: lineItem.ItemID,
        itemDesc: lineItem.OrderLine.Item.ItemShortDesc,
        salesOrderNo: invoiceJson.Shipment.Extn.ExtnLNOrderNo,
        pos:
          invoiceJson.Shipment.ShipmentLines.ShipmentLine[0].Extn
            .ExtnLNLinePosition,
        seq:
          invoiceJson.Shipment.ShipmentLines.ShipmentLine[0].Extn
            .ExtnLNScheduleNo,
        hsnCode: lineItem.InvoiceLineReference,
        quantity: lineItem.Quantity,
        quantityUOM: lineItem.UnitOfMeasure,
        packageQuantity: lineItem.Extn.ExtnNoOfPackages,
        itemWeight: lineItem.Extn.ExtnItemWeight,
        weightUOM: lineItem.Extn.ExtnWeightUOM,
        itemPrice: lineItem.UnitPrice,
        priceUnit: lineItem.Extn.ExtnPriceUnit,
        discountPercentage: lineItem.LineCharges.LineCharge[0].Reference,
        discountAmount: lineItem.LineCharges.LineCharge[0].ChargePerLine,
        taxableValue: lineItem.Extn.ExtnOrdLineTaxableVal,
      };

      if (lineItem.LineTaxes.LineTax && lineItem.LineTaxes.LineTax.length > 0) {
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
  // invoiceData.originalResponse = invoiceJson;
  return invoiceData;
}

function getAddress(address) {
  const addressJSON = {};
  addressJSON.name = address.FirstName;
  if (address.LastName) {
    addressJSON.name += ` ${address.LastName}`;
  }
  addressJSON.address = address.AddressLine1;
  if (address.AddressLine2) {
    addressJSON.address += ` ${address.AddressLine2}`;
  }
  if (address.AddressLine3) {
    addressJSON.address += ` ${address.AddressLine3}`;
  }
  if (address.AddressLine4) {
    addressJSON.address += ` ${address.AddressLine4}`;
  }
  if (address.AddressLine5) {
    addressJSON.address += ` ${address.AddressLine5}`;
  }
  if (address.AddressLine6) {
    addressJSON.address += ` ${address.AddressLine6}`;
  }
  addressJSON.companyName = address.Company || '';
  addressJSON.city = address.City || '';
  addressJSON.state = address.State || '';
  addressJSON.stateCode = address.StateCode || '';
  addressJSON.country = address.Country || '';
  addressJSON.zipCode = address.ZipCode || '';
  addressJSON.contactNo = address.MobilePhone || '';
  addressJSON.addressID = address.AddressID || '';
  return addressJSON;
}
