/**
 * Merge Cart Data and Produc List
 * @return Mini Cart JSON Data
 */
module.exports.minicart = function getMinicart(cartData, productList) {
  const miniCartData = [];
  cartData.orderItem.forEach(cartItem => {
    const itemJson = getCartItemDetail(cartItem); // Get Order Item Details
    for (let index = 0; index < productList.length; index += 1) {
      if (itemJson.uniqueID === productList[index].uniqueID) {
        Object.assign(itemJson, productList[index]);
        break;
      }
    }
    miniCartData.push(itemJson);
  });
  return miniCartData;
};

function getCartItemDetail(OrderItem) {
  const orderItemJSON = {
    uniqueID: OrderItem.productId,
    quantity: Number(OrderItem.quantity),
    shippingCharges: OrderItem.shippingCharge,
    orderItemId: OrderItem.orderItemId,
    // unitPrice: OrderItem.unitPrice,
    // orderItemPrice: OrderItem.orderItemPrice,
  };
  return orderItemJSON;
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
module.exports.cart = function cart(cartData) {
  return cartData;
};
