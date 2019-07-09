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
      // facetMap: new Map(),
      facetItem: null,
      facetArr: [],
      checked: false,
      alreadyAddedFiltersArr: [],
    };
    // this.toggleDropdown = this.toggleDropdown.bind(this);
    // this.handleOutsideClick = this.handleOutsideClick.bind(this);
    // this.onCheckBoxClick = this.onCheckBoxClick.bind(this)
    // this.onCancelBtnClick = this.onCancelBtnClick.bind(this)
    // this.onApplyBtnClick = this.onApplyBtnClick.bind(this)
  }

  // toggleDropdown() {
  //   if (!this.state.active) {
  //     document.addEventListener('click', this.handleOutsideClick, false);
  //   } else {
  //     document.removeEventListener('click', this.handleOutsideClick, false);
  //   }

  //   this.unCkeckAll();
  //   [...document.getElementsByClassName('checkboxSelected' + this.props.dataPro.facetName)].map((input) => {
  //     input.checked = 'checked';
  //   })

  //   let filteredArr = [];
  //   for (const [key, value] of this.props.updatedFilter) {
  //     if (key === this.props.dataPro.facetName) {
  //       value.map((option, i) => {
  //         filteredArr.push(option)
  //       })
  //     }
  //   }

  //   //this.setState({facetArr: filteredArr})

  //   this.setState({
  //     active: !this.state.active,
  //     facetArr: filteredArr
  //   });
  // }

  // handleOutsideClick(e) {
  //   if (this.node.contains(e.target)) {
  //     return;
  //   }
  //   this.toggleDropdown();
  // }

  // onCheckBoxClick(index) {
  //   const selectedFacet = this.props.dataPro.facetValues[index];

  //   let filteredArr = [...this.state.facetArr];
  //   //console.log('FilterArr---',this.state.facetArr);
  //   const extFacetArr = this.state.facetArr.map(item => {
  //     console.log('exstractedArr --- ', item.value);
  //     return item.value;
  //   })
  //   if (!extFacetArr.includes(selectedFacet.value)) {
  //     filteredArr.push(selectedFacet)
  //     // this.setState({ facetArr: filteredArr })
  //   }
  //   else {
  //     filteredArr = this.state.facetArr.filter(function (value, i, arr) {
  //       console.log('else value -- ', value, selectedFacet);
  //       if (value.value != selectedFacet.value) {
  //         return value;
  //       }
  //     });
  //   }
  //   console.log('Selected --- ', filteredArr);
  //   var params = new URLSearchParams(this.props.location.search);

  //   this.setState({ facetArr: filteredArr })
  // }

  // onCancelBtnClick() {

  //   this.toggleDropdown();
  // }

  // unCkeckAll() {
  //   [...document.getElementsByClassName('checkbox' + this.props.dataPro.facetName)].map((input) => {
  //     // console.log('uncheck---', input);
  //     if (input.checked) {
  //       input.checked = !input.checked;
  //     }
  //     return null;
  //   })
  // }

  componentDidMount() {
    console.log('dddmdmd -- ', this.props.updatedFilter);
    const alreadyAddedFiltersArr = [];
    const filteredArr = [...this.state.facetArr];
    for (const [key, value] of this.props.updatedFilter) {
      if (key === this.props.dataPro.facetName) {
        value.map((option, i) => {
          filteredArr.push(option);
          alreadyAddedFiltersArr.push(option);
        });
      }
    }

    this.setState({
      facetArr: filteredArr,
      alreadyAddedFiltersArr: [],
    });
    // const extFacetArr = filteredArr.map(item => {
    //   //console.log('exstractedArr --- ',item.value);
    //   return item.value;

    // })
    // this.filterOptions();
  }

  // onApplyBtnClick() {
  //   this.state.facetArr.map(item => {
  //     item.value = item.value.replace('+', '%2B')
  //   })

  //   // var ddd = this.state.facetArr[0]
  //   // var facetName = ddd.value;
  //   // facetName = facetName.replace('+', '%2B')
  //   console.log('TotalFace---', this.state.facetArr);
  //   // ddd.value = facetName
  //   // console.log('TotalFacemakeee---', ddd);
  //   // if (this.state.facetArr.length !== 0) {
  //   this.props.onFilterUpdate(this.state.facetArr, this.props.dataPro.facetName)
  //   // }
  // }

  filterOptions(alreadyAddedFiltersArr) {
    // return this.props.dataPro.facetValues.map((option, i) => {
    const item = this.props.dataPro.facetValues.map((option, i) => 
    // var checkboxItem;
    // var customSelectionBoxId;
    // console.log('Momentt --- ', alreadyAddedFiltersArr);
    // if (alreadyAddedFiltersArr.includes(option.value)) {
    //   customSelectionBoxId = 'selected_' + this.props.dataPro.facetName + i
    //   checkboxItem = <input className={'inputCheck checkboxSelected' + this.props.dataPro.facetName} onChange={evt => this.onCheckBoxClick(i)} defaultChecked={true} type="checkbox" id={customSelectionBoxId} name="scales" />
    //   console.log('ITsChecked----', checkboxItem);
    // }
    // else {
    //   customSelectionBoxId = this.props.dataPro.facetName + i
    //   // checkboxItem = <input className={'inputCheck checkbox' + this.props.dataPro.facetName} onChange={evt => this.onCheckBoxClick(i)} type="checkbox" id="chkkl" name="scales" />
    //   checkboxItem = <input className={'inputCheck checkbox' + this.props.dataPro.facetName} onChange={evt => this.onCheckBoxClick(i)} type="checkbox" id={customSelectionBoxId} name="scales" />
    //   // checkboxItem = <input className={'checkbox'+this.props.dataPro.facetName} onChange={this.onCheckBoxClick.bind(this)} defaultChecked={this.state.checked} type="checkbox" name="scales" />
    // }

    // var checkItem;
    // // if (option.facetImage !== "") { //this condition to display all the images in any facet.
    // if (this.props.dataPro.facetName.includes('Color') || this.props.dataPro.facetName.includes('Material')) { //Show images only in colors facet

    //   let colorStyle = {
    //     display: "block",
    //   }
    //   let imgUrl = null;
    //   let colorRGBClass;
    //   let customCheckItem;
    //   if (option.colorCode) {
    //     colorRGBClass = 'circleRGB'
    //     colorStyle = { backgroundColor: `rgb${option.colorCode}` };
    //     customCheckItem = <div className='circlebox'><span class={colorRGBClass} style={colorStyle}></span></div>
    //   }
    //   else {
    //     colorRGBClass = 'circle'
    //     imgUrl = `${imagePrefix}${option.facetImage}`;
    //     console.log('Facet Faet ---- ', imgUrl, option)
    //     customCheckItem = <img className={colorRGBClass} style={colorStyle} src={imgUrl} />
    //   }

    //   // const checkNew = <img className={colorRGBClass} style={colorStyle} src={imgUrl}/>
    //   checkItem = <label className="lblradio" htmlFor={customSelectionBoxId}>
    //     {customCheckItem}
    //   </label>
    // }
    // else {
    //   checkItem = <label className="lblCheck" htmlFor={customSelectionBoxId}></label>
    // }

      (

        <li className='facetList'>{option.label}</li>

      // <li key={i} className='list'>
      //   <div onClick={evt => this.handleClick(i)} key={i} className={"dropdown__list-item " + (i === this.state.selected ? 'dropdown__list-item--active' : '')}>
      //     <div className='input_box'>
      //       {checkboxItem}
      //       {checkItem}
      //     </div>

      //     <div className='label_text'>
      //       {option.label + ' (' + option.count + ')'}
      //     </div>

      //   </div>
      // </li>
    ));
    this.setState({
      facetItem: item,
    });
  }

  subFacetValues(item) {
    var item = item.facetValues.map((option, i) => {
      // Check For Selected Checkbox
      let checkboxItem;
      let customSelectionBoxId;
      console.log('Momentt --- ', this.state.alreadyAddedFiltersArr);
      if (this.state.alreadyAddedFiltersArr.includes(option.value)) {
        customSelectionBoxId = `selected_${this.props.dataPro.facetName}${i}`;
        checkboxItem = (
          <input
            className={
              `inputCheck checkboxSelected${  this.props.dataPro.facetName}`
            }
            onChange={evt => this.onCheckBoxClick(i)}
            defaultChecked
            type="checkbox"
            id={customSelectionBoxId}
            name="scales"
          />
        );
        console.log('ITsChecked----', checkboxItem);
      } else {
        customSelectionBoxId = this.props.dataPro.facetName + i;
        // checkboxItem = <input className={'inputCheck checkbox' + this.props.dataPro.facetName} onChange={evt => this.onCheckBoxClick(i)} type="checkbox" id="chkkl" name="scales" />
        checkboxItem = (
          <input
            className={`inputCheck checkbox${  this.props.dataPro.facetName}`}
            onChange={evt => this.onCheckBoxClick(i)}
            type="checkbox"
            id={customSelectionBoxId}
            name="scales"
          />
        );
        // checkboxItem = <input className={'checkbox'+this.props.dataPro.facetName} onChange={this.onCheckBoxClick.bind(this)} defaultChecked={this.state.checked} type="checkbox" name="scales" />
      }

      return (
        <div className="input_box">
          {checkboxItem}
          <li className="facetList">{option.label}</li>
        </div>
      );
    });
    this.setState({
      facetItem: item,
    });
  }

  render() {
    return (
      <>
        <div className="mainFilter">
          <ul>
            {this.props.dataPro.map((item, index) => (
              <>
                <li
                  onClick={this.subFacetValues.bind(this, item)}
                  className="facetList"
                >
                  {item.facetName}
                </li>
              </>
            ))}
          </ul>
        </div>

        <div className="filterFacetName">{this.state.facetItem}</div>
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
  console.log('Zebraa MIN --- ', stateObj.updateFilter);
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
