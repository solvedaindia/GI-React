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
class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelection: recommended,
      selected: this.props.sortingIndexPro === '' ? 0 : this.props.sortingIndexPro,
      options: [price_L_H, price_H_L, recommended, newArrival],
      title: recommended,
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  toggleDropdown() {
    if (!this.state.active) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({
      active: !this.state.active
    });
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.toggleDropdown();
  }

  handleClick(i) {
    if (i !== this.state.selected) {
      this.setState({
        selected: i,
        title: this.state.options[i],
      });
      this.props.updateSortingValue(this.state.options[i]);
    }
    this.toggleDropdown();
  }

  sortingOptions() {
    if (!this.state.options) {
      return;
    }
    //console.log('Sorrrrr -- ',this.state.selected, fetchReleventSortingValueByIndex(this.state.selected))
    return this.state.options.map((option, i) => {
      
      return (
        <li
          onClick={evt => this.handleClick(i)}
          key={i}
          className={"dropdownlist-item list " + (option === fetchReleventSortingValueByIndex(this.state.selected) ? 'dropdownlist-itemactive' : '')}
        >
          {/* <Link to={{ search: `sort=${fetchReleventSortingValue(option)}` }}> */}
            {option}
          {/* </Link> */}
        </li>
      );
    });
  }

  render() {
    
    return (
      <>
        <h4 className='heading'>Sort</h4>
        <div ref={node => { this.node = node; }} className="dropdown">
          <div
            onClick={() => this.toggleDropdown()}
            className="dropdowntoggle dropdownlist-item"
          >
            {fetchReleventSortingValueByIndex(this.state.selected)}
            {this.state.active ? upArrow : downArrow}
          </div>
          <ul className={"dropdownlist " + (this.state.active ? 'dropdownlistactive' : '')}>{this.sortingOptions()}</ul>
        </div>
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
)(Sort);


