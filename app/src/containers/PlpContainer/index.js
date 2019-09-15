/**
 *
 * PlpContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
// import makeSelectPlpContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import PlpComponent from '../../components/PlpComponent/index';
import {
  getReleventReduxState,
  resolveTheFilter,
  resolveBrowserFilters,
  formateSearchKeyword,
} from '../../utils/utilityManager';
import '../../../public/styles/plpContainer/plpContainer.scss';

import SubCategories from '../../components/GlobalComponents/productSubcategories/subCategories';
import FilterMain from '../../components/PlpComponent/Filter/filterMain';
import MarketingTextBanner from '../../components/PlpComponent/MarketingeTextBanner/marketingTextBanner';
import DescriptionBanner from '../../components/PlpComponent/DescriptionBanner/descriptionBanner';
import Sort from '../../components/PlpComponent/Sorting/sort';
import BestSeller from '../../components/BestSelling/bestSelling';
import {Helmet} from "react-helmet";

import * as actionCreators from './actions';
import CompContainer from './compWidget';
import apiManager from '../../utils/apiManager';
import {
  plpSubCatAPI,
  plpAPI,
  espotAPI,
  searchPageAPI,
} from '../../../public/constants/constants';
import { stringify } from 'querystring';
import RWDSort from '../../components/PlpComponent/RWD PLP Components/RWDSort';
import RWDFilterMain from '../../components/PlpComponent/RWD PLP Components/RWDFilter/RWDFilterMain';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import ContentEspot from '../../components/Primitives/staticContent';

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
    removeEventListener('scroll', this.onscroll);
  }

  componentDidMount() {
    const path = String(this.props.location.pathname);
    const idStr = path.split('/')[2];
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
        // filterRoutingURL += `${p[0]}=${p[1]}&`
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
      this.props.history.push({ /* pathname: '/search', */ search: finalMap });
      this.setState({
        plpData: [],
        pageNumber: 1,
        plpSorting: nextProps.sortingValue,
      });
      this.fetchPLPProductsData();
    }
    if (nextProps.updatedFilter !== this.props.updatedFilter) {
      let params2 = new URLSearchParams(this.props.location.search);
      if (nextProps.updatedFilter === '') {
        params2.delete('filter');
      } else {
        params2.set(`filter`, `${encodeURI(nextProps.updatedFilter)}`);
      }
      this.props.history.push({
        /*pathname: '/search',*/ search: params2.toString() /*`${filterAppend}`*/,
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
      if (nextProps.location.search !== this.props.location.search) {
        //If New search entered
        this.setState({
          marketingTextBannerData: null,
          plpSubCatData: null,
          plpData: [],
          filterData: [],
          pageNumber: 1,
          plpDescriptionData: null,
          categoryDetail: true,
          isFromSearch: nextProps.location.pathname,
          searchKeyword: nextProps.location.search,
          showBestSeller: false,
          newSearchTrigger: true,
        });
        this.fetchPLPProductsData();
      } else {
      }
    } else if (nextProps.location.pathname !== this.props.location.pathname) {
      const nextPath = String(nextProps.location.pathname);
      const nextIdStr = nextPath.split('/')[2];

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
    // this.props.plpReduxStateReset();
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
    });
  }

  fetchAdBannerData() {
    var adBannerEspotName = `GI_PLP_AD_BANNER_${categoryId}`;
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
      .get(`${espotAPI}GI_PLP_HERO_BANNER_${categoryId}`)
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
        const keywoard = params.get('keyword');
        searchText = formateSearchKeyword(keywoard, false);
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
            if (
              this.state.newSearchTrigger &&
              response.data.data.productList.length !== 0
            ) {
              this.setState({
                emptySearchItem: null,
                showBestSeller: false,
                newSearchTrigger: false,
              });
            } else if (response.data.data.spellCheck.length !== 0) {
              this.setState({
                emptySearchItem: this.onSearchNoResut(searchText, response.data.data.spellCheck),
                showBestSeller: false,
                newSearchTrigger: false,
              })
            }
            else if (response.data.data.productList.length === 0 && this.state.plpData.length === 0) { // && condition to not show the empty search view on scroll last
              this.setState({
                showBestSeller: true,
                emptySearchItem: null,
                newSearchTrigger: false
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
          }else {
			  if(this.state.isFromSearch.includes('/search'))
			  {
				this.fetchAdBannerData();
			  }
		  }
		  
          
          this.setState({
            plpData: isFromScroll ? [...this.state.plpData, ...response.data.data.productList] : response.data.data.productList,
            productCount: response.data.data.productCount,
            filterData: response.data.data.facetData,
            breadcrumbData: response.data.data.breadCrumbData,
            isLoading: false,
            isCatDetails: false,
            browserFilters: [],
          });
        })
        .catch(error => {
          this.setState({
            error: error.response.data.error.error_message,
            isLoading: false,
          });
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
      .get(`${espotAPI}GI_PLP_DESCRIPTION_${categoryId}`)
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
        this.setState({
          searchKeyword: `keyword=${spellCheckArr[0]}`,
        });
        this.fetchPLPProductsData();
      } else {
        // Show Best Seller component
      }

      return (
        <div className="noResultfound">
          <div className="label-noresult">
            No results for “{searchText}”
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
    
    if (error || isLoading || !hasMore) return;
    const adjustedHeight = 1000;
    const windowHeight =
      window.innerHeight + document.documentElement.scrollTop;
    const windowOffsetHeight =
      document.documentElement.offsetHeight - adjustedHeight;

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
    if (marketingTextBannerData != null) {
      /**
       * TODO: "GI_HERO_BANNER_10001_CONTENT" this is static key, needs to correct from Node side
       */
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
    if (this.state.productCount !== null && plpData.length != 0) {
      productCountItem = (
        <div className="headingSubTitle">
          ({this.state.productCount} Products)
        </div>
      );
    }

    let breadcrumbItem = null;
    if (this.state.breadcrumbData !== null && plpData.length != 0 && this.state.breadcrumbData!== undefined && this.state.breadcrumbData.length !== 0) {
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
        <ContentEspot espotName={ 'GI_PIXEL_PLP_BODY_START' } />
        <Helmet>
					<ContentEspot espotName= {'GI_PIXEL_PLP_META'}/>
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
                No results for “{keywoard}”
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
                  {plpData.length === 0 || this.state.isMobile ? null : (
                  <Sort sortingIndexPro={this.state.plpSorting} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="container2">{plpProducts}</div>
        </section>

        {error && <div className='noProductFound'>{error}</div>}
        {isLoading && (
        <div className="lazyloading-Indicator">
          <img id="me" className="loadingImg" alt='Lazy Loader'
            src={require('../../../public/images/plpAssests/lazyloadingIndicator.svg') } />
        </div>
        )}
     
        {this.state.productCount === 0 &&
        !this.state.isFromSearch.includes('/search') ? (
        <div className="noProductFound">No Products Found</div>
        ) : null}

        {descriptionItem}
        <CompContainer />



        {this.state.isMobile && plpData.length !== 0 ? <div className='sortfilter'>
          <RWDSort sortingIndexPro={this.state.plpSorting} />
          <RWDFilterMain filterDataPro={filterData} />

        </div> : null}
        <ContentEspot espotName={ 'GI_PIXEL_PLP_BODY_END' } />

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
