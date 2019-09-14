import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import injectSaga from '../../../../utils/injectSaga';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../../../../containers/PlpContainer/reducer';
import saga from '../../../../containers/PlpContainer/saga';
import * as actionCreators from '../../../../containers/PlpContainer/actions';
import { getReleventReduxState } from '../../../../utils/utilityManager';
import { imagePrefix } from '../../../../../public/constants/constants';
import RWDFilterCore from './RWDFilterCore';

const downArrow = (
  <img
    className="dropdownArrow"
    src={require('../../../../../public/images/plpAssests/drop-down-arrow-down.svg')}
  />
);
const upArrow = (
  <img
    className="dropdownArrow"
    src={require('../../../../../public/images/plpAssests/drop-down-arrow-up.svg')}
  />
);

class RWDFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 0,
      options: ['recommended', 'price_L_H', 'price_H_L', 'newArrival'],
      facetItem: null,
      facetArr: [],
      checked: false,
      alreadyAddedFiltersArr: [],
      currentFilter: [],
    }
    this.subFacetValues = this.subFacetValues.bind(this);

  }

 

  onCheckBoxClick(index) {
  }



  unCkeckAll(item) {
    [...document.getElementsByClassName('checkbox' + item.facetName)].map((input) => {
      if (input.checked) {
        input.checked = !input.checked;
      }
      return null;
    })



  }

  componentDidMount() {


  }



  onApplyBtnClick() {
    this.state.facetArr.map(item => {
      item.value = item.value.replace('+', '%2B')
    })


    this.props.onFilterUpdate(this.state.facetArr, this.props.dataPro.facetName)
  
  }

  onCancelBtn() {
    this.setState({
      facetItem: null,
    })
  }



  subFacetValues(item) {
    this.unCkeckAll(item)





    this.setState({
      currentFilter: item
    })
  }

  render() {

    return (
      <>
        <div className="mainFilter">
          <ul>
            {this.props.dataPro.map((item, index) => {
              return (
                <>
                  <li onClick={() => this.subFacetValues(item)} className='facetList'>{item.facetName}</li>
                  <RWDFilterCore itemPro={item} />
                </>
              )
            })}
          </ul>
        </div>

        

      </>
    );
  }
}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => ({
  onFilterUpdate: (updatedArr, facetName) => dispatch(actionCreators.filter(updatedArr, facetName)),
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
  withRouter,
)(RWDFilter);

























