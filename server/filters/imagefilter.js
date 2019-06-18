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
