/**
 * Filter Espot Data.
 * @return Content Names and their Marketing Text as JSON Object
 */
module.exports.content = function espotContentFilter(espotBody) {
  const resJson = {};
  if (
    espotBody &&
    espotBody !== '' &&
    espotBody.MarketingSpotData[0] &&
    espotBody.MarketingSpotData[0].baseMarketingSpotActivityData &&
    espotBody.MarketingSpotData[0].baseMarketingSpotActivityData.length > 0
  ) {
    const espotContentArray =
      espotBody.MarketingSpotData[0].baseMarketingSpotActivityData;
    espotContentArray.forEach(element => {
      let contentData = '';
      try {
        contentData = JSON.parse(
          element.marketingContentDescription[0].marketingText,
        );
      } catch (err) {
        contentData = element.marketingContentDescription[0].marketingText;
      }
      resJson[element.contentName] = contentData;
    });
    return resJson;
  }
  return null;
};

/**
 * Filter Espot Data.
 * @return Marketing Text as JSON Object
 */
module.exports.espotContent = function espotContentFilter(espotBody) {
  let resJson = {};
  if (
    espotBody &&
    espotBody !== '' &&
    espotBody.MarketingSpotData[0] &&
    espotBody.MarketingSpotData[0].baseMarketingSpotActivityData &&
    espotBody.MarketingSpotData[0].baseMarketingSpotActivityData.length > 0
  ) {
    try {
      resJson = JSON.parse(
        espotBody.MarketingSpotData[0].baseMarketingSpotActivityData[0]
          .marketingContentDescription[0].marketingText,
      );
    } catch (err) {
      resJson =
        espotBody.MarketingSpotData[0].baseMarketingSpotActivityData[0]
          .marketingContentDescription[0].marketingText;
    }
    return resJson;
  }
  return null;
};
