function getItemOrderDetail(OrderItem) {
  const orderItemJSON = {
    uniqueID: OrderItem.productId,
    quantity: Number(OrderItem.quantity),
    shippingCharges: parseFloat(OrderItem.shippingCharge),
    orderItemId: OrderItem.orderItemId,
    freeGift: false,
    offerPrice: parseFloat(OrderItem.unitPrice) || '',
  };
  if (OrderItem.freeGift === 'true') {
    orderItemJSON.freeGift = true;
  }
  return orderItemJSON;
}

module.exports.mergeOrderItem = mergeOrderItemandProduct;
function mergeOrderItemandProduct(orderItemList, productList) {
  const orderItemJson = {
    cartTotalQuantity: 0,
    cartTotalItems: 0,
    orderItemList: [],
  };

  orderItemJson.cartTotalItems = orderItemList.length;
  orderItemList.forEach(cartItem => {
    const itemJson = getItemOrderDetail(cartItem); // Get Order Item Details
    orderItemJson.cartTotalQuantity += itemJson.quantity;
    for (let index = 0; index < productList.length; index += 1) {
      if (itemJson.uniqueID === productList[index].uniqueID) {
        const productData = productList[index];
        /* Remove Non Required Fields from Product JSON */
        delete productData.actualPrice;
        delete productData.offerPrice;
        delete productData.ribbonText;
        delete productData.emiData;
        delete productData.inStock;
        delete productData.masterCategoryID;
        delete productData.installationRequired;

        Object.assign(itemJson, productData);
        break;
      }
    }
    orderItemJson.orderItemList.push(itemJson);
  });

  return orderItemJson;
}

/**
 * Filter Cart Data.
 * @return Cart Quantity
 */
module.exports.quantity = function getQuantity(cartData) {
  const cartQuantity = {
    cartTotalQuantity: 0,
  };
  if (cartData.orderItem && cartData.orderItem.length > 0) {
    cartData.orderItem.forEach(item => {
      cartQuantity.cartTotalQuantity += Number(item.quantity);
    });
  }
  return cartQuantity;
};

module.exports.getOrderSummary = getOrderSummary;
function getOrderSummary(cartData) {
  const orderSummary = {
    orderID: cartData.orderId,
    totalAmount: '',
    productDiscount: '',
    orderDiscount: '',
    shippingCharges:
      parseFloat(cartData.totalShippingCharge) +
      parseFloat(cartData.totalShippingTax),
    netAmount: parseFloat(cartData.grandTotal),
  };
  let merchandizingDiscount = 0;
  if (
    cartData.orderExtendAttribute &&
    cartData.orderExtendAttribute.length > 0
  ) {
    cartData.orderExtendAttribute.forEach(attribute => {
      if (
        attribute.attributeName === 'ORDERTOTAL_MRP' &&
        attribute.attributeValue !== '0.0'
      ) {
        orderSummary.totalAmount = parseFloat(attribute.attributeValue);
        merchandizingDiscount =
          parseFloat(orderSummary.totalAmount) -
          parseFloat(cartData.totalProductPrice);
      }
    });
  }
  orderSummary.productDiscount = 0;
  orderSummary.orderDiscount = 0;
  if (cartData.adjustment && cartData.adjustment.length > 0) {
    cartData.adjustment.forEach(adjustment => {
      if (adjustment.displayLevel === 'OrderItem') {
        orderSummary.productDiscount += parseFloat(Math.abs(adjustment.amount));
      }
      if (adjustment.displayLevel === 'Order') {
        orderSummary.orderDiscount += parseFloat(Math.abs(adjustment.amount));
      }
    });
  }
  orderSummary.productDiscount += merchandizingDiscount;
  orderSummary.orderDiscount = parseFloat(orderSummary.orderDiscount);
  orderSummary.productDiscount = parseFloat(orderSummary.productDiscount);

  orderSummary.saving =
    parseFloat(orderSummary.orderDiscount) +
    parseFloat(orderSummary.productDiscount);
  if (cartData.orderItem && cartData.orderItem.length > 0) {
    orderSummary.addressID = cartData.orderItem[0].addressId || '';
  } else {
    orderSummary.addressID = '';
  }
  if (cartData.paymentInstruction && cartData.paymentInstruction.length > 0) {
    orderSummary.billingAddressID =
      cartData.paymentInstruction[0].billing_address_id || '';
  }
  return orderSummary;
}
