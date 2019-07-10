/**
 * Filter WCS Image Path.
 * @return New Image Path
 */
module.exports.getImagePath = function getImagePath(imagePath) {
  let newImagePath = '';
  if (imagePath) {
    newImagePath = imagePath.substring(
      imagePath.indexOf('/images'),
      imagePath.length,
    );
  }
  return newImagePath;
};

/**
 * Filter Images for PDP
 * @return images attachment
 */
module.exports.getProductImages = getProductImages;
function getProductImages(productData) {
  const productAttachment = {
    thumbnailImages: [],
    mainImages: [],
    zoomImages: [],
  };
  if (productData.attachments && productData.attachments.length > 0) {
    const thumbnailImages = [];
    const mainImages = [];
    const zoomImages = [];

    productData.attachments.forEach(attachment => {
      if (attachment.usage === 'IMAGE_SIZE_500_500') {
        thumbnailImages.push({
          name: attachment.name,
          imagePath: `/${attachment.attachmentAssetPath}`,
        });
      } else if (attachment.usage === 'IMAGE_SIZE_803_602') {
        mainImages.push({
          name: attachment.name,
          imagePath: `/${attachment.attachmentAssetPath}`,
        });
      } else if (attachment.usage === 'IMAGE_SIZE_1440_810') {
        zoomImages.push({
          name: attachment.name,
          imagePath: `/${attachment.attachmentAssetPath}`,
        });
      }
    });
    productAttachment.thumbnailImages = sortProductImages(thumbnailImages);
    productAttachment.mainImages = sortProductImages(mainImages);
    productAttachment.zoomImages = sortProductImages(zoomImages);
  }
  return productAttachment;
}

/**
 * Sort Product Images
 * @param {} bodydata
 */
function sortProductImages(bodydata) {
  bodydata.sort(
    (a, b) =>
      parseInt(a.name.split('_')[2], 10) - parseInt(b.name.split('_')[2], 10),
  );
  bodydata.sort(
    (a, b) =>
      parseInt(a.name.split('_')[1], 10) - parseInt(b.name.split('_')[1], 10),
  );
  return bodydata;
}
