import React from 'react';
//Redux
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import { getReleventReduxState } from '../../../utils/utilityManager';

import crossIcon from '../../../../public/images/closeplpFilter.svg';

import Filter from './filter';

{/* <button style="
    float: left;
    background: transparent;
    border: 0;
    padding: 16px;
    color: #687ed8;
">More</button>

float: left;
background: transparent;
border: 0;
padding: 16px;
color: #687ed8;
} */}

// - Fewer filters
// + 3 filters

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
      isFilterExpend: false,

      //RWD Vars
      isMobile: window.innerWidth <= 760,
    };

    this.clearTheSelectedFilter = this.clearTheSelectedFilter.bind(this)
    this.moreFilterBtnClick = this.moreFilterBtnClick.bind(this)
  }

  componentDidMount() {
    if (this.props.filterDataPro) {
      const allItems = this.props.filterDataPro.map((item, index) => {
        return (
          <Filter rwdFilterCallbackPro={this.props.rwdFilterCallback} isFromRWD={this.props.isFromRWD} key={index} dataPro={item} indexPro={index} />
        )
      })

      var splitItems = [];
      var leftOverFilterCount;
      if (this.props.filterDataPro.length > 4) {
        splitItems = allItems.slice(0, 4);
        leftOverFilterCount = `+ ${allItems.length - splitItems.length} Filters`
        //const btn = <button onClick={() => this.moreFilterBtnClick()} className='moreFilterBtn'>{leftOverFilterCount}</button>
        //splitItems.push(btn)
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
    console.log('isFilter--', this.state.isFilterExpend);
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
      value.map((option, i) => {
        console.log('Applied Filters -- ', key + ' ---- Value', option);
        appliedFilltersArr.push(option);
      })
    }

    const item = appliedFilltersArr.map((data, i) => {
      return (
        <button className='filterSelection_btn'>{data.label}<span className='filterSelection_oval' onClick={evt => this.clearTheSelectedFilter(i)}>
		<img className='crossImg' src={crossIcon}  alt="Close"/></span></button>
      )
    })
    this.setState({
      selectedFilters: item,
      appliedFilters: appliedFilltersArr
    });
  }

  clearTheSelectedFilter(index) {
    
    var selectionFacetValue = this.state.appliedFilters[index].value;
    //console.log(this.state.appliedFilters[index]);
    console.log('All Data --', selectionFacetValue);
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
            console.log('returnn -- ', facetItems[i]);
            selectedFacetValuesArr.push(facetItems[i]);
            //return facetItems[i];
          }
        });
      }
    }

    console.log('Deleted Facet -- ', selectedFacetName, selectedFacetValuesArr);
    this.props.onFilterUpdate(selectedFacetValuesArr, selectedFacetName)

  }

  findTheFacetName(index) {
    for (const [key, value] of this.props.updatedFilter) {
      value.map((option, i) => {
        if (this.state.appliedFilters[index].label === option.label) {
          console.log('returnmmm', key);
          return key;
        }
      })
    }
  }

  render() {
    var moreFilterBtn = null;
    if (this.props.filterDataPro.length > 4) {
      moreFilterBtn = <button onClick={() => this.moreFilterBtnClick()} className='moreFilterBtn'>{this.state.filterBtnTitle}</button>
    }

    return (
      <>
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
    updatedFilter: stateObj.updateFilter
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

