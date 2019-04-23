import React from 'react';
//Redux
import { connect } from 'react-redux';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import { getReleventReduxState } from '../../../utils/utilityManager';

import Filter from './filter';

class FilterMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterItem: null,
      selectedFilters: null,
      appliedFilters: [],
    };

    this.clearTheSelectedFilter = this.clearTheSelectedFilter.bind(this)
  }

  componentDidMount() {
    if (this.props.filterDataPro) {
      const item = this.props.filterDataPro.map((item, index) => {
        return (
          <Filter key={index} dataPro={item} />
        )
      })
      this.setState({ filterItem: item });
    }
    this.fetchAllAppliedFilters();
  }

  fetchAllAppliedFilters() {
    var appliedFilltersArr = [];
    var item
    for (const [key, value] of this.props.updatedFilter) {
      value.map((option, i) => {
        console.log('Applied Filters -- ', key + ' ---- Value', option);
        appliedFilltersArr.push(option);
      })
    }

    const item = appliedFilltersArr.map((data, i) => {
      return (
        <button className='filterSelection_btn'>{data.label}<span className='filterSelection_oval' onClick={evt => this.clearTheSelectedFilter(i)}>X</span></button>
      )
    })
    this.setState({
      selectedFilters: item,
      appliedFilters: appliedFilltersArr
    });
  }

  clearTheSelectedFilter(index) {
    console.log('All Data --', this.props.updatedFilter);
    var selectionFacetValue = this.state.appliedFilters[index].value;
    //console.log(this.state.appliedFilters[index]);

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
    console.log('Filter Main', this.props.updatedFilter);
    return (
      <>
        <h4 className='heading'>Filter</h4>
        {this.state.filterItem}
        <div className='clearfix'></div>
        <div className='filter-keywords'>
          {this.state.selectedFilters}
        </div>
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

