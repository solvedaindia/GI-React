
import React from 'react';
//Redux Imports
import { connect } from 'react-redux';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import { getReleventReduxState, fetchReleventSortingValue, fetchReleventSortingValueByIndex } from '../../../utils/utilityManager';

import { Link, Route, withRouter } from 'react-router-dom';

const downArrow = (
  <img className='dropdownArrow' src={require('../../../../public/images/plpAssests/drop-down-arrow-down.svg')} />
);
const upArrow = (
  <img className='dropdownArrow' src={require('../../../../public/images/plpAssests/drop-down-arrow-up.svg')} />
);
const recommended = 'Interio Recommends';
const price_L_H = 'Price Low to High';
const price_H_L = 'Price High to Low';
const newArrival = 'New Arrival';
class RWDSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelection: recommended,
      selected: this.props.sortingIndexPro === '' ? 0 : this.props.sortingIndexPro,
      options: [price_L_H, price_H_L, recommended, newArrival],
      title: recommended,
    };
  }

  showSortOptions() {

  }

  render() {
    return (
      <>
       
        <button className='rwdSortBtn' onClick={evt => this.showSortOptions()}>Sort</button>
      </>
    );
  }

}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => {
  return {
    updateSortingValue: (value) => dispatch(actionCreators.sortingAction(value)),
  }
};

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {

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
  withRouter,
)(RWDSort);


