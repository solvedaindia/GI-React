import React from 'react';
//Redux Imports
import { connect } from 'react-redux';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import { getReleventReduxState } from '../../../utils/utilityManager';

import { Link, Route, withRouter } from 'react-router-dom';

const downArrow = (  
  <img className='dropdownArrow' src={require('../../../components/SVGs/drop-down-arrow-down.svg')} />
);
const upArrow = (
  <img className='dropdownArrow' src={require('../../../components/SVGs/drop-down-arrow-up.svg')} />
);
const recommended = 'Recommended';
const price_L_H = 'Price Low to High';
const price_H_L = 'Price High to Low';
const newArrival = 'New Arrival';
class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelection: recommended,
      selected: 0,
      options: [recommended, price_L_H, price_H_L, newArrival],
      title: recommended,
    };
  }

  toggleDropdown() {
    this.setState({
      active: !this.state.active
    });
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
    return this.state.options.map((option, i) => {
      console.log('optionsss',option);
      return (
        <li
          onClick={evt => this.handleClick(i)}
          key={i}
          className={"dropdownlist-item list " + (i === this.state.selected ? 'dropdownlist-itemactive' : '')}
        >
          <Link className='link' to={this.props.match.url+'/'+option}>
            {option}
          </Link>
        </li>
      );
    });
  }

  render() {
    console.log('Routtt',this.props.match.url);
    return (
      <>
      <h4 className='heading'>Sort</h4>
      <div className="dropdown">
        <div
          onClick={() => this.toggleDropdown()}
          className="dropdowntoggle dropdownlist-item"
        >
          {this.state.title}
          {this.state.active ? downArrow : upArrow}
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


