const async = require('async');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin');
const constants = require('../utils/constants');
const errorUtils = require('../utils/errorutils');
const headerUtils = require('../utils/headerutil');
const apiCache = require('../utils/apicache');

/* GET Auto Suggest key */
/* Auto Suggest Result Page API */
module.exports.getAutoSuggestResult = (req, callback) => {
  const resultObj = {};
  if (!req.params || !req.params.byterm || req.params.byterm === '') {
    logger.debug('Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const autoSuggestTask = [
    getKeywordSuggestion.bind(null, req.headers, req.params.byterm),
    getCategorySuggestion.bind(null, req, req.params.byterm),
  ];
  async.parallel(autoSuggestTask, (err, result) => {
    if (err) {
      callback(err);
    } else {
      resultObj.suggestionView = result[0].suggestionView;
      resultObj.categorySuggestionView = result[1].categorySuggestionView;
      callback(null, resultObj);
    }
  });
};

function getKeywordSuggestion(headers, searchTerm, callback) {
  const originUrl = constants.autoSuggest
    .replace('{{storeId}}', headers.storeId)
    .replace('{{urlParam}}', searchTerm);

  const reqHeaders = headerUtils.getWCSHeaders(headers);

  origin.getResponse(
    'GET',
    originUrl,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        logger.debug('Error in Calling Auto Keyword Suggestion');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

function getCategorySuggestion(req, searchTerm, callback) {
  apiCache.getCachedResponse('catsuggestion', null, async cacheRes => {
    if (cacheRes) {
      const categorySuggestion = cacheRes;
      const data = categorySuggestion.suggestionView[0].entry;
      if (searchTerm) {
        const filterData = await filterDataFunction(searchTerm, data);
        callback(null, filterData);
      }
    } else {
      const originUrl = constants.categorySuggestions.replace(
        '{{storeId}}',
        req.headers.storeId,
      );

      const reqHeaders = headerUtils.getWCSHeaders(req.headers);

      origin.getResponse(
        'GET',
        originUrl,
        reqHeaders,
        null,
        null,
        null,
        '',
        async response => {
          if (response.status === 200) {
            apiCache.cacheResponse('catsuggestion', null, response.body);
            const data = response.body.suggestionView[0].entry;
            if (searchTerm) {
              const filterData = await filterDataFunction(searchTerm, data);
              callback(null, filterData);
            }
          } else {
            logger.debug('Error in Calling Auto Category Suggestion');
            callback(errorUtils.handleWCSError(response));
          }
        },
      );
    }
  });
}

const filterDataFunction = (filterKeyword, data) =>
  new Promise((resolve, reject) => {
    if (!filterKeyword || !data) {
      reject();
    }
    const filterDataArray = [];

    const starting = 'Rooms';
    data.forEach(item => {
      const filterDataArrayObject = {};
      if (
        item.name.toUpperCase().includes(filterKeyword.toUpperCase()) === true
      ) {
        if (item.fullPath.toLowerCase().startsWith(starting.toLowerCase())) {
          const pathString = item.fullPath.split('>');
          const parentRoom = pathString[1]
            ? pathString[1].trim()
            : pathString[1];
          const lowerKeyword = filterKeyword.toLowerCase();
          const lowerStartString = starting.toLowerCase();
          if (
            pathString.length >= 2 ||
            (lowerKeyword === lowerStartString &&
              (parentRoom !== undefined ||
                parentRoom !== null ||
                parentRoom !== ''))
          ) {
            filterDataArrayObject.categoryId = item.value;
            filterDataArrayObject.categoryName = item.name;
            filterDataArrayObject.categoryIdentifier = item.identifier_ntk;
            filterDataArrayObject.parentRoom = parentRoom;
            filterDataArray.push(filterDataArrayObject);
          }
        }
      }
    });

    const filterDataObject = {
      categorySuggestionView: filterDataArray.slice(0, 2),
    };
    resolve(filterDataObject);
  });
