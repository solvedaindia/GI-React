const espotFilter = require('./espotfilter');
const categoryFilter = require('./categoryfilter');
const cartFilter = require('./cartfilter');
const profileFilter = require('./profilefilter');
const wishlistFilter = require('./wishlistfilter');

/**
 * Filter Data.
 * @return Filtered Data
 */
module.exports.filterData = function filterData(filterType, data) {
  if (filterType === 'espotcontent') {
    return espotFilter.content(data);
  }
  if (filterType === 'categorynavigation') {
    return categoryFilter.navigation(data);
  }
  if (filterType === 'categorydetail') {
    return categoryFilter.categoryDetails(data);
  }
  if (filterType === 'minicart') {
    return cartFilter.minicart(data);
  }
  if (filterType === 'cart_quantity') {
    return cartFilter.quantity(data);
  }
  if (filterType === 'cart') {
    return cartFilter.cart(data);
  }
  if (filterType === 'userinfo') {
    return profileFilter.userinfo(data);
  }
  if (filterType === 'wishlist_itemcount') {
    return wishlistFilter.itemcount(data);
  }
  return data;
};
