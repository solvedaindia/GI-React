/**
 * Filter Wishlist Data.
 * @return Wishlist Item Count
 */
module.exports.itemcount = function getItemCount(wishlistData) {
  const wishlistJson = {
    wishlistTotalItems: 0,
  };
  if (wishlistData.GiftList && wishlistData.GiftList.length > 0) {
    wishlistData.GiftList.forEach(list => {
      if (list.item && list.item.length > 0) {
        wishlistJson.wishlistTotalItems += list.item.length;
      }
    });
  }
  return wishlistJson;
};

/**
 * Filter Wishlist Data.
 * @return Wishlist Item List
 */
module.exports.itemlist = function getItemList(wishlistData) {
  const itemArray = [];
  if (wishlistData.GiftList && wishlistData.GiftList.length > 0) {
    wishlistData.GiftList.forEach(list => {
      const itemDetails = {
        wishlistID: list.uniqueID,
        wishlistName: list.descriptionName,
      };
      if (list.item && list.item.length > 0) {
        list.item.forEach(element => {
          itemDetails.productID = element.productId;
          itemDetails.giftItemID = element.giftListItemID;
        });
      }
      itemArray.push(itemDetails);
    });
  }
  return itemArray;
};
