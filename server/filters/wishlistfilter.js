/**
 * Filter Wishlist Data.
 * @return Wishlist Item Count
 */
module.exports.itemcount = function getItemCount(wishlistData) {
  const wishlistJson = {
    wishlistTotalItems: 0,
    wishlistItemArray: [],
  };
  if (wishlistData.GiftList && wishlistData.GiftList.length > 0) {
    wishlistData.GiftList.forEach(list => {
      const wishlistDetails = {
        wishlistID: list.uniqueID,
        wishlistName: list.descriptionName,
        wishlistItemList: [],
      };
      if (list.item && list.item.length > 0) {
        wishlistJson.wishlistTotalItems += list.item.length;
        list.item.forEach(element => {
          const itemDetails = {};
          itemDetails.uniqueID = element.productId;
          itemDetails.giftListItemID = element.giftListItemID;
          wishlistDetails.wishlistItemList.push(itemDetails);
        });
      }
      wishlistJson.wishlistItemArray.push(wishlistDetails);
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
      const wishlistDetails = {
        wishlistID: list.uniqueID,
        wishlistName: list.descriptionName,
        wishlistItemList: [],
      };
      if (list.item && list.item.length > 0) {
        list.item.forEach(element => {
          const itemDetails = {};
          itemDetails.productID = element.productId;
          itemDetails.giftListItemID = element.giftListItemID;
          wishlistDetails.wishlistItemList.push(itemDetails);
        });
      }
      itemArray.push(wishlistDetails);
    });
  }
  return itemArray;
};
