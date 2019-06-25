/**
 *
 * PlpContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
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
} from '../../utils/utilityManager';
import '../../../public/styles/plpContainer/plpContainer.scss';

import SubCategories from '../../components/GlobalComponents/productSubcategories/subCategories';
// import ProductItem from '../../components/GlobalComponents/productItem/productItem';
import FilterMain from '../../components/PlpComponent/Filter/filterMain';
import MarketingTextBanner from '../../components/PlpComponent/MarketingeTextBanner/marketingTextBanner';
import DescriptionBanner from '../../components/PlpComponent/DescriptionBanner/descriptionBanner';
import Sort from '../../components/PlpComponent/Sorting/sort';
import BestSeller from '../../components/BestSelling/bestSelling';

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

let categoryId;
export class PlpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plpSubCatData: null,
      marketingTextBannerData: null,
      plpDescriptionData: null,
      plpData: [],
      adBannerData: [],
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
      //Search Vars
      isFromSearch: this.props.location.pathname,
      searchKeyword: this.props.location.search,
      emptySearchItem: null,
      showBestSeller: null,
      newSearchTrigger: false,
      //Browser Routing Vars
      browserFilters: [],
    };
    this.myRef = React.createRef();
    this.onscroll = this.onscroll.bind(this);
    this.onSearchNoResut = this.onSearchNoResut.bind(this);
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.onscroll);
  }

  componentDidMount() {
    console.log('Query String Routing ------- ', this.state.searchKeyword);
    const path = String(this.props.location.pathname);
    const idStr = path.split('/')[2];
    console.log('catIDD --- ', idStr)
    if (idStr != undefined && idStr !== categoryId) {
      categoryId = idStr;
      // this.setState({
      // 	filterData: [],
      // 	plpData: [],
      // 	isCatDetails: true,
      // })
      // this.fetchPLPProductsData();
    }

    const params = new URLSearchParams(this.props.location.search);
    const foo = params.get('sort'); // bar
    const filterAtt = params.get('filter'); // bar
    var filterRoutingURL = '';
    var sortingRoutingURL = '';
    var onlyFilter = [];
    for (let p of params) {
      console.log('Tick', decodeURI(p[1]))
      if (p[0] === 'filter') {
        // filterRoutingURL += `${p[0]}=${p[1]}&`
        filterRoutingURL += `${p[1]}&`
        onlyFilter[p[1]];
      }
      else if (p[0] === 'sort') {
        sortingRoutingURL = p[1];
      }
    }
    filterRoutingURL = filterRoutingURL.replace(' ', '+')
    console.log('URL Routing --- ', filterRoutingURL);
    console.log('URL Sorting --- ', sortingRoutingURL);
    console.log([...params.keys()])
    console.log([...params.values()])
    console.log('Browser Filters --- ', [...params.entries()])
    console.log('Search Parma --- ', filterAtt, onlyFilter);
    const vingg = new URLSearchParams(filterAtt);
    console.log('Search mixxxx --- ', vingg.getAll('facet'));

    this.setState({
      plpFilter: filterRoutingURL,
      plpSorting: sortingRoutingURL,
      browserFilters: vingg.getAll('facet'),
    })


    addEventListener('scroll', this.onscroll);
    this.fetchPLPProductsData();
    if (!this.state.isFromSearch.includes('/search')) {
      this.fetchSubCategoryData();
      this.fetchMarketingTextBannerData();
      this.fetchDescriptionData();
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', nextProps.location.pathname, this.props.location.pathname);
    // if (nextProps.location.pathname !== this.props.location.pathname) {
    // console.log('In the locationpath');
    // this.setState({
    //   isFromSearch: nextProps.location.pathname,
    //   searchKeyword: nextProps.location.search,
    // })

    //this.state.isFromSearch = nextProps.location.pathname;
    console.log('Query String Routing Recive Props ------- ', nextProps);
    const path = String(nextProps.location.pathname);
    const idStr = path.split('/')[2];
    if (idStr != undefined && idStr !== categoryId) {
      // this.props.plpReduxStateReset();
      // categoryId = idStr;
      // this.setState({
      // 	pageNumber: 1,
      // 	filterData: [],
      // 	plpData: [],
      // 	isCatDetails: true,
      // })
      // this.fetchSubCategoryData();
      // this.fetchPLPProductsData();
    }

    // const path = String(nextProps.location.pathname);
    // const idStr = path.split('/')[2];
    // if (idStr != undefined && idStr !== categoryId) {
    // this.props.plpReduxStateReset();
    // categoryId = idStr;
    // this.setState({
    // 	pageNumber: 1,
    // 	filterData: [],
    // 	plpData: [],
    // 	isCatDetails: true,
    // })
    // this.fetchSubCategoryData();
    // this.fetchPLPProductsData();
    //}

    // }
    // else {
    // 	this.props.history.push('/cat')
    // }

    var params = new URLSearchParams(this.props.location.search);
    if (nextProps.sortingValue !== this.props.sortingValue) {
      console.log('In the Sorrting');
      var sortingAppend = params += `&sort=${nextProps.sortingValue}`

      var params1 = new URLSearchParams(this.props.location.search);
      // var alreadySelectedFilter;
      // if (params1.has('facet')) {
      //   params1.delete('sort')
      //   alreadySelectedFilter = params

      //   console.log('alreaddddd -- ',alreadySelectedFilter);
      // }


      params1.set(`sort`, `${nextProps.sortingValue}`)
      var finalMap = params1.toString()
      this.props.history.push({ /*pathname: '/search',*/ search: finalMap })
      this.setState({
        plpData: [],
        pageNumber: 1,
        plpSorting: nextProps.sortingValue
      });
      this.fetchPLPProductsData();
    }
    if (nextProps.updatedFilter !== this.props.updatedFilter) {
      console.log('In the Filter');
      console.log('Filter Changed ---- ', nextProps.updatedFilter);


      var filterAppend = `&${encodeURI(nextProps.updatedFilter)}`
      var params2 = new URLSearchParams(this.props.location.search);
      // if (params2.has('sort')) {
      //   console.log('has The Sort --- ',params2.get('sort'))
      //   // params2.set(`sort`, `${params2.get('sort')}`)
      //   filterAppend += `&sort=${params2.get('sort')}`

      //   params2.set(`sort`, `${params2.get('sort')}`)

      // }

      if (nextProps.updatedFilter === '') {
        params2.delete('filter');
      }
      else {
        params2.set(`filter`, `${encodeURI(nextProps.updatedFilter)}`)
      }


      this.props.history.push({ /*pathname: '/search',*/ search: params2.toString()/*`${filterAppend}`*/ })
      this.setState({
        plpData: [],
        filterData: [],
        pageNumber: 1,
        plpFilter: nextProps.updatedFilter
      });
      this.fetchPLPProductsData();
    }



    if (nextProps.location.pathname.includes('/search')) {
      if (nextProps.location.search !== this.props.location.search) { //If New search entered 
        console.log('Seeeeeee', nextProps.location.search);
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
      }
      else {
        console.log('Seeeee 33322222',nextProps.location.search, this.props.search);
        // Should be on same page
        //
        //this.props.plpReduxStateReset();
      }
    }
    else {
      if (nextProps.location.pathname !== this.props.location.pathname) {
        const nextPath = String(nextProps.location.pathname);
        const nextIdStr = nextPath.split('/')[2];

        // const thisPath = String(this.props.location.pathname);
        // const thisIdStr = thisPath.split('/')[2];

        //if (nextIdStr !== thisIdStr) {
        console.log('mimimimi --- ', nextIdStr)
        if (nextIdStr != undefined && nextIdStr !== categoryId) {
          categoryId = nextIdStr
          this.resetStateVars();
          this.fetchPLPProductsData();
          this.fetchSubCategoryData();
          this.fetchMarketingTextBannerData();
          this.fetchDescriptionData();
        }
        // }
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
      adBannerData: [],
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('PLP---- componentDidUpdate PrevProps--', prevProps + 'This Props', this.props);
    if (prevProps.specificProperty !== this.props.specificProperty) {
      // Do whatever you want
    }
  }

  fetchAdBannerData() {
    apiManager
      .get(`${espotAPI}GI_Plp_Sample_AD_Banner`)
      .then(response => {
        console.log('Adbanerrrr -- ', response.data)
        this.props.onAdBannerIndexUpdate(response.data.data);
        this.setState({ adBannerData: response.data.data });
      })
      .catch(error => { });
  }

  fetchSubCategoryData() {

    apiManager
      .get(plpSubCatAPI + categoryId, {
        headers: {},
      })
      .then(response => {
        console.log('Subcat Data', response.data);
        this.setState({ plpSubCatData: response.data.data });
      })
      .catch(error => { });
  }

  fetchMarketingTextBannerData() {
    apiManager
      .get(`${espotAPI}GI_Plp_Sample_Hero_Banner`)
      .then(response => {
        this.setState({
          marketingTextBannerData: response.data.data.bannerList[0].content,
        });
      })
      .catch(error => { });
  }

  fetchPLPProductsData(isFromScroll) {
    this.setState({ isLoading: true }, () => {
      /**
       * TODO: Category ID is static from Node side.
       */
      var urlMaking = plpAPI + categoryId;
      var searchText = null;
      if (this.state.isFromSearch.includes('/search')) {
        const params = new URLSearchParams(this.state.searchKeyword);
        const keywoard = params.get('keyword');
        searchText = keywoard;
        urlMaking = searchPageAPI + keywoard;
      }

      var plpURL =
        `${urlMaking}?` +
        `pagenumber=${this.state.pageNumber}&` +
        `pagesize=${this.state.pageSize}&` +
        `orderby=${this.state.plpSorting}&${this.state.plpFilter}`;
      console.log('PLPURL---', plpURL);

      apiManager
        .get(plpURL, {
          headers: {
            cat_details: this.state.isCatDetails,
            sku_display: String(this.state.displaySkus)
          },
        })
        .then(response => {
          console.log('PLP Response----', response.data);

          console.log('bigbgg -- ', this.state.browserFilters);
          if (this.state.browserFilters.length !== 0) {
            this.resolveBrowserFilters(response.data.data.facetData, this.state.browserFilters);
          }

          if (this.state.isFromSearch.includes('/search')) {
            if (this.state.newSearchTrigger && response.data.data.productList.length !== 0) {
              this.setState({
                emptySearchItem: null,
                showBestSeller: false,
                newSearchTrigger: false
              })
            }
            else {
              if (response.data.data.spellCheck.length !== 0) {
                console.log('spell checkkk --- ',response.data.data.spellCheck)
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


          }

          if (this.state.isCatDetails && !this.state.isFromSearch.includes('/search')) {
            this.fetchAdBannerData();
            const coloumnValue = response.data.data.categoryDetails.columns;
            this.props.initialValuesUpdate(coloumnValue);
            console.log('disssss --- ',response.data.data.categoryDetails.displaySkus)
            this.setState({
              categoryDetail: response.data.data.categoryDetails,
              displaySkus: response.data.data.categoryDetails.displaySkus,
            });
          }

          this.setState({
            plpData: isFromScroll ? [...this.state.plpData, ...response.data.data.productList] : response.data.data.productList,
            productCount: response.data.data.productCount,
            hasMore:
              this.state.plpData.length <
              Number(response.data.data.productCount),
            filterData: response.data.data.facetData,
            isLoading: false,
            isCatDetails: false,
            browserFilters: [],
          });


        })
        .catch(error => {
          this.setState({
            error: error.message,
            isLoading: false,
          });
        });
    });
  }

  resolveBrowserFilters(filterResponse, browserFilters) {

    var finalBrowserFilter = new Map();
    for (let i = 0; i < browserFilters.length; i++) {
      // if (browserFilters[i][0] === 'facet') {
      var reduxFilter = []
      var name;
      console.log('Twink --- ', browserFilters[i]);
      const facetValue = browserFilters[i]
      var splitFacet = facetValue.split(' ') //If more than 1 filter applied from the same Facet
      console.log('misss === ', splitFacet);
      filterResponse.map((facetItem, index) => {
        console.log('browser Filter Item -- ', facetItem)

        facetItem.facetValues.map((innerItem, index) => {
          console.log('browser Filter Item innerr -- ', innerItem)
          if (splitFacet.includes(innerItem.value.replace('+', '%2B')) /*innerItem.value === facetValue*/) {
            name = facetItem.facetName
            console.log('its Matched --- ', facetValue);
            innerItem.value = innerItem.value.replace('+', '%2B')
            reduxFilter.push(innerItem);
          }
        }) //innerItem ended
      }) //facetItem ended

      finalBrowserFilter.set(name, reduxFilter);
      // }
    }

    console.log('masterrr --- ', finalBrowserFilter)
    this.props.onBrowserFilterUpdate(finalBrowserFilter)

  }

  fetchDescriptionData() {
    apiManager
      .get(`${espotAPI}GI_Plp_Description`)
      .then(response => {
        // console.log('DescriptionsData---', response.data.data.GI_PLP_Sample_Description_Content);
        this.setState(
          { plpDescriptionData: response.data.data },
          console.log('@@@@@Read More@@@@', response.data.data),
        );
      })
      .catch(error => {
        // console.log('PLPBannerrror---', error);s
      });
  }

  onSearchNoResut(searchText, spellCheckArr) {
    console.log('ddddd -- ', spellCheckArr);
    if (spellCheckArr) {
      if (spellCheckArr && spellCheckArr.length !== 0) {
        this.setState({
          searchKeyword: `keyword=${spellCheckArr[0]}`,
        })
        this.fetchPLPProductsData();
      }
      else {
        //Show Best Seller component
      }

      return (
        <div className='noResultfound'>
          <div className='label-noresult'>No results found for “{searchText}”</div>
          <div className='product-serchGuide'>
            <div className='label-text'>Did you mean: </div>
            <div className='serchlist-button'>
              {spellCheckArr.map(item => {
                return (
                  <button className='searchitem-button' onClick={() => this.onSpellCheckClick(item)}>{item}</button>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

  }

  onSpellCheckClick(spellText) {
    this.props.history.push({ pathname: '/search', search: `keyword=${spellText}` })
    this.setState({
      searchKeyword: `keyword=${spellText}`,
      plpData: [],
      filterData: [],
      pageNumber: 1,
    })
    this.fetchPLPProductsData();
  }

  onscroll = () => {
    const {
      state: { error, isLoading, hasMore },
    } = this;

    if (error || isLoading || !hasMore) return;
    const adjustedHeight = 600;
    const windowHeight =
      window.innerHeight + document.documentElement.scrollTop;
    const windowOffsetHeight =
      document.documentElement.offsetHeight - adjustedHeight;

    if (
      windowHeight >= windowOffsetHeight &&
      windowHeight - 300 <= windowOffsetHeight
    ) {
      console.log('Its the End');
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
      console.log('the subc Ategor ---', plpSubCatData);
      subCategories = (
        <SubCategories subCategoryData={this.state.plpSubCatData} />
      );
    }

    let plpProducts;
    if (plpData.length != 0) {
      if (adBannerData.length != 0 || this.state.isFromSearch.includes('/search'))
        plpProducts = (
          <PlpComponent
            plpDataPro={this.state.plpData}
            adBannerDataPro={adBannerData}
            catId={this.state.categoryDetail.uniqueID}
            history={this.props.history}
            isSearchPathPro={this.props.location.pathname}
            showSkuPro={!this.state.isFromSearch.includes('/search') ? this.state.categoryDetail.displaySkus : true}
          />
        );
    }

    let filterItem;
    if (filterData.length != 0) {
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
        <h3 className="headingTitle">
          {this.state.categoryDetail.categoryName}
        </h3>
      );
    }
    const params = new URLSearchParams(this.state.searchKeyword);
    const keywoard = params.get('keyword');
    if (this.state.isFromSearch.includes('/search') && plpData.length != 0) {
      titleItem = (
        <div className='searchresult'>
          <h3 className="headingTitleFlat">Results for <span className='headingTitleSearch'>{keywoard}</span></h3>
        </div>

      );
    }

    let productCountItem = null;
    if (this.state.productCount !== null && plpData.length != 0) {
      productCountItem = (
        <div className="headingSubTitle">
          (Produts {this.state.productCount})
        </div>
      );
    }

    return (

      <>
        {this.state.emptySearchItem !== null ? this.state.emptySearchItem : null}
        {this.state.showBestSeller ? <><div>

          <div className='noResultfound'>
            <div className='label-noresult'>
              No results found for “{keywoard}”
            </div>
          </div>
          <div className='Search-bestseller container'>
            <BestSeller />
          </div>
        </div></> : null}
        {marketingBanner}
        {subCategories}
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
                  {plpData.length === 0 ? null : <Sort sortingIndexPro={this.state.plpSorting} />}
                </div>
              </div>
            </div>
          </div>
          <div className="container2">{plpProducts}</div>
        </section>

        {error && <div style={{ color: '#900' }}>{error}</div>}
        {isLoading && (
          <div className="lazyloading-Indicator">
            <img
              id="me"
              className="loadingImg"
              src={require('../../../public/images/plpAssests/lazyloadingIndicator.svg')}
            />
          </div>
        )}
        {!hasMore && !this.state.isFromSearch.includes('/search') ? <div className="noProductFound">No Products Found</div> : null}
        {descriptionItem}
        <CompContainer />
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
  initialValuesUpdate: coloumn =>
    dispatch(actionCreators.updateInitialValues(coloumn)),
  onIncrementCounter: () => dispatch(actionCreators.increment()),
  onAdBannerIndexUpdate: adBannerData =>
    dispatch(actionCreators.adBannerDataAction(adBannerData)),
  plpReduxStateReset: () => dispatch(actionCreators.resetPLPReduxState()),
  onFilterUpdate: (updatedArr, facetName) => dispatch(actionCreators.filter(updatedArr, facetName)),
  onBrowserFilterUpdate: (browserFilter) => dispatch(actionCreators.browserFilter(browserFilter)),
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
