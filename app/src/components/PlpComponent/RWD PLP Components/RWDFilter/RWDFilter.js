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
      // facetMap: new Map(),
      facetItem: null,
      facetArr: [],
      checked: false,
      alreadyAddedFiltersArr: [],
      currentFilter: [],
    }
    this.subFacetValues = this.subFacetValues.bind(this);
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


  onCheckBoxClick(index) {
    // const selectedFacet = this.state.currentFilter.facetValues[index];

    // let filteredArr = [...this.state.facetArr];
    // //console.log('FilterArr---',this.state.facetArr);
    // const extFacetArr = this.state.facetArr.map(item => {
    //   console.log('exstractedArr --- ', item.value);
    //   return item.value;
    // })
    // if (!extFacetArr.includes(selectedFacet.value)) {
    //   filteredArr.push(selectedFacet)
    //   // this.setState({ facetArr: filteredArr })
    // }
    // else {
    //   filteredArr = this.state.facetArr.filter(function (value, i, arr) {
    //     console.log('else value -- ', value, selectedFacet);
    //     if (value.value != selectedFacet.value) {
    //       return value;
    //     }
    //   });
    // }
    // console.log('Selected --- ', filteredArr);
    // var params = new URLSearchParams(this.props.location.search);


    // this.setState({ facetArr: filteredArr })
  }

  // onCancelBtnClick() {

  //   this.toggleDropdown();
  // }

  unCkeckAll(item) {
    console.log('In the uncheckAll---', item);
    [...document.getElementsByClassName('checkbox' + item.facetName)].map((input) => {
      console.log('uncheck---', input);
      if (input.checked) {
        input.checked = !input.checked;
      }
      return null;
    })



  }

  componentDidMount() {


    // const extFacetArr = filteredArr.map(item => {
    //   //console.log('exstractedArr --- ',item.value);
    //   return item.value;

    // })
    // this.filterOptions();
  }



  onApplyBtnClick() {
    this.state.facetArr.map(item => {
      item.value = item.value.replace('+', '%2B')
    })

    // var ddd = this.state.facetArr[0]
    // var facetName = ddd.value;
    // facetName = facetName.replace('+', '%2B')
    console.log('TotalFace---', this.state.facetArr);
    // ddd.value = facetName
    // console.log('TotalFacemakeee---', ddd);
    // if (this.state.facetArr.length !== 0) {
    this.props.onFilterUpdate(this.state.facetArr, this.props.dataPro.facetName)
    // }
  }

  onCancelBtn() {
    this.setState({
      facetItem: null,
    })
  }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate')

  //   this.unCkeckAll(this.state.currentFilter);
  //   [...document.getElementsByClassName('checkboxSelected' + this.props.dataPro.facetName)].map((input) => {
  //     input.checked = 'checked';
  //   })
  // }

  subFacetValues(item) {
    this.unCkeckAll(item)
    // if (item.facetName === this.state.currentFilter.facetName) {
    //   return;
    // }
    // this.setState({
    //   selected: 0,
    //   options: ['recommended', 'price_L_H', 'price_H_L', 'newArrival'],
    //   //facetMap: new Map(),
    //   facetItem: null,
    //   facetArr: [],
    //   checked: false,
    //   alreadyAddedFiltersArr: [],
    //   currentFilter: [],
    // })


    // //this.unCkeckAll(item);
    // // [...document.getElementsByClassName('checkboxSelected' + item.facetName)].map((input) => {
    // //   input.checked = 'checked';
    // // })

    // // var alreadyAddedFiltersArr = [];
    // let filteredArr = [...this.state.facetArr];
    // for (const [key, value] of this.props.updatedFilter) {
    //   if (key === item.facetName) {
    //     value.map((option, i) => {
    //       filteredArr.push(option)
    //       //alreadyAddedFiltersArr.push(option);
    //     })
    //   }
    // }



    // this.setState({ facetArr: filteredArr })
    // const alreadyAddedFiltersArr = filteredArr.map(item => {
    //   //console.log('exstractedArr --- ',item.value);
    //   return item.value;

    // })

    // console.log('dddmdmd -- ', alreadyAddedFiltersArr)
    // // this.setState({
    // //   facetArr: filteredArr,
    // //   alreadyAddedFiltersArr: alreadyAddedFiltersArr,
    // // })

    // var facetItem = item.facetValues.map((option, i) => {

    //   //Check For Selected Checkbox -----------------------------
    //   var checkboxItem = null;
    //   var customSelectionBoxId = null;

    //   if (alreadyAddedFiltersArr.includes(option.value)) {
    //     customSelectionBoxId = 'selected_' + item.facetName + i
    //     checkboxItem = <input className={'inputCheck checkboxSelected' + item.facetName} onChange={evt => this.onCheckBoxClick(i)} defaultChecked={true} type="checkbox" id={customSelectionBoxId}  />
    //     console.log('ITsChecked----');
    //   }
    //   else {
    //     customSelectionBoxId = item.facetName + i
    //     // checkboxItem = <input className={'inputCheck checkbox' + this.props.dataPro.facetName} onChange={evt => this.onCheckBoxClick(i)} type="checkbox" id="chkkl" name="scales" />
    //     checkboxItem = <input className={'inputCheck checkbox' + item.facetName} onChange={evt => this.onCheckBoxClick(i)} type="checkbox" id={customSelectionBoxId}/>
    //     // checkboxItem = <input className={'checkbox'+this.props.dataPro.facetName} onChange={this.onCheckBoxClick.bind(this)} defaultChecked={this.state.checked} type="checkbox" name="scales" />
    //     //this.unCkeckAll(item);

    //     console.log('ITs Not Checked----');
    //   }


    //   //Show images only in colors facet -----------------------------
    //   var checkItem;
    //   // if (option.facetImage !== "") { //this condition to display all the images in any facet.
    //   if (item.facetName.includes('Color') || item.facetName.includes('Material')) {

    //     let colorStyle = {
    //       display: "block",
    //     }
    //     let imgUrl = null;
    //     let colorRGBClass;
    //     let customCheckItem;
    //     if (option.colorCode) {
    //       colorRGBClass = 'circleRGB'
    //       colorStyle = { backgroundColor: `rgb${option.colorCode}` };
    //       customCheckItem = <div className='circlebox'><span class={colorRGBClass} style={colorStyle}></span></div>
    //     }
    //     else {
    //       colorRGBClass = 'circle'
    //       imgUrl = `${imagePrefix}${option.facetImage}`;
    //       console.log('Facet Faet ---- ', imgUrl, option)
    //       customCheckItem = <img className={colorRGBClass} style={colorStyle} src={imgUrl} />
    //     }

    //     // const checkNew = <img className={colorRGBClass} style={colorStyle} src={imgUrl}/>
    //     checkItem = <label className="lblradio" htmlFor={customSelectionBoxId}>
    //       {customCheckItem}
    //     </label>
    //   }
    //   else {
    //     checkItem = <label className="lblCheck" htmlFor={customSelectionBoxId}></label>
    //   }

    //   return (
    //     <div className='input_box'>
    //       {checkboxItem}
    //       {checkItem}
    //       <li className='facetList'>{option.label}</li>
    //       <label>{option.count}</label>
    //     </div>

    //   );
    // })

    this.setState({
      //facetItem: facetItem,
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

        {/* {this.unCkeckAll(this.state.currentFilter)} */}
        

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




























// import React from 'react';
// import { connect } from 'react-redux';
// import { Link, Route, withRouter } from 'react-router-dom';
// import injectSaga from '../../../../utils/injectSaga';
// import injectReducer from '../../../../utils/injectReducer';
// import reducer from '../../../../containers/PlpContainer/reducer';
// import saga from '../../../../containers/PlpContainer/saga';
// import { compose } from 'redux';
// import * as actionCreators from '../../../../containers/PlpContainer/actions';
// import { getReleventReduxState } from '../../../../utils/utilityManager';
// import { imagePrefix } from '../../../../../public/constants/constants';

// const downArrow = (
//   <img className='dropdownArrow' src={require('../../../../../public/images/plpAssests/drop-down-arrow-down.svg')} />
// );
// const upArrow = (
//   <img className='dropdownArrow' src={require('../../../../../public/images/plpAssests/drop-down-arrow-up.svg')} />
// );


// class Filter extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       selected: 0,
//       options: ['recommended', 'price_L_H', 'price_H_L', 'newArrival'],
//       //facetMap: new Map(),
//       facetItem: null,
//       facetArr: [],
//       checked: false,
//     }
//     this.toggleDropdown = this.toggleDropdown.bind(this);
//     this.handleOutsideClick = this.handleOutsideClick.bind(this);
//     this.onCheckBoxClick = this.onCheckBoxClick.bind(this)
//     this.onCancelBtnClick = this.onCancelBtnClick.bind(this)
//     this.onApplyBtnClick = this.onApplyBtnClick.bind(this)
//   }

//   toggleDropdown() {
//     if (!this.state.active) {
//       document.addEventListener('click', this.handleOutsideClick, false);
//     } else {
//       document.removeEventListener('click', this.handleOutsideClick, false);
//     }

//     this.unCkeckAll();
//     [...document.getElementsByClassName('checkboxSelected' + this.props.dataPro.facetName)].map((input) => {
//       input.checked = 'checked';
//     })

//     let filteredArr = [];
//     for (const [key, value] of this.props.updatedFilter) {
//       if (key === this.props.dataPro.facetName) {
//         value.map((option, i) => {
//           filteredArr.push(option)
//         })
//       }
//     }

//     //this.setState({facetArr: filteredArr})

//     this.setState({
//       active: !this.state.active,
//       facetArr: filteredArr
//     });
//   }

//   handleOutsideClick(e) {
//     if (this.node.contains(e.target)) {
//       return;
//     }
//     this.toggleDropdown();
//   }


//   onCheckBoxClick(index) {
//     const selectedFacet = this.props.dataPro.facetValues[index];

//     let filteredArr = [...this.state.facetArr];
//     //console.log('FilterArr---',this.state.facetArr);
//     const extFacetArr = this.state.facetArr.map(item => {
//       console.log('exstractedArr --- ', item.value);
//       return item.value;
//     })
//     if (!extFacetArr.includes(selectedFacet.value)) {
//       filteredArr.push(selectedFacet)
//       // this.setState({ facetArr: filteredArr })
//     }
//     else {
//       filteredArr = this.state.facetArr.filter(function (value, i, arr) {
//         console.log('else value -- ', value, selectedFacet);
//         if (value.value != selectedFacet.value) {
//           return value;
//         }
//       });
//     }
//     console.log('Selected --- ', filteredArr);
//     var params = new URLSearchParams(this.props.location.search);


//     this.setState({ facetArr: filteredArr })
//   }

//   onCancelBtnClick() {


//     this.toggleDropdown();
//   }

//   unCkeckAll() {
//     [...document.getElementsByClassName('checkbox' + this.props.dataPro.facetName)].map((input) => {
//       console.log('uncheck---', input);
//       if (input.checked) {
//         input.checked = !input.checked;
//       }
//       return null;
//     })
//   }

//   componentDidMount() {
//     console.log('dddmdmd -- ',this.props.updatedFilter)

//     var alreadyAddedFiltersArr = [];
//     let filteredArr = [...this.state.facetArr];
//     for (const [key, value] of this.props.updatedFilter) {
//       console.log('kkkeyy --- ',key);
//       if (key === this.props.dataPro.facetName) {
//         value.map((option, i) => {
//           console.log('opttttion --- ',option);
//           filteredArr.push(option)
//           alreadyAddedFiltersArr.push(option);
//         })
//       }
//     }


//     this.setState({ facetArr: filteredArr })
//     const extFacetArr = filteredArr.map(item => {
//       //console.log('exstractedArr --- ',item.value);
//       return item.value;

//     })
//     this.filterOptions(extFacetArr);
//   }



//   onApplyBtnClick() {
//     this.state.facetArr.map(item => {
//       item.value = item.value.replace('+', '%2B')
//     })

//     // var ddd = this.state.facetArr[0]
//     // var facetName = ddd.value;
//     // facetName = facetName.replace('+', '%2B')
//      console.log('TotalFace---', this.state.facetArr);
//     // ddd.value = facetName
//     // console.log('TotalFacemakeee---', ddd);
//     // if (this.state.facetArr.length !== 0) {
//     this.props.onFilterUpdate(this.state.facetArr, this.props.dataPro.facetName)
//     // }
//   }

//   filterOptions(alreadyAddedFiltersArr) {

//     //return this.props.dataPro.facetValues.map((option, i) => {
//     var item = this.props.dataPro.facetValues.map((option, i) => {

//       var checkboxItem;
//       var customSelectionBoxId;
//       console.log('Momentt --- ', alreadyAddedFiltersArr);
//       if (alreadyAddedFiltersArr.includes(option.value)) {
//         customSelectionBoxId = 'selected_' + this.props.dataPro.facetName + i
//         checkboxItem = <input className={'inputCheck checkboxSelected' + this.props.dataPro.facetName} onChange={evt => this.onCheckBoxClick(i)} defaultChecked={true} type="checkbox" id={customSelectionBoxId} name="scales" />
//         console.log('ITsChecked----', checkboxItem);
//       }
//       else {
//         customSelectionBoxId = this.props.dataPro.facetName + i
//         // checkboxItem = <input className={'inputCheck checkbox' + this.props.dataPro.facetName} onChange={evt => this.onCheckBoxClick(i)} type="checkbox" id="chkkl" name="scales" />
//         checkboxItem = <input className={'inputCheck checkbox' + this.props.dataPro.facetName} onChange={evt => this.onCheckBoxClick(i)} type="checkbox" id={customSelectionBoxId} name="scales" />
//         // checkboxItem = <input className={'checkbox'+this.props.dataPro.facetName} onChange={this.onCheckBoxClick.bind(this)} defaultChecked={this.state.checked} type="checkbox" name="scales" />
//       }

//       var checkItem;
//       // if (option.facetImage !== "") { //this condition to display all the images in any facet.
//       if (this.props.dataPro.facetName.includes('Color') || this.props.dataPro.facetName.includes('Material')) { //Show images only in colors facet

//         let colorStyle = {
//           display: "block",
//         }
//         let imgUrl = null;
//         let colorRGBClass;
//         let customCheckItem;
//         if (option.colorCode) {
//           colorRGBClass = 'circleRGB'
//           colorStyle = { backgroundColor: `rgb${option.colorCode}` };
//           customCheckItem = <div className='circlebox'><span class={colorRGBClass} style={colorStyle}></span></div>
//         }
//         else {
//           colorRGBClass = 'circle'
//           imgUrl = `${imagePrefix}${option.facetImage}`;
//           console.log('Facet Faet ---- ', imgUrl, option)
//           customCheckItem = <img className={colorRGBClass} style={colorStyle} src={imgUrl} />
//         }

//         // const checkNew = <img className={colorRGBClass} style={colorStyle} src={imgUrl}/>
//         checkItem = <label className="lblradio" htmlFor={customSelectionBoxId}>
//           {customCheckItem}
//         </label>
//       }
//       else {
//         checkItem = <label className="lblCheck" htmlFor={customSelectionBoxId}></label>
//       }

//       return (
//         <li key={i} className='list'>
//           <div onClick={evt => this.handleClick(i)} key={i} className={"dropdown__list-item " + (i === this.state.selected ? 'dropdown__list-item--active' : '')}>
//             <div className='input_box'>
//               {checkboxItem}
//               {checkItem}
//             </div>

//             <div className='label_text'>
//               {option.label + ' (' + option.count + ')'}
//             </div>

//           </div>
//         </li>
//       );
//     });
//     this.setState({
//       facetItem: item
//     })
//   }

//   render() {
//     return (
//       <>
//         <div ref={node => { this.node = node; }} className="dropdown_filter">
//           <div className="dropdown_filter__filter">
//             <div className="dropdown_filter__toggle dropdown_filter__list-item"
//               onClick={() => this.toggleDropdown()}
//             >
//               {this.props.dataPro.facetName}
//               {this.state.active ? upArrow : downArrow}
//             </div>

//           </div>

//           <ul className={"dropdown_filter__list " + (this.state.active ? 'dropdown_filter__list--active' : '')}>{this.state.facetItem}
//             <div className="filterbtnWrapper">
//               <button onClick={() => this.onCancelBtnClick()} className='dropdown_filter__cancelBtn btn'>Cancel</button>
//               <button onClick={() => this.onApplyBtnClick()} className='dropdown_filter__applyBtn btn'>Apply</button>
//             </div>
//           </ul>
//         </div>
//       </>
//     )
//   }

// }


// /* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
// const mapDispatchToProps = dispatch => {
//   return {
//     onFilterUpdate: (updatedArr, facetName) => dispatch(actionCreators.filter(updatedArr, facetName)),
//   }
// };

// const mapStateToProps = state => {
//   const stateObj = getReleventReduxState(state, 'plpContainer');
//   console.log('Zebraa MIN --- ', stateObj.updateFilter)
//   return {
//     updatedFilter: stateObj.updateFilter
//   }
// };

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// const withReducer = injectReducer({ key: 'plpContainer', reducer });
// const withSaga = injectSaga({ key: 'plpContainer', saga });

// export default compose(
//   withReducer,
//   withSaga,
//   withConnect,
//   withRouter,
// )(Filter);


