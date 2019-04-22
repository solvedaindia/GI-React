/**
 * Filter Mini Cart Data.
 * @return Mini Cart JSON Data
 */
module.exports.minicart = function getMinicart(cartData) {
  return cartData;
};

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
