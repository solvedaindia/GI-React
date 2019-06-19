function getItemOrderDetail(OrderItem) {
  const orderItemJSON = {
    uniqueID: OrderItem.productId,
    quantity: Number(OrderItem.quantity),
    shippingCharges: parseFloat(OrderItem.shippingCharge),
    orderItemId: OrderItem.orderItemId,
    freeGift: false,
    // actualPrice: parseFloat(OrderItem.xitem_field2) || '',
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
        Object.assign(itemJson, productData);
        break;
      }
    }
    /*  if (itemJson.freeGift === true) {
        delete itemJson.actualPrice;
        delete itemJson.offerPrice;
        delete itemJson.discount;
        delete itemJson.promotionData;
      } */
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
    totalAmount: parseFloat(cartData.totalProductPrice),
    productDiscount: '',
    orderDiscount: '',
    shippingCharges:
      parseFloat(cartData.totalShippingCharge) +
      parseFloat(cartData.totalShippingTax),
    netAmount: parseFloat(cartData.grandTotal),
  };

  if (cartData.adjustment && cartData.adjustment.length > 0) {
    cartData.adjustment.forEach(adjustment => {
      if (adjustment.displayLevel === 'OrderItem') {
        orderSummary.productDiscount = Math.abs(adjustment.amount);
      }
      if (adjustment.displayLevel === 'Order') {
        orderSummary.orderDiscount = Math.abs(adjustment.amount);
      }
    });
  }
  orderSummary.saving =
    orderSummary.orderDiscount + orderSummary.productDiscount;
  return orderSummary;
}
