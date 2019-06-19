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
  storeId,
  accessToken,
} from '../../../public/constants/constants';

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
      //Search Vars
      isFromSearch: this.props.location.pathname,
      searchKeyword: this.props.location.search,
      emptySearchItem: null,
      showBestSeller: null,
      newSearchTrigger: false,
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
    if (idStr != undefined && idStr !== categoryId) {
      categoryId = idStr;
      // this.setState({
      // 	filterData: [],
      // 	plpData: [],
      // 	isCatDetails: true,
      // })
      // this.fetchPLPProductsData();
    }

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

    if (nextProps.sortingValue !== this.props.sortingValue) {
      console.log('In the Sorrting');
      this.setState({
        plpData: [],
        pageNumber: 1,
      });
      this.fetchPLPProductsData();
    }
    if (nextProps.updatedFilter !== this.props.updatedFilter) {
      console.log('In the Filter');
      console.log('Filter Changed ---- ', nextProps.updatedFilter);
      this.setState({
        plpData: [],
        filterData: [],
        pageNumber: 1,
      });
      this.fetchPLPProductsData();
    }

    console.log('will Recive in the search --- ', nextProps.location.search, this.props.location.search)
    if (nextProps.location.pathname.includes('/search')) {
      if (nextProps.location.search !== this.props.location.search) {
        this.setState({
          plpData: [],
          filterData: [],
          pageNumber: 1,
          isFromSearch: nextProps.location.pathname,
          searchKeyword: nextProps.location.search,
          showBestSeller: false,
          newSearchTrigger: true,
        });
        this.fetchPLPProductsData();
      }

    }

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

  fetchPLPProductsData() {
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
        `orderby=${this.props.sortingValue}&${this.props.updatedFilter}`;
      console.log('PLPURL---', plpURL);

      apiManager
        .get(plpURL, {
          headers: {
            cat_details: this.state.isCatDetails,
          },
        })
        .then(response => {
          console.log('PLP Response----', response.data);

          if (this.state.isFromSearch.includes('/search')) {
            if (this.state.newSearchTrigger && response.data.data.productList.length !== 0) {
              this.setState({
                emptySearchItem: null,
                showBestSeller: false,
                newSearchTrigger: false
              })
            }
            else {
              if (response.data.data.spellCheck) {
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
            this.setState({
              categoryDetail: response.data.data.categoryDetails,
            });
          }

          this.setState({
            plpData: [...this.state.plpData, ...response.data.data.productList],
            productCount: response.data.data.productCount,
            hasMore:
              this.state.plpData.length <
              Number(response.data.data.productCount),
            filterData: response.data.data.facetData,
            isLoading: false,
            isCatDetails: false,
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
      this.fetchPLPProductsData();
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
          />
        );
    }

    let filterItem;
    if (filterData.length != 0) {
      // filterData.push(filterData[0])
      // filterData.push(filterData[1])
      // filterData.push(filterData[2])
      // filterData.push(filterData[3])
      // console.log('FilterData---', filterData);

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
           <h3 className="headingTitleFlat">Resulst for <span className='headingTitleSearch'>{keywoard}</span></h3>
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
                  {plpData.length === 0 ? null : <Sort />}
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
