const stateCode = require('../configs/statecode');

module.exports.getOOBOrderStatus = {
  C: 'Created',
  M: 'Created',
  F: 'Created',
  P: 'Pending',
  X: 'Cancelled',
};

module.exports.getInvoiceAddress = getInvoiceAddress;
function getInvoiceAddress(address) {
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
  addressJSON.state = stateCode.getStateName[address.State] || address.State || '';
  addressJSON.stateCode = address.StateCode || '';
  addressJSON.country = address.Country || '';
  addressJSON.zipCode = address.ZipCode || '';
  addressJSON.contactNo = address.MobilePhone || '';
  addressJSON.addressID = address.AddressID || '';
  return addressJSON;
}

module.exports.getOMSOrderAddress = getOMSOrderAddress;
function getOMSOrderAddress(address) {
  const addressJSON = {};
  addressJSON.name = address.firstName;
  if (address.LastName) {
    addressJSON.name += ` ${address.lastName}`;
  }
  addressJSON.address = address.addressLine1;
  if (address.addressLine2) {
    addressJSON.address += `, ${address.addressLine2}`;
  }
  if (address.AddressLine3) {
    addressJSON.address += `, ${address.addressLine3}`;
  }
  if (address.AddressLine4) {
    addressJSON.address += `, ${address.addressLine4}`;
  }
  if (address.AddressLine5) {
    addressJSON.address += `, ${address.addressLine5}`;
  }
  if (address.AddressLine6) {
    addressJSON.address += `, ${address.addressLine6}`;
  }
  addressJSON.companyName = address.company || '';
  addressJSON.city = address.city || '';
  addressJSON.state =
    stateCode.getStateName[address.state] || address.state || '';
  addressJSON.country =
    stateCode.getCountryName[address.country] || address.country || '';
  addressJSON.pincode = address.zipCode || '';
  addressJSON.phoneNumber = address.mobilePhone || '';
  addressJSON.addressID = address.addressID || '';
  return addressJSON;
}

module.exports.getShipmentDetails = getShipmentDetails;
function getShipmentDetails(shipment) {
  const shipmentDetails = {
    status: shipment.status,
    quantity: shipment.shipQty,
    shipmentNo : shipment.shipmentNo,
    shipmentKey: shipment.shipmentKey,
    createdDate: getFormattedDate(shipment.createdDate),
    expectedShipmentDate: getFormattedDate(shipment.expectedShipmentDate),
    shippedDate: getFormattedDate(shipment.shippedDate),
    packedDate: getFormattedDate(shipment.packedDate),
    expectedDeliveryDate: getFormattedDate(shipment.expectedDeliveryDate),
    deliveryDate: getFormattedDate(shipment.deliveryDate),
    installationReqDate: getFormattedDate(shipment.extnInstallationReqDate),
    techAssignDate: getFormattedDate(shipment.extnTechnicianAssignedDate),
    serviceRequestNo: shipment.extnServiceRequestNo,
    expectedInstallationDate: getFormattedDate(
      shipment.extnTechnicianAssignedDate,
    ),
    installationInProgressDate: getFormattedDate(
      shipment.extnInstallationInProgressDate,
    ),
    installationCompleteDate: getFormattedDate(
      shipment.extnInstallationCompleteDate,
    ),
    installationDate: getFormattedDate(shipment.installationDate),
    invoiceNo: shipment.extnInvoiceNo,
    statusLine: shipment.statusLine,
    shipNode : shipment.shipNode,
    returnShipmentLineFlag: shipment.returnShipmentLineFlag,
    returnRefundSummary : shipment.returnRefundSummary,
    returnMessage: shipment.returnMessage,
    returnButtonDisplay: shipment.returnButtonDisplay,
    isReturnShipment : shipment.isReturnShipment,
    returnButtonText : shipment.returnButtonText,
  };
  return shipmentDetails;
}

module.exports.getFormattedDate = getFormattedDate;
function getFormattedDate(inputDate) {
  let formattedDate = '';
  if (inputDate) {
    const newDate = new Date(inputDate);
    const date = newDate.getDate();
    const month = monthNames[newDate.getMonth()];
    const year = newDate.getFullYear();
    const day = dayNames[newDate.getDay()];
    formattedDate = `${day}, ${date} ${month} ${year}`;
  }
  return formattedDate;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
