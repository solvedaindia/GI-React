/**
 * Merge Cart Data and Produc List
 * @return Mini Cart JSON Data
 */
module.exports.minicart = function getMinicart(cartData, productList) {
  const minicartJson = {
    cartTotalQuantity: 0,
    cartTotalItems: 0,
    miniCartData: [],
  };

  if (
    cartData.orderItem &&
    cartData.orderItem.length > 0 &&
    productList.length > 0
  ) {
    minicartJson.cartTotalItems = cartData.orderItem.length;

    cartData.orderItem.forEach(cartItem => {
      const itemJson = getItemOrderDetail(cartItem); // Get Order Item Details
      minicartJson.cartTotalQuantity += itemJson.quantity;

      /* Remove Non Required Fields from JSON */
      delete itemJson.ribbonText;
      delete itemJson.emiData;
      delete itemJson.inStock;

      for (let index = 0; index < productList.length; index += 1) {
        if (itemJson.uniqueID === productList[index].uniqueID) {
          Object.assign(itemJson, productList[index]);
          break;
        }
      }
      minicartJson.miniCartData.push(itemJson);
    });
  }

  return minicartJson;
};

function getItemOrderDetail(OrderItem) {
  const orderItemJSON = {
    uniqueID: OrderItem.productId,
    quantity: Number(OrderItem.quantity),
    shippingCharges: parseFloat(OrderItem.shippingCharge),
    orderItemId: OrderItem.orderItemId,
    freeGift: false,
    // unitPrice: OrderItem.unitPrice,
    // orderItemPrice: OrderItem.orderItemPrice,
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
        Object.assign(itemJson, productList[index]);
        break;
      }
    }

    /* Remove Non Required Fields from Product JSON */
    delete itemJson.ribbonText;
    delete itemJson.emiData;
    delete itemJson.inStock;
    // delete itemJson.inventoryDetails;
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

/**
 * Filter Cart Data.
 * @return Cart JSON Data
 */
module.exports.getCartData = function cart(cartData, productList) {
  const cartDetails = {
    orderSummary: {
      orderID: cartData.orderId,
      totalProductPrice: parseFloat(cartData.totalProductPrice),
      totalShippingCharge: parseFloat(cartData.totalShippingCharge),
      totalShippingTax: parseFloat(cartData.totalShippingTax),
      productDiscount: 0,
      orderDiscount: 0,
      totalDiscount: Math.abs(cartData.totalAdjustment),
      totalSalesTax: parseFloat(cartData.totalSalesTax),
      grandTotal: parseFloat(cartData.grandTotal),
    },
    cartTotalItems: cartData.orderItem.length,
    cartItems: mergeOrderItemandProduct(cartData.orderItem, productList)
      .orderItemList,
    actualCartData: cartData,
  };
  if (cartData.adjustment && cartData.adjustment.length > 0) {
    cartData.adjustment.forEach(adjustment => {
      if (adjustment.displayLevel === 'OrderItem') {
        cartDetails.orderSummary.productDiscount = Math.abs(adjustment.amount);
      }
      if (adjustment.displayLevel === 'Order') {
        cartDetails.orderSummary.orderDiscount = Math.abs(adjustment.amount);
      }
    });
  }

  const cartJSON = {
    cartDetails: cartData,
    cartItemDetails: productList,
  };

  return cartDetails;
};
