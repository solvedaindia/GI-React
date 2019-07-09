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
  addressJSON.state = address.State || '';
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
  addressJSON.state = address.state || '';
  addressJSON.country = address.country || '';
  addressJSON.pincode = address.ZipCode || '';
  addressJSON.phoneNumber = address.mobilePhone || '';
  addressJSON.addressID = address.addressID || '';
  return addressJSON;
}
