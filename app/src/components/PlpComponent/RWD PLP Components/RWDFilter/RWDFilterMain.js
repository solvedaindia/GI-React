import React from 'react';
// Redux
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import injectSaga from '../../../../utils/injectSaga';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../../../../containers/PlpContainer/reducer';
import saga from '../../../../containers/PlpContainer/saga';
import * as actionCreators from '../../../../containers/PlpContainer/actions';
import { getReleventReduxState } from '../../../../utils/utilityManager';
import RWDFilter from './RWDFilter';
import '../../../../../public/styles/plpContainer/plpContainer.scss';
import FilterMain from '../../../../components/PlpComponent/Filter/filterMain';
import {CLEAR_ALL, FILTERS  } from '../../../../constants/app/plpConstants';


{

}


class RWDFilterMain extends React.Component {
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

      isShowFilterOptions: false,
    };

  }

  showFilterOptions() {
    document.body.style.overflow =this.state.isShowFilterOptions?"": "hidden";
    document.body.style.position =this.state.isShowFilterOptions?"": "fixed";
    this.setState({
      isShowFilterOptions: !this.state.isShowFilterOptions,
    });
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  moreFilterBtnClick() {

  }
  componentWillUnmount()
  {
      document.body.style.overflow ="";
      document.body.style.position = "";
  }



  filterCallback() {
      document.body.style.overflow =this.state.isShowFilterOptions?"": "hidden";
      document.body.style.position =this.state.isShowFilterOptions?"": "fixed";

    this.setState({
      isShowFilterOptions: !this.state.isShowFilterOptions
    })
  }

  onClearAllclick() {
    this.props.onClearAllRWDFilter();
  }

  render() {
    return (
      <>
        <button onClick={evt => this.showFilterOptions()} className="filterBy">
          <img
            className="filterbyicon"
            src={require('../../../../../public/images/filter_icon.png')}
          />{' '}
          Filter
        </button>

        {this.state.isShowFilterOptions ?
          <div className='filterOutterCont'>

            <div className='filterHeader'>
              <label className='filterTxt'>{FILTERS}</label>
              <label onClick={this.onClearAllclick.bind(this)} className='clearTxt'>{CLEAR_ALL}</label>
            </div>

            <div className='filter-data'>
              <FilterMain
                isFromRWD={true}
                rwdFilterCallback={evt => this.filterCallback()}
                filterDataPro={this.props.filterDataPro}
                isSKUPro={this.props.isSKUPro}
                categoryIdPro={this.props.categoryIdPro}
                isSearchPathPro={this.props.isSearchPathPro}
                searchKeywordPro={this.props.searchKeywordPro}
              />
            </div>


          </div>
          : null}

      </>
    );
  }
}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => ({
  onFilterUpdate: (updatedArr, facetName) => dispatch(actionCreators.filter(updatedArr, facetName)),
  onClearAllRWDFilter: () => dispatch(actionCreators.clearAllRWDFilters()),
});

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {
    updatedFilter: stateObj.updateFilter,
  };
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
)(RWDFilterMain);
