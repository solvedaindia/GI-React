const espotFilter = require('./espotfilter');
const categoryFilter = require('./categoryfilter');
const cartFilter = require('./cartfilter');
const profileFilter = require('./profilefilter');
const wishlistFilter = require('./wishlistfilter');
const productListFilter = require('./productlistfilter');
const productDetailFilter = require('./productdetailfilter');

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
  if (filterType === 'wishlist_itemlist') {
    return wishlistFilter.itemlist(data);
  }
  if (filterType === 'productlist_facet') {
    return productListFilter.facetData(data);
  }
  if (filterType === 'productlist_list') {
    return productListFilter.productList(data);
  }
  if (filterType === 'productlist_id') {
    return productListFilter.productIDs(data);
  }
  if (filterType === 'productlist_withswatch') {
    return productListFilter.productListWithSwatch(data);
  }
  if (filterType === 'productlist_withoutswatch') {
    return productListFilter.productListWithoutSwatch(data);
  }
  if (filterType === 'productdetail_summary') {
    return productDetailFilter.productDetailSummary(data);
  }
  return data;
};
