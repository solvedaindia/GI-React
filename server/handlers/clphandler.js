const errorUtils = require('../utils/errorutils');
const espotsHandler = require('./espotshandler');
const plpHandler = require('./plphandler');
const espotFilter = require('../filters/espotfilter');

module.exports.getInspirationThemes = getInspirationThemes;
function getInspirationThemes(headers, params, callback) {
  if (!params.espotName) {
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  espotsHandler.getEspotsData(headers, params.espotName, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    const espotRes = espotFilter.espotContent(res);
    if (espotRes && espotRes.recoImgArray && espotRes.recoImgArray.length > 0) {
      const themes = espotRes.recoImgArray;
      const query = {
        pn: [],
      };

      themes.forEach(theme => {
        if (theme.recoIconArray && theme.recoIconArray.length > 0) {
          theme.recoIconArray.forEach(icon => {
            query.pn.push(icon.partNumber);
          });
        }
      });
      plpHandler.productListByPartNumbers(headers, query, (error, response) => {
        if (!error) {
          themes.forEach(theme => {
            if (theme.recoIconArray && theme.recoIconArray.length > 0) {
              theme.recoIconArray.forEach(icon => {
                Object.assign(icon, response[icon.partNumber]);
              });
            }
          });
          espotRes.recoImgArray = themes;
          callback(null, espotRes);
        } else {
          callback(null, espotRes);
        }
      });
    } else {
      callback(null, espotRes);
    }
  });
}
