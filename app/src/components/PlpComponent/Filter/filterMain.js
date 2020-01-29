import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import { getReleventReduxState, resolveTheFilter, isMobile } from '../../../utils/utilityManager';
import crossIcon from '../../../../public/images/closeplpFilter.svg';
import Filter from './filter';
import apiManager from '../../../utils/apiManager';
import {
  plpFilterAPI,
  searchFilterAPI
} from '../../../../public/constants/constants';

class FilterMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterItem: null,
      allFilters: [],
      splitFilters: [],
      selectedFilters: null,
      filterBtnTitle: null,
      appliedFilters: [],
      filterData: this.props.filterDataPro,
      isFilterExpend: false,
      isMobile: window.innerWidth <= 760,
      nextProps: null,
      thisProps: this.props.rwdUpdatedFilter,
      currentFacetSelection: null, /* this.props.filterDataPro.length !== 0 ? this.props.filterDataPro[0].facetName : null, */
      showLoader: false,
    };
    this.clearTheSelectedFilter = this.clearTheSelectedFilter.bind(this)
    this.moreFilterBtnClick = this.moreFilterBtnClick.bind(this)
  }

  updateOnFacetChange(callback) {
    if (this.state.nextProps !== this.state.thisProps && this.state.nextProps !== null) {

      let filterURLMaking = plpFilterAPI + this.props.categoryIdPro;
      let searchText = null;
      if (this.props.isSearchPathPro.includes('/search')) {
        const keyword = this.props.searchKeywordPro;
        searchText = encodeURIComponent(keyword).replace(/%2F/g, ' ');
        filterURLMaking = searchFilterAPI + searchText;
      }
      let plpURL = `${filterURLMaking}?` + `${this.props.rwdUpdatedFilter}`;
    
      this.setState({
        showLoader: true
      })
      apiManager
        .get(plpURL, {
          headers: {
            sku_display: String(this.props.isSKUPro),
          },
        })
        .then(response => {
          this.setState({
            showLoader: false
          })
          if (response.data.data.facetData && response.data.data.facetData.length !== 0) {
            const updateItem = response.data.data.facetData.map((item, index) => {
              return (
                <Filter
                  currentFacetPro={this.state.currentFacetSelection}
                  updateCurrentFacetSelection={this.getCurrentFacetSelection.bind(this)}
                  onFacetChangePro={this.updateOnFacetChange.bind(this)}
                  fetchCurrentFacetSelection={this.fetchCurrentFacetSelection.bind(this)}
                  rwdFilterCallbackPro={this.props.rwdFilterCallback}
                  isFromRWD={this.props.isFromRWD}
                  key={index}
                  dataPro={item}
                  indexPro={index}
                />
              )
            })
            this.setState({
              filterData: response.data.data.facetData,
              filterItem: updateItem,
            });
            this.state.thisProps = this.props.rwdUpdatedFilter;
            callback(null, 'success');
          }
        })
        .catch(error => {
          this.setState({
            showLoader: false
          })
          callback('err');
        });
    }
  }

  getCurrentFacetSelection(currentFacet) {

    this.state.currentFacetSelection = currentFacet;
  }
  fetchCurrentFacetSelection()
  {
      return this.state.currentFacetSelection;
  }


  componentWillReceiveProps(nextProps) {
    this.state.nextProps = nextProps.rwdUpdatedFilter;
  }

  componentDidMount() {
    if (this.state.filterData) {
      const allItems = this.state.filterData.map((item, index) => {
        //if(index==0)
          //this.state.currentFacetSelection = item.facetName;
        return (
          <Filter
            currentFacetPro={this.state.currentFacetSelection}
            updateCurrentFacetSelection={this.getCurrentFacetSelection.bind(this)}
            fetchCurrentFacetSelection={this.fetchCurrentFacetSelection.bind(this)}
            onFacetChangePro={this.updateOnFacetChange.bind(this)}
            rwdFilterCallbackPro={this.props.rwdFilterCallback}
            isFromRWD={this.props.isFromRWD}
            key={index}
            dataPro={item}
            indexPro={index} />
        )
      })

      var splitItems = [];
      var leftOverFilterCount;
      if (this.state.filterData.length > 4) {
        splitItems = allItems.slice(0, 4);
        leftOverFilterCount = `+ ${allItems.length - splitItems.length} Filters`

      }
      else {
        splitItems = allItems;
      }

      this.setState({
        allFilters: allItems,
        splitFilters: splitItems,
        filterItem: this.props.isFromRWD ? allItems : splitItems,
        filterBtnTitle: leftOverFilterCount
      });
    }
    this.fetchAllAppliedFilters();
  }

  moreFilterBtnClick() {
    var ssss = this.state.filterBtnTitle
    var data;
    if (this.state.isFilterExpend) {
      ssss = `+ ${this.state.allFilters.length - this.state.splitFilters.length} Filters`   //'+ ' + this.state.allFilters.length - this.state.splitFilters.length + ' Filters';
      data = this.state.splitFilters
    }
    else {
      ssss = '- Fewer filters';
      data = this.state.allFilters
    }

    this.setState({
      filterItem: data,
      filterBtnTitle: ssss,
      isFilterExpend: !this.state.isFilterExpend,
    });
  }

  fetchAllAppliedFilters() {
    var appliedFilltersArr = [];
    for (const [key, value] of this.props.updatedFilter) {
      value.map((option, i) => 
      {

            let isThere=false;
            for(const item of this.props.filterDataPro)
            {
              const isFound = item.facetValues.filter((e)=>e.label===option.label);
              if(isFound.length > 0)
                isThere =true;
            }
            if(isThere===true)
                appliedFilltersArr.push(option);
              
            else 
            {
              this.clearTheSelectedFilterValue(option.value)
            }

        
      })
    }

    const item = appliedFilltersArr.map((data, i) => 
    {



      return (
        <button className='filterSelection_btn'>{data.label}<span className='filterSelection_oval' onClick={evt => this.clearTheSelectedFilter(i)}>
          <img className='crossImg' src={crossIcon} alt="Close" /></span></button>
      )
    })
    this.setState({
      selectedFilters: item,
      appliedFilters: appliedFilltersArr
    });
  }

  clearTheSelectedFilter(index) {

    var selectionFacetValue = this.state.appliedFilters[index].value;
    var selectedFacetName;
    var selectedFacetValuesArr = [];
    for (const [key, value] of this.props.updatedFilter) {
      var items = [];
      var facetItems = []
      value.map((option, i) => {
        items.push(option.value);
        facetItems.push(option);
      })

      if (items.includes(selectionFacetValue)) {
        selectedFacetName = key;
        items.filter(function (value, i, arr) {
          if (value != selectionFacetValue) {
            selectedFacetValuesArr.push(facetItems[i]);
          }
        });
      }
    }

    this.props.onFilterUpdate(selectedFacetValuesArr, selectedFacetName)

  }

  clearTheSelectedFilterValue(selectionFacetValue) {

    
    var selectedFacetName;
    var selectedFacetValuesArr = [];
    for (const [key, value] of this.props.updatedFilter) {
      var items = [];
      var facetItems = []
      value.map((option, i) => {
        items.push(option.value);
        facetItems.push(option);
      })

      if (items.includes(selectionFacetValue)) {
        selectedFacetName = key;
        items.filter(function (value, i, arr) {
          if (value != selectionFacetValue) {
            selectedFacetValuesArr.push(facetItems[i]);
          }
        });
      }
    }

    this.props.onFilterUpdate(selectedFacetValuesArr, selectedFacetName)

  }

  findTheFacetName(index) {
    for (const [key, value] of this.props.updatedFilter) {
      value.map((option, i) => {
        if (this.state.appliedFilters[index].label === option.label) {
          return key;
        }
      })
    }
  }

  showLoader() {
    const idid = <div className="lazyloading-Indicator-RWDFilter">
      <img id="me" className="loadingImg" alt='Lazy Loader' src={require('../../../../public/images/plpAssests/lazyloadingIndicator.svg')} />
    </div>
    return idid;
  }

  render() {
    var moreFilterBtn = null;
    if (this.state.filterData.length > 4) {
      moreFilterBtn = <button onClick={() => this.moreFilterBtnClick()} className='moreFilterBtn'>{this.state.filterBtnTitle}</button>
    }

    return (
      <>
        {this.state.showLoader && isMobile() ? this.showLoader() : null}
        {this.props.isFromRWD ? null : <h4 className='heading'>Filter</h4>}

        {this.state.filterItem}
        {this.props.isFromRWD ? null : moreFilterBtn}
        <div className='clearfix'></div>
        {this.props.isFromRWD ? null :
          <div className='filter-keywords'>
            {this.state.selectedFilters}
          </div>}

      </>
    );
  }
}


/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => {
  return {
    onFilterUpdate: (updatedArr, facetName) => dispatch(actionCreators.filter(updatedArr, facetName)),
  }
};

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {
    updatedFilter: stateObj.updateFilter,
    rwdUpdatedFilter: resolveTheFilter(stateObj.rwdUpdatedFilter),
    
  }
};

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
)(FilterMain);

