import React from 'react';
// Redux Imports
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, Route, withRouter } from 'react-router-dom';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import {
  getReleventReduxState,
  fetchReleventSortingValue,
  fetchReleventSortingValueByIndex,
} from '../../../utils/utilityManager';


const downArrow = (
  <img
    className="dropdownArrow"
    src={require('../../../../public/images/plpAssests/drop-down-arrow-down.svg')}
  />
);
const upArrow = (
  <img
    className="dropdownArrow"
    src={require('../../../../public/images/plpAssests/drop-down-arrow-up.svg')}
  />
);
const recommended = 'Interio Recommends';
const price_L_H = 'Price - Low to High';
const price_H_L = 'Price - High to Low';
const newArrival = 'New Arrival';
class RWDSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelection: recommended,
      selected:
        this.props.sortingIndexPro === '' ? 2 : this.props.sortingIndexPro,
      options: [price_L_H, price_H_L, recommended, newArrival],
      title: recommended,
      isShowSortOptions: false,
    };
  }

  showSortOptions() {
    this.setState({
      isShowSortOptions: !this.state.isShowSortOptions,
    });
  }

  handleClick(i) {
    console.log('yes handle click -- ', i);
    if (i !== this.state.selected) {
      this.setState({
        selected: i,
        title: this.state.options[i],
      });
      this.props.updateSortingValue(this.state.options[i]);
    }
    // this.toggleDropdown();
  }

  render() {
    console.log('what Sort Value --- ', this.props.sortingIndexPro);
    return (
      <>
        <button className='sortBy' onClick={evt => this.showSortOptions()}><img className='sortbyicon' src={require('../../../../public/images/sort.svg')} /> Sort</button>

        {this.state.isShowSortOptions ?
          <div onClick={evt => this.showSortOptions()} className='sortOutterCont'>
            <div className='sortInnerCont'>
              <div>
                <label className='sortTxt'>Sort</label>
                <button onClick={evt => this.showSortOptions()} className='sortCancelBtn'><img className='sortByCloseIcon' src={require('../../../../public/images/close.svg')} /></button>
              </div>
              <div className="clearfix" />
              <div>
                <ul>
                  {this.state.options.map((option, i) => (
                    <li onClick={evt => this.handleClick(i)} key={i} className={`sortLi${option === fetchReleventSortingValueByIndex(this.state.selected) ? ' active' : ''}`} >
                      {option}
                      {option === fetchReleventSortingValueByIndex(this.state.selected) ? <img className='sortSelectionImg' src={require('../../../../public/images/sortSelection.svg')} /> : ''}
                    </li>
                  ))
                  }
                </ul>
              </div>
            </div>
          </div>
         : null}
      </>
    );
  }
}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => ({
  updateSortingValue: (value) => dispatch(actionCreators.sortingAction(value)),
});

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {};
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
