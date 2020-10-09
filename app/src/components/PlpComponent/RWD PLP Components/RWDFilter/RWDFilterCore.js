import React from 'react';
//Redux
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import injectSaga from '../../../../utils/injectSaga';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../../../../containers/PlpContainer/reducer';
import saga from '../../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../../containers/PlpContainer/actions';
import { getReleventReduxState } from '../../../../utils/utilityManager';
import { imagePrefix } from '../../../../../public/constants/constants';
import {CANCEL, APPLY  } from '../../../../constants/app/plpConstants';



class RWDFilterCore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facetItem: null,
      facetArr: [],
      checked: false,
      alreadyAddedFiltersArr: [],
      currentFilter: [],
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  unCkeckAll(item) {
    [...document.getElementsByClassName('checkbox' + item.facetName)].map((input) => { //checkboxsofa
      if (input.checked) {
        input.checked = unchecked;
      }
      return null;
    })
  }


  toggleDropdown(item) {
  

    this.unCkeckAll(item);
    [...document.getElementsByClassName('checkboxSelected' + item.facetName)].map((input) => {
      input.checked = 'checked';
    })


  }

  componentDidMount() {

    this.subFacetValues(this.props.itemPro);
  }

  componentWillReceiveProps(nextProps) {
    this.unCkeckAll(nextProps.itemPro);
    if (this.props.itemPro !== nextProps.itemPro) {
      this.subFacetValues(nextProps.itemPro);
      
      
    }
  }

  subFacetValues(item) {
    if (item.facetName === this.state.currentFilter.facetName) {
      return;
    }
  
    let filteredArr = [...this.state.facetArr];
    for (const [key, value] of this.props.updatedFilter) {
      if (key === item.facetName) {
        value.map((option, i) => {
          filteredArr.push(option)
        })
      }
    }



    this.setState({ facetArr: filteredArr })
    const alreadyAddedFiltersArr = filteredArr.map(item => {
      return item.value;

    })

  

    var facetItem = item.facetValues.map((option, i) => {

      //Check For Selected Checkbox -----------------------------
      var checkboxItem = null;
      var customSelectionBoxId = null;

      if (alreadyAddedFiltersArr.includes(option.value)) {
        customSelectionBoxId = 'selected_' + item.facetName + i
        checkboxItem = <input className={'inputCheck checkboxSelected' + item.facetName} onChange={evt => this.onCheckBoxClick(i)} defaultChecked={true} type="checkbox" id={customSelectionBoxId} />
      }
      else {
        customSelectionBoxId = item.facetName + i
        checkboxItem = <input className={'inputCheck checkbox' + item.facetName} onChange={evt => this.onCheckBoxClick(i)} type="checkbox" id={customSelectionBoxId} />

      }


      var checkItem;
      if (item.facetName.includes('Color') || item.facetName.includes('Material')) {

        let colorStyle = {
          display: "block",
        }
        let imgUrl = null;
        let colorRGBClass;
        let customCheckItem;
        if (option.colorCode) {
          colorRGBClass = 'circleRGB'
          colorStyle = { backgroundColor: `rgb${option.colorCode}` };
          customCheckItem = <div className='circlebox'><span class={colorRGBClass} style={colorStyle}></span></div>
        }
        else {
          colorRGBClass = 'circle'
          imgUrl = `${imagePrefix}${option.facetImage}`;
          customCheckItem = <img className={colorRGBClass} style={colorStyle} src={imgUrl} />
        }

        checkItem = <label className="lblradio" htmlFor={customSelectionBoxId}>
          {customCheckItem}
        </label>
      }
      else {
        checkItem = <label className="lblCheck" htmlFor={customSelectionBoxId}></label>
      }

      return (
        <div className='input_box'>
          {checkboxItem}
          {checkItem}
          <li className='facetList'>{option.label}</li>
          <label>{option.count}</label>
        </div>

      );
    })

    this.setState({
      facetItem: facetItem,
      currentFilter: item
    })
  }


  render() {

    return (
      <>
        {this.state.facetItem !== null ?
          <div className='filterFacetName'>
            {this.state.facetItem}
          </div>
          : null}

        <div className='filterFooter'>
          <button onClick={() => this.onCancelBtn()} className='cancelBtn'>{CANCEL}</button>
          <button onClick={() => this.onApplyBtnClick()} className='applyBtn'>{APPLY}</button>
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
)(RWDFilterCore);

