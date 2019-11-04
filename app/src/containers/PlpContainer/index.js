/**
 *
 * PlpContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import PlpComponent from '../../components/PlpComponent/index';
import Pixels from '../../components/Primitives/pixels';
import {
  getReleventReduxState,
  resolveTheFilter,
  resolveBrowserFilters,
  formateSearchKeyword,
} from '../../utils/utilityManager';
import '../../../public/styles/plpContainer/plpContainer.scss';
import appCookie from '../../utils/cookie';
import SubCategories from '../../components/GlobalComponents/productSubcategories/subCategories';
import FilterMain from '../../components/PlpComponent/Filter/filterMain';
import MarketingTextBanner from '../../components/PlpComponent/MarketingeTextBanner/marketingTextBanner';
import DescriptionBanner from '../../components/PlpComponent/DescriptionBanner/descriptionBanner';
import Sort from '../../components/PlpComponent/Sorting/sort';
import BestSeller from '../../components/BestSelling/bestSelling';
import { Helmet } from "react-helmet";
import * as actionCreators from './actions';
import CompContainer from './compWidget';
import apiManager from '../../utils/apiManager';
import {
  plpSubCatAPI,
  plpAPI,
  espotAPI,
  searchPageAPI,
} from '../../../public/constants/constants';
import RWDSort from '../../components/PlpComponent/RWD PLP Components/RWDSort';
import RWDFilterMain from '../../components/PlpComponent/RWD PLP Components/RWDFilter/RWDFilterMain';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import ContentEspot from '../../components/Primitives/staticContent';
import { createPlpItemData } from '../../utils/utilityManager';

let categoryId;
export class PlpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plpSubCatData: null,
      marketingTextBannerData: null,
      plpDescriptionData: null,
      plpData: [],
      adBannerData: null,
      error: false,
      hasMore: true,
      isLoading: false,
      pageNumber: 1,
      pageSize: 18,
      categoryDetail: true,
      sortValue: this.props.sortingValue,
      filterData: [],
      isCatDetails: true,
      categoyDetails: null,
      productCount: null,
      plpFilter: '',
      plpSorting: '',
      displaySkus: true,
      breadcrumbData: null,
      // Search Vars
      isFromSearch: this.props.location.pathname,
      searchKeyword: this.props.location.search,
      emptySearchItem: null,
      showBestSeller: null,
      newSearchTrigger: false,
      spellCheckCount: 0,
      // Browser Routing Vars
      browserFilters: [],

      // RWD Vars
      isMobile: window.innerWidth <= 992,
    };
    this.myRef = React.createRef();
    this.onscroll = this.onscroll.bind(this);
    this.onSearchNoResut = this.onSearchNoResut.bind(this);
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname !== '/compare') {
      appCookie.set('compareProduct', '', 365 * 24 * 60 * 60 * 1000);
      this.props.removeAll();
    }
    removeEventListener('scroll', this.onscroll);
  }

  componentDidMount() {
    categoryId = '';
    const path = String(this.props.location.pathname);
    const idStr = this.props.location.pathname.replace('/furniture-', '');
    if (idStr != undefined && idStr !== categoryId) {
      categoryId = idStr;
    }

    const params = new URLSearchParams(this.props.location.search);
    const filterAtt = params.get('filter');
    let filterRoutingURL = '';
    let sortingRoutingURL = '';
    let onlyFilter = [];
    for (const p of params) {
      if (p[0] === 'filter') {
        filterRoutingURL += `${decodeURI(p[1])}&`;
        onlyFilter[p[1]];
      } else if (p[0] === 'sort') {
        sortingRoutingURL = p[1];
      }
    }
    filterRoutingURL = filterRoutingURL.replace(' ', '+');
    const vingg = new URLSearchParams(filterAtt);

    this.setState({
      plpFilter: filterRoutingURL,
      plpSorting: sortingRoutingURL,
      browserFilters: vingg.getAll('facet'),
    });

    addEventListener('scroll', this.onscroll);
    this.fetchPLPProductsData();
    if (!this.state.isFromSearch.includes('/search')) {
      this.fetchSubCategoryData();
      this.fetchMarketingTextBannerData();
      this.fetchDescriptionData();
    }
  }

  componentWillReceiveProps(nextProps) {
    let params = new URLSearchParams(this.props.location.search);
    if (nextProps.sortingValue !== this.props.sortingValue) {
      let params1 = new URLSearchParams(this.props.location.search);

      params1.set(`sort`, `${nextProps.sortingValue}`);
      let finalMap = params1.toString();
      this.props.history.push({ search: finalMap });
      this.setState({
        plpData: [],
        pageNumber: 1,
        plpSorting: nextProps.sortingValue,
      });
      this.fetchPLPProductsData();
    }
    if (nextProps.updatedFilter !== this.props.updatedFilter) {
      let params2 = new URLSearchParams(nextProps.location.search);
      if (nextProps.updatedFilter === '') {
        params2.delete('filter');
      } else {
        params2.set(`filter`, `${encodeURI(nextProps.updatedFilter)}`);
      }
      this.props.history.push({ search: params2.toString(),
      });
      this.setState({
        plpData: [],
        filterData: [],
        pageNumber: 1,
        plpFilter: nextProps.updatedFilter,
      });
      this.fetchPLPProductsData();
    }

    if (nextProps.location.pathname.includes('/search')) {
      const paramsNext = new URLSearchParams(nextProps.location.search);
      const keywordNext = paramsNext.get('keyword');
      const paramsThis = new URLSearchParams(this.props.location.search);
      const keywordThis = paramsThis.get('keyword');
      if (keywordNext !== keywordThis) {
        //If New search entered
        this.setState({
          marketingTextBannerData: null,
          plpSubCatData: null,
          plpData: [],
          filterData: [],
          plpFilter: '',
          pageNumber: 1,
          plpDescriptionData: null,
          categoryDetail: true,
          isFromSearch: nextProps.location.pathname,
          searchKeyword: nextProps.location.search,
          showBestSeller: false,
          newSearchTrigger: true,
          spellCheckCount: 0,
          emptySearchItem: null,
        });
        categoryId = '';
        this.fetchPLPProductsData();
      } else {
      }
    } else if (nextProps.location.pathname !== this.props.location.pathname) {
      const nextPath = String(nextProps.location.pathname);
      const nextIdStr = nextPath.replace('/furniture-', '')

      if (nextIdStr != undefined && nextIdStr !== categoryId) {
        categoryId = nextIdStr
        this.resetStateVars();
        this.fetchPLPProductsData();
        this.fetchSubCategoryData();
        this.fetchMarketingTextBannerData();
        this.fetchDescriptionData();
      }
    }

  }

  resetStateVars() {
    this.setState({
      plpSubCatData: null,
      marketingTextBannerData: null,
      plpDescriptionData: null,
      plpData: [],
      adBannerData: null,
      error: false,
      hasMore: true,
      isLoading: false,
      pageNumber: 1,
      pageSize: 18,
      categoryDetail: true,
      sortValue: this.props.sortingValue,
      filterData: [],
      isCatDetails: true,
      categoyDetails: null,
      productCount: null,
      plpFilter: '',
      plpSorting: '',
      isFromSearch: '',
      searchKeyword: '',
      emptySearchItem: null,
      showBestSeller: null,
      newSearchTrigger: false,
      browserFilters: [],
      spellCheckCount: 0,
    });
  }

  fetchAdBannerData() {
    var adBannerEspotName = `GI_PLP_AD_BANNER`;
    if (categoryId != undefined) {
      adBannerEspotName = `GI_PLP_AD_BANNER_${categoryId.toUpperCase()}`;
    }
    if (this.state.isFromSearch.includes('/search')) {
      adBannerEspotName = 'GI_SEARCH_RESULTS_AD_BANNER';
    }
    apiManager
      .get(`${espotAPI}${adBannerEspotName}`)
      .then(response => {
        if (response.data.data) {
          this.props.onAdBannerIndexUpdate(response.data.data);
          this.setState({ adBannerData: response.data.data });
        }
      })
      .catch(error => { });
  }

  fetchSubCategoryData() {
    apiManager
      .get(plpSubCatAPI + categoryId, {
        headers: {},
      })
      .then(response => {
        if (response.data.data) {
          this.setState({ plpSubCatData: response.data.data });
        }
      })
      .catch(error => { });
  }

  fetchMarketingTextBannerData() {
    apiManager
      .get(`${espotAPI}GI_PLP_HERO_BANNER_${categoryId.toUpperCase()}`)
      .then(response => {
        if (response.data.data) {
          this.setState({
            marketingTextBannerData: response.data.data.bannerList[0].content,
          });
        }
      })
      .catch(error => { });
  }

  fetchPLPProductsData(isFromScroll) {

    this.setState({ isLoading: true }, () => {
      let urlMaking = plpAPI + categoryId;
      let searchText = null;
      if (this.state.isFromSearch.includes('/search')) {
        const params = new URLSearchParams(this.state.searchKeyword);
        const keyword = params.get('keyword');
        searchText = encodeURIComponent(keyword);
        searchText = formateSearchKeyword(searchText, false)
        urlMaking = searchPageAPI + searchText;
      }

      let plpURL =
        `${urlMaking}?` +
        `pagenumber=${this.state.pageNumber}&` +
        `pagesize=${this.state.pageSize}&` +
        `orderby=${this.state.plpSorting}&${this.state.plpFilter}`;

      apiManager
        .get(plpURL, {
          headers: {
            cat_details: this.state.isCatDetails,
            sku_display: String(this.state.displaySkus),
          },
        })
        .then(response => {
          if (this.state.browserFilters.length !== 0) {
            this.resolveBrowserFilters(
              response.data.data.facetData,
              this.state.browserFilters,
            );
          }

          if (this.state.isFromSearch.includes('/search')) {
            if (this.state.newSearchTrigger && response.data.data.productList.length !== 0) {
              this.setState({
                emptySearchItem: null,
                showBestSeller: false,
                newSearchTrigger: false,
              });
            }
            else if (response.data.data.productList.length === 0 && this.state.plpData.length === 0) { // && condition to not show the empty search view on scroll last
              this.setState({
                showBestSeller: true,
                emptySearchItem: null,
                newSearchTrigger: false
              })
            }

            if (response.data.data.spellCheck && response.data.data.spellCheck.length !== 0 && !isFromScroll) {
              this.setState({
                emptySearchItem: this.onSearchNoResut(decodeURI(searchText), response.data.data.spellCheck),
                showBestSeller: false,
                newSearchTrigger: false,
              })
            }
          }

          if (this.state.isCatDetails) {
            if (!this.state.isFromSearch.includes('/search')) {
              const coloumnValue = response.data.data.categoryDetails.columns;
              this.props.initialValuesUpdate(coloumnValue);
              this.setState({
                categoryDetail: response.data.data.categoryDetails,
                displaySkus: response.data.data.categoryDetails.displaySkus,
              });
            }
            else {
              this.props.initialValuesUpdate(3);
            }
          }

          if (this.state.isCatDetails) {
            this.fetchAdBannerData();
          } else {
            if (this.state.isFromSearch.includes('/search')) {
              this.fetchAdBannerData();
            }
          }

          
          this.setState({
            plpData: isFromScroll ? [...this.state.plpData, ...response.data.data.productList] : response.data.data.productList,
            productCount: response.data.data.productCount,
            filterData: response.data.data.facetData,
            breadcrumbData: response.data.data.breadCrumbData,
            hasMore: this.state.plpData.length < Number(response.data.data.productCount), // Now only show on 0 Products and disable it for lazyload
            isLoading: false,
            isCatDetails: false,
            browserFilters: [],
          });
        })
        .catch(error => {
          if (this.state.isFromSearch.includes('/search')) {
            this.setState({
              showBestSeller: true,
                emptySearchItem: null,
                newSearchTrigger: false,
              isLoading: false,
              hasMore: false,
            });
          } else {
            this.setState({
              error: error.response.data.error.error_message,
              isLoading: false,
            });

          }
        });

    });
  }

  resolveBrowserFilters(filterResponse, browserFilters) {
    let finalBrowserFilter = new Map();
    for (let i = 0; i < browserFilters.length; i++) {
      var reduxFilter = [];
      var name;
      const facetValue = browserFilters[i];
      var splitFacet = facetValue.split(' '); // If more than 1 filter applied from the same Facet
      filterResponse.map((facetItem, index) => {
        facetItem.facetValues.map((innerItem, index) => {
          if (splitFacet.includes(innerItem.value.replace(/\+/g, '%2B')) /*innerItem.value === facetValue*/) {
            name = facetItem.facetName;
            innerItem.value = innerItem.value.replace(/\+/g, '%2B');
            reduxFilter.push(innerItem);
          }
        }); // innerItem ended
      }); // facetItem ended

      finalBrowserFilter.set(name, reduxFilter);
    }
    this.props.onBrowserFilterUpdate(finalBrowserFilter);
  }

  fetchDescriptionData() {
    apiManager
      .get(`${espotAPI}GI_PLP_DESCRIPTION_${categoryId.toUpperCase()}`)
      .then(response => {
        if (response.data.data.description) {
          this.setState({ plpDescriptionData: response.data.data });
        }
      })
      .catch(error => {
      });
  }

  onSearchNoResut(searchText, spellCheckArr) {
    if (spellCheckArr) {
      if (spellCheckArr && spellCheckArr.length !== 0) {
        const params = new URLSearchParams(this.props.location.search);
        var keywoard = formateSearchKeyword(params.get('keyword'), false);
        this.setState({
          searchKeyword: `keyword=${spellCheckArr[0]}`,
        });
        return (
          <div className="noResultfound">
            <div className="label-noresult">
              No results for “{keywoard}”
          </div>
            <div className="product-serchGuide">
              <div className="label-text">Did you mean: </div>
              <div className="serchlist-button">
                {spellCheckArr.map(item => (
                  <button className='searchitem-button' onClick={() => this.onSpellCheckClick(item)}>{item}</button>
                ))}
              </div>
            </div>
          </div>
        );
      } else {
        // Show Best Seller component
      }

      return (
        <div className="noResultfound">
          <div className="label-noresult">
            No results for “{formateSearchKeyword(searchText, false)}”
          </div>
          <div className="product-serchGuide">
            <div className="label-text">Did you mean: </div>
            <div className="serchlist-button">
              {spellCheckArr.map(item => (
                <button className='searchitem-button' onClick={() => this.onSpellCheckClick(item)}>{item}</button>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }

  onSpellCheckClick(spellText) {
    this.props.history.push({
      pathname: '/search',
      search: `keyword=${spellText}`,
    });
    this.setState({
      searchKeyword: `keyword=${spellText}`,
      plpData: [],
      filterData: [],
      pageNumber: 1,
    });
    this.fetchPLPProductsData();
  }

  onscroll = () => {
    const {
      state: { error, isLoading, hasMore },
    } = this;

    var scrollYindex;
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) { //Safari browser
      scrollYindex = window.innerHeight + document.body.scrollTop;
    } else if (window.navigator.userAgent.indexOf("Edge") > -1) {
      scrollYindex = window.innerHeight + window.pageYOffset;
    } else { //All other browsers
      scrollYindex = window.innerHeight + document.documentElement.scrollTop;
    }

    if (error || isLoading || !hasMore) return;
    const adjustedHeight = 1000;
    const windowHeight = scrollYindex;
    const windowOffsetHeight = document.documentElement.offsetHeight - adjustedHeight;

    if (windowHeight >= windowOffsetHeight && windowHeight - 300 <= windowOffsetHeight) {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
      this.fetchPLPProductsData(true);
    }
  };

  render() {
    const {
      error,
      hasMore,
      isLoading,
      plpData,
      marketingTextBannerData,
      plpSubCatData,
      adBannerData,
      filterData,
    } = this.state;

    let marketingBanner;
    let itemData = '';
    if (marketingTextBannerData != null) {
      marketingBanner = (
        <MarketingTextBanner bannerDataPro={marketingTextBannerData} />
      );
    }

    let subCategories;
    if (plpSubCatData != null) {
      subCategories = (
        <SubCategories subCategoryData={this.state.plpSubCatData} />
      );
    }

    let plpProducts;
    if (plpData.length != 0) {
      itemData = createPlpItemData(plpData);
      plpProducts = (
        <PlpComponent
          plpDataPro={this.state.plpData}
          adBannerDataPro={adBannerData}
          catId={this.state.categoryDetail.uniqueID}
          history={this.props.history}
          isSearchPathPro={this.props.location.pathname}
          plpBreadcrumbPro={this.state.breadcrumbData}
          showSkuPro={
            !this.state.isFromSearch.includes('/search')
              ? this.state.categoryDetail.displaySkus
              : true
          }
        />
      );
    }

    let filterItem;
    if (filterData.length != 0 && !this.state.isMobile) {
      filterItem = <FilterMain filterDataPro={filterData} />;
    }

    let sortItem;
    if (!this.state.isMobile && this.state.productCount !== null && this.state.productCount !== 0) {
      sortItem = <Sort sortingIndexPro={this.state.plpSorting} />
    }

    let descriptionItem;
    if (this.state.plpDescriptionData != null) {
      descriptionItem = (
        <DescriptionBanner
          descriptionDataPro={this.state.plpDescriptionData}
          ref={divElement => (this.divElement = divElement)}
        />
      );
    }

    let titleItem = null;
    if (this.state.categoryDetail !== null) {
      titleItem = (
        <h1 className="headingTitle">
          {this.state.categoryDetail.categoryName}
        </h1>
      );
    }
    const params = new URLSearchParams(this.state.searchKeyword);
    var keywoard = params.get('keyword');
    const paramsRoute = new URLSearchParams(this.props.location.search);
    var keywoardRoute = paramsRoute.get('keyword');
    if (this.state.isFromSearch.includes('/search') && plpData.length != 0) {
      keywoard = formateSearchKeyword(params.get('keyword'), false);
      titleItem = (
        <div className="searchresult">
          <h3 className="headingTitleFlat">
            Results for <span className="headingTitleSearch">"{keywoard}"</span>
          </h3>
        </div>
      );
    }

    let productCountItem = null;
    if (this.state.productCount !== null && plpData.length != 0 && this.state.productCount) {
      productCountItem = (
        <div className="headingSubTitle">
          ({this.state.productCount} Products)
        </div>
      );
    }

    let breadcrumbItem = null;
    if (this.state.breadcrumbData !== null && plpData.length != 0 && this.state.breadcrumbData !== undefined && this.state.breadcrumbData.length !== 0) {
      breadcrumbItem = (
        <Breadcrumb plpBreadcrumbPro={this.state.breadcrumbData} />
      );
    }
    else if (this.state.isFromSearch.includes('/search')) {
      breadcrumbItem = (
        <Breadcrumb isFromSearchPro={true} />
      );
    }

    return (
      <>
        <ContentEspot espotName={'GI_PIXEL_PLP_BODY_START' + (this.props.match.params.id ? '_' + this.props.match.params.id.toUpperCase().replace(' ', '') : '')} />
        <Helmet>
          <Pixels espotName={'GI_PIXEL_PLP_META' + (this.props.match.params.id ? '_' + this.props.match.params.id.toUpperCase().replace(' ', '') : '')} />
          <script type="application/ld+json" nonce="383143991673915569" id="jsonLD">
            {`[{"@context":"http://schema.org","@type":"ItemList","itemListElement":${JSON.stringify(itemData)}}]`}
          </script>

          <title>{this.state.isFromSearch.includes('/search') ? 'Experience our products first hand at your nearest Godrej Interio store' : this.state.categoryDetail.pageTitle}</title>
          <meta name="description" content={this.state.categoryDetail.metaDescription} />
          <meta name="keywords" content={this.state.categoryDetail.categoryName + ' ' + this.state.categoryDetail.shortDescription} />
        </Helmet>
        {marketingBanner}
        {breadcrumbItem}
        {subCategories}
        {this.state.emptySearchItem !== null
          ? this.state.emptySearchItem
          : null}
        {this.state.showBestSeller ? (
          <>
            <div>
              <div className="noResultfound">
                <div className="label-noresult">
                  No results for “{formateSearchKeyword(keywoardRoute, false)}”
              </div>
              </div>
              <div className="Search-bestseller container">
                <BestSeller />
              </div>
            </div>
          </>
        ) : null}
        <section className="plpCategories">
          <div className="container">
            <div className="row">
              {titleItem}
              {productCountItem}
            </div>
            <div className="row no-padding">
              <div className="filterWrapper clearfix">
                <div className="filter">{filterItem}</div>
                <div className="sort">
                  {sortItem}
                </div>
              </div>
            </div>
          </div>
          <div className="container2">{plpProducts}</div>
        </section>

        {error && <div className='noProductFound'>{error}</div>}
        {isLoading && (
          <div className="lazyloading-Indicator">
            <img
              id="me"
              className="loadingImg"
              alt='Lazy Loader'
              src={require('../../../public/images/plpAssests/lazyloadingIndicator.svg')
              }
            />
          </div>
        )}

        {this.state.productCount === 0 &&
          !this.state.isFromSearch.includes('/search') ? (
            <div className="noProductFound">No Products Found</div>
          ) : null}

        {descriptionItem}
        <CompContainer />



        {this.state.isMobile && this.state.productCount !== null && this.state.productCount !== 0 ?
          <div className='sortfilter'>
            <RWDSort sortingIndexPro={this.state.plpSorting} />
            <RWDFilterMain
              filterDataPro={filterData}
              isSKUPro={this.state.displaySkus}
              categoryIdPro={this.state.categoryDetail.uniqueID}
              isSearchPathPro={this.props.location.pathname}
              searchKeywordPro={keywoard}
            />
          </div> : null}
        <ContentEspot espotName={'GI_PIXEL_PLP_BODY_END' + (this.props.match.params.id ? '_' + this.props.match.params.id.toUpperCase().replace(' ', '') : '')} />

      </>
    );
  }
}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {
    ctr: stateObj.counter,
    updatedFilter: resolveTheFilter(stateObj.updateFilter),
    sortingValue: stateObj.sortingValue,
    reduxTrigger: true,
  };
};

const mapDispatchToProps = dispatch => ({
  initialValuesUpdate: coloumn => dispatch(actionCreators.updateInitialValues(coloumn)),
  onIncrementCounter: () => dispatch(actionCreators.increment()),
  onAdBannerIndexUpdate: adBannerData =>
    dispatch(actionCreators.adBannerDataAction(adBannerData)),
  plpReduxStateReset: () => dispatch(actionCreators.resetPLPReduxState()),
  onFilterUpdate: (updatedArr, facetName) =>
    dispatch(actionCreators.filter(updatedArr, facetName)),
  onBrowserFilterUpdate: browserFilter =>
    dispatch(actionCreators.browserFilter(browserFilter)),
  removeAll: () => dispatch(actionCreators.RemoveAll()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'plpContainer', reducer });
const withSaga = injectSaga({ key: 'plpContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PlpContainer);
