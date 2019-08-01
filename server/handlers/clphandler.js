const errorUtils = require('../utils/errorutils');
const espotsHandler = require('./espotshandler');
const plpHandler = require('./plphandler');
const espotFilter = require('../filters/espotfilter');
const logger = require('../utils/logger.js');
const filter = require('../filters/filter');

module.exports.getInspirationThemes = getInspirationThemes;
function getInspirationThemes(headers,params,callback){
  if(!params.espotName){
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  espotsHandler.getEspotsData(headers, params.espotName,(err,res)=>{
    if(err){
      callback(err);
      return;
    }
    const espotRes = espotFilter.espotContent(res);
    if(espotRes && espotRes.recoImgArray && espotRes.recoImgArray.length>0){
      const themes = espotRes.recoImgArray;
      let query = {
        pn : [],
      };
      
      themes.forEach(theme => {
        if(theme.recoIconArray && theme.recoIconArray.length>0){
          theme.recoIconArray.forEach(icon => {
            query.pn.push(icon.partNumber);
          });
        }
      });
      plpHandler.productListByPartNumbers(headers,query,(error,response)=>{
        if(!error)
          {
            themes.forEach(theme => {
              if(theme.recoIconArray && theme.recoIconArray.length>0){
                theme.recoIconArray.forEach(icon => {
                 Object.assign(icon,response[icon.partNumber]);
                });
              }
            });
            espotRes.recoImgArray = themes;
            callback(null,espotRes);
          } else {
            console.log('>>>',error);
          }
      });
    } else{
      callback(null,espotRes);
    }
  });
}


/**
 * The function will return CLP Data
 * @param espot_name
 * @return CLP data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
/* Get CLP Data from Espots */
/* module.exports.getClpData = function getClpData(req, callback) {
  if (!req.query.id || !req.body.espot_name) {
    logger.debug('Get CLP data :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  // const categoryID = req.query.id;
  const bodyEspots = req.body.espot_name;
  const reqHeaders = req.headers;
  async.map(
    bodyEspots,
    (espotName, cb) => {
      if (espotName !== '') {
        espotsHandler.getEspotsData(reqHeaders, espotName, cb);
      } else {
        cb(errorUtils.errorlist.invalid_params);
      }
    },
    (err, results) => {
      if (err) {
        logger.debug('Error while calling CLP data');
        callback(err);
        return;
      }
      logger.debug('Got all the origin resposes');
      logger.debug('Body JSON', JSON.stringify(results));
      callback(null, transformClpBody(results));
    },
  );
}; */

/* function transformClpBody(results) {
  const res = {};
  results.forEach(element => {
    const espotResult = filter.filterData('espotcontent', element);
    if (espotResult != null) {
      const keys = Object.keys(espotResult);
      keys.forEach(key => {
        res[key] = espotResult[key];
      });
    }
  });
  return res;
} */

/* const espotName = 'GI_Header_Static_Data';
function getHeroBanner(headers, catId, callback) {
  espotsHandler.getEspotsData(headers, espotName, (err, response) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, response);
  });
}
function getSubCategories(headers, catId, callback) {
  callback(null, {});
}
function getInspirationData(headers, catId, callback) {
  espotsHandler.getEspotsData(headers, espotName, (err, response) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, response);
  });
}
function getTrendingProducts(headers, catId, callback) {
  espotsHandler.getEspotsData(headers, espotName, (err, response) => {
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
