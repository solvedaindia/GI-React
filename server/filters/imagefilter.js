/**
 * Filter WCS Image Path.
 * @return New Image Path
 */
module.exports.getImagePath = function getImagePath(imagePath) {
  let newImagePath = '';
  if (imagePath) {
    newImagePath = `/${imagePath.substring(
      imagePath.indexOf('B2C'),
      imagePath.length,
    )}`;
  }
  return newImagePath;
};

/**
 * Filter WCS Image Path.
 * @return New Image Path
 */
module.exports.getImagePathNew = function getImagePathNew(imagePath) {
  let newImagePath = '';
  if (imagePath) {
    newImagePath = `/${imagePath.substring(
      imagePath.indexOf('B2C'),
      imagePath.length,
    )}`;
  }
  return newImagePath;
};

/* Get 1:1 Thumbail Image */
function getThumbnail(image) {
  return (
    image.usage === 'IMAGE_SIZE_500_500' &&
    (image.name.split('_')[1] === '03' || image.name.split('_')[1] === '3')
  );
}

/* Get 3:2 Thumbnail Image */
function getThumbnail2(image) {
  return (
    image.usage === 'IMAGE_SIZE_546_307' &&
    (image.name.split('_')[1] === '03' || image.name.split('_')[1] === '3')
  );
}

/**
 * Get Thumbnail Images
 * @return images attachment
 */
module.exports.getThumbnailImages = getThumbnailImages;
function getThumbnailImages(attachment) {
  const resJson = {
    thumbnail: '',
    thumbnail2: '',
  };
  if (attachment && attachment.length > 0) {
    const thumbnailObject = attachment.filter(getThumbnail);
    if (thumbnailObject && thumbnailObject.length > 0) {
      resJson.thumbnail = `/${thumbnailObject[0].attachmentAssetPath}`;
    }

    const thumbnail2Object = attachment.filter(getThumbnail2);
    if (thumbnail2Object && thumbnail2Object.length > 0) {
      resJson.thumbnail2 = `/${thumbnail2Object[0].attachmentAssetPath}`;
    }
  }
  return resJson;
}

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
