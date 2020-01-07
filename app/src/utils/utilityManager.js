import {
    wishlistDataCookie,
    wishlistIdCookie,
    host
} from '../../public/constants/constants';
import LightHeader from '../components/HeaderComponent/headerL1/lightHeader';
import HeaderContainer from '../containers/HeaderContainer';
// import { utimes } from 'fs';

/**
 * Function to get current URL hostname and port
 * @param {*}
 */

/**
 * Function to get current URL hostname and port
 * @param {*} pin
 */
export function validatePIN(pin) {
    if (/^(\d{4}|\d{6})$/.test(pin)) {
        return true;
    }
    return false;
}

/**
 * Function will pick the browser width *
 */

export function isMobile() {
    return $(window).width() < 992;
}

/**
 * Function will pick the browser width *
 */

export function isTab() {
    return $(window).width() < 1025;
}

/**
 * Function will pick the browser width *
 */

export function getWindowWidth() {
    return $(window).width();
}

/**
 * Function to Fetch specific data from Cookie store
 * @param {*} cname
 */
export function getCookie(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

/**
 * Function to get relevent state of the reducer
 * @param {*} state
 * @param {*} reducerName
 */
export function getReleventReduxState(state, reducerName) {
    let extractedState;
    state._root.entries.map(result => {
        if (result[0] === reducerName) {
            extractedState = result[1];
        }
    });
    return extractedState;
}

/**
 * Function to get relevent value of the Sorting
 * @param {*} value 
  0 - Recommended
  3 - Low to High
  4 - High to Low
  5 - New Arrival
 */
export function fetchReleventSortingValue(value) {
    if (isMobile()) {
        if (value === 'Price - Low to High') {
            return 3;
        }
        if (value === 'Price - High to Low') {
            return 4;
        }
        if (value === 'New Arrival') {
            return 5;
        }
    }
    else {
        if (value === 'Price Low to High') {
            return 3;
        }
        if (value === 'Price High to Low') {
            return 4;
        }
        if (value === 'New Arrival') {
            return 5;
        }
    }
    
    // Recommended
    return 0;
}

export function fetchReleventSortingValueByIndex(index) {
    if (isMobile()) {
        if (parseInt(index) === 0) {
            return 'Price - Low to High';
        }
        if (parseInt(index) === 1) {
            return 'Price - High to Low';
        }
        if (parseInt(index) === 3) {
            return 'New Arrival';
        }
    }
    else {
        if (parseInt(index) === 0) {
            return 'Price Low to High';
        }
        if (parseInt(index) === 1) {
            return 'Price High to Low';
        }
        if (parseInt(index) === 3) {
            return 'New Arrival';
        }
    }
    
    return 'Interio Recommends';
}

export function mapSortIndex(index) {
    if (parseInt(index) === 3) {
        return 0;
    }
    if (parseInt(index) === 4) {
        return 1;
    }
    if (parseInt(index) === 5) {
        return 3;
    }
    return 2;
}

/**
 * Function to save the Filter map object
 * @param {*} updatedFilter
 * @param {*} facetName
 */
export function updateFilterMap(updatedFilter, facetName, currentFilter) {
    const filterMap = currentFilter.updateFilter;
    if (updatedFilter.length === 0) {
        filterMap.delete(facetName);
        return filterMap;
    }
    filterMap.set(facetName, updatedFilter);
    return filterMap;
}

export function RWDUpdateFilterMap(updatedFilter, facetName, currentFilter) {
    const filterMap = currentFilter.rwdUpdatedFilter;
    if (updatedFilter.length === 0) {
        filterMap.delete(facetName);
        return filterMap;
    }
    filterMap.set(facetName, updatedFilter);
    return filterMap;
}

/**
 * Function to sort the Browsing Filters
 * @param {*} filterResponse
 * @param {*} facetName
 */
export function resolveBrowserFilters(filterResponse, browserFilters) {
    const finalBrowserFilter = [];
    for (let i = 0; i < browserFilters.length; i++) {
        if (browserFilters[i][0] === 'facet') {
            var reduxFilter = [];

            const facetValue = browserFilters[i][1];
            filterResponse.map((facetItem, index) => {
                const name = facetItem.facetName;

                facetItem.facetValues.map((innerItem, index) => {
                    if (innerItem.value === facetValue) {
                        reduxFilter.push(innerItem);
                    }
                }); // innerItem ended
            }); // facetItem ended
        }
    }

    // 0: {label: "Sofa Cum Beds", count: 5, value: "parentCatgroup_id_search:10051_13019"}
    // 1: {label: "Sofa Cum Beds", count: 5, value: "parentCatgroup_id_search:10051_13019"}
    // Returns abaove array
}

/**
 * Function to resolve the Filter
 * @param {*} updatedFilter
 */
export function resolveTheFilter(updatedFilter) {
    let filterURL = '';
    for (const [key, value] of updatedFilter) {
        filterURL += 'facet=';
        value.map((option, i) => {
            filterURL += option.value;
            if (value.length !== i + 1) {
                filterURL += '+';
            }
        });
        filterURL += '&';
    }
    return filterURL;
}

/** -----------------------------------------------------------------------
 * Function to resolve the Filter
 * @param {*} wishlist_Data
 */
export function resolveTheWishlistData(wishlist_Data) {
    const wishlistId = wishlist_Data.wishlistItemArray[0].wishlistID;
    const wishlistArr = wishlist_Data.wishlistItemArray[0].wishlistItemList;

    const json_str = JSON.stringify(wishlistArr);
    document.cookie = `${wishlistDataCookie}=${json_str};path=/;expires=''`;
    document.cookie = `${wishlistIdCookie}=${wishlistId};path=/;expires=''`;
}

export function getOnlyWishlistUniqueIds() {
    const wishliArrStr = getCookie(wishlistDataCookie);
    const wishlistArr = JSON.parse(wishliArrStr);

    const wishlistUniqueIdArr = wishlistArr.map(item => item.uniqueID);
    return wishlistUniqueIdArr;
}

export function getCorrespondingGiftlistId(uniqueID) {
    const wishliArrStr = getCookie(wishlistDataCookie);
    const wishlistArr = JSON.parse(wishliArrStr);
    let giftlistId = '';
    wishlistArr.map(item => {
        if (item.uniqueID === uniqueID) {
            giftlistId = item.giftListItemID;
        }
    });
    return giftlistId;
}

/* ----------------------------------------------------------------------- */

export function trimTheSentence(title, charLimit) {
    const trimStr = `${title.substring(0, charLimit)}...`;
    return trimStr;
}

export function checkCompareWidget(compWidget, skuId) {
    const data = compWidget.find(prd => prd.skuId == skuId);
    if (data) {
        return compWidget.filter(prd => prd.skuId != skuId);
    }
    const skuData = compWidget.find(prd => prd.skuId == skuId);
    if (skuData) {
        return compWidget.filter(prd => prd.skuId != idskuId);
    }

    return compWidget;
}

export function is(val, type) {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
}

export function updateWidgetData(data, obj) {
    var widgetdata = [];
    data.forEach((elem, index) => {
        var comp = elem;
        if (elem.id == obj.name) {
            comp.skuId = obj.id
        };
        widgetdata.push(comp);
    });
    return widgetdata;

}

export function formatPrice(priceValue) {
    return parseInt(priceValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function createPdpURL(prodName, skuId){
	if(prodName != undefined && prodName != '')
	{
		prodName =prodName.toLowerCase();
		return '/furniture-online-' + prodName.split(' ').join('-') + '/' + skuId;
	}
    return '/furniture-online-' + prodName + '/' + skuId;
}

export function createSEOPdpURL(prodName, shortDesc, skuId){
	if(prodName != undefined && prodName != '')
	{
		prodName =prodName.toLowerCase();
		var shortDescURL = '';
		if(shortDesc != undefined && shortDesc != '') {
			shortDescURL =shortDesc.replace(' & ', '-');
			shortDescURL =shortDesc.replace(', ', '-');
			shortDescURL =(shortDesc.split(' , ').join('-')).split(' & ').join('-');
			shortDescURL =(shortDesc.split(', ').join('-')).split(' &').join('-');
			shortDescURL =(shortDesc.split(' ').join('-')).split(',').join('-');
			shortDescURL =(shortDescURL.split('/').join('-')).split('?').join('-');
			shortDescURL =(shortDescURL.split('\\').join('-')).split('&').join('-');
			shortDescURL = shortDescURL.toLowerCase();
            shortDescURL = '-' + shortDescURL;
            shortDescURL = shortDescURL.replace(/---/g, '-');
            shortDescURL = shortDescURL.replace(/--/g, '-');
		}
		var prodURL= prodName.split(' ').join('-');
		prodURL= prodURL.replace(/---/g, '-');
		prodURL= prodURL.replace(/--/g, '-');
		return '/furniture-online-' + prodURL +shortDescURL +  '/' + skuId;
	}
    return '/furniture-online-' + prodName + '/' + skuId;
}

export function createCategoryPlpURL(categoryIdentifier)
{
	 var categoryRoutePath = `/`;
	if(categoryIdentifier != undefined && categoryIdentifier != '')
	{
		var catIdentifier = categoryIdentifier.replace(/\s+/g, "").toLowerCase();
		catIdentifier = catIdentifier.replace(/ /g, "");
        categoryRoutePath = `/furniture-${catIdentifier}`;

	}
    return categoryRoutePath;
}

export function createTopCategoryPlpURL(categoryIdentifier)
{
	 var categoryRoutePath = `/`;
	if(categoryIdentifier != undefined && categoryIdentifier != '')
	{
		var catIdentifier = categoryIdentifier.replace(/\s+/g, "").toLowerCase();
		catIdentifier = catIdentifier.replace(/ /g, "");
        categoryRoutePath = `/online-furniture-${catIdentifier}`;

	}
    return categoryRoutePath;
}

export function createPlpItemData(plpData) {
    let plpItem = Array();
    let productName;
    let productUrl;
    plpData.map((data, index) => {
        if (data.skuList && data.skuList[0] && data.skuList[0].productName) 
		{
			productName = data.skuList[0].productName;
        } 
		else if(data.productName)
		{
			productName = data.productName;
        }
		else 
		{
			productName = '';
        }

        if (data.skuList && data.skuList[0] && data.skuList[0].partNumber) {
			productUrl = host+createCategoryPlpURL(productName, data.skuList[0].partNumber);
        } 
		else if(data.partNumber)
		{
			productUrl = host+createCategoryPlpURL(productName, data.partNumber);
        }
		else {
			productUrl = '';
        }

        if (index === 0) {
            plpItem.push({"@type":"ListItem","position":1,"url":productUrl,"name":productName});
        } else {
            plpItem.push({"@type":productUrl,"name":productName});
        }
        
    });
    return plpItem;
  }

export function scrollPage(prevUrl, currUrl) 
{

	let pathurl=window.location.href;
	if(window.location.hash)
	{
	  var element = document.getElementById(window.location.hash.substr(1));
	  if (element) 
	  {
		element.scrollIntoView();
	  }
	  else{
		  $('html, body').animate({ scrollTop: 0 }, 'smooth');
	  }
	}
    else if((pathurl.includes("sort") ||  pathurl.includes("filter")) && !(isMobile() || isTab())){
       $('html, body').stop().animate();
    }
    else if((pathurl.includes("sort") ||  pathurl.includes("filter")) && !(isMobile() || isTab())){
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
    }
	else 
	{
	   if(prevUrl != currUrl)
	   {
		   $('html, body').animate({ scrollTop: 0 }, 'fast');
	   }
	}
	
   return true;
}

function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
 
/* Define functin to find and replace specified term with replacement string */
function replaceAll(str, term, replacement) {
  return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

/** -----------------------------------------------------------------------
 * Function to map Payment Method Id
 * @param {*} searchKeyword
 */
export function formateSearchKeyword(searchKeyword, isKeywordEntered) {
    
    if (searchKeyword !== null && searchKeyword !== undefined && searchKeyword !== '') {
        if (isKeywordEntered) {
			searchKeyword = searchKeyword.replace(/&/g, ':::');
            searchKeyword = searchKeyword.replace(/%/g, '_:');
            searchKeyword = searchKeyword.replace(/\+/g, '%2B');
			searchKeyword = replaceAll(searchKeyword, '[', ' __');
			searchKeyword = replaceAll(searchKeyword, ']', ' :_');
            return searchKeyword;
        }
        else {
			searchKeyword = searchKeyword.replace(/:::/g, '&');
			searchKeyword = searchKeyword.replace(/_:/g, '%');
			searchKeyword = searchKeyword.replace(/ __/g, '[');
            searchKeyword = searchKeyword.replace(/ :_/g, ']');
            searchKeyword = searchKeyword.replace(/%2B/g, '+');
            searchKeyword = searchKeyword.replace(/%3A%3A%3A/g, '&');
            return searchKeyword;
        }
    }
	else{
		searchKeyword = '';
		return searchKeyword;
	}
    
    
}

/** -----------------------------------------------------------------------
 * Function to map Payment Method Id
 * @param {*} PaymentMode
 */
export function mapPaymentMethodMode(paymentMode) {
    if (paymentMode === 'CREDIT_CARD') {
        return 'Credit Card';
    }
    else if (paymentMode === 'DEBIT_CARD') {
        return 'Debit Card';
    }
    else if (paymentMode === 'NET_BANKING') {
        return 'Netbanking';
    }
    else if (paymentMode === 'UPI') {
        return 'UPI';
    }
    else if (paymentMode === 'CC_EMI') {
        return 'EMI';
    }
    else if (paymentMode === 'MOBIKWIK') {
        return 'Mobikwik';
    }
    else if (paymentMode === 'PHONEPE') {
        return 'PhonePe';
    }
    else if (paymentMode === 'PAYTM') {
        return 'PayTM';
    }
    else {
        return '';
    }

}