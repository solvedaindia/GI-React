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
    console.log('In the uncheckAll---', item);
    [...document.getElementsByClassName('checkbox' + item.facetName)].map((input) => { //checkboxsofa
      console.log('unchecktt---', input);
      if (input.checked) {
        input.checked = unchecked;
      }
      return null;
    })
  }


  toggleDropdown(item) {
    // if (!this.state.active) {
    //   document.addEventListener('click', this.handleOutsideClick, false);
    // } else {
    //   document.removeEventListener('click', this.handleOutsideClick, false);
    // }

    this.unCkeckAll(item);
    [...document.getElementsByClassName('checkboxSelected' + item.facetName)].map((input) => {
      input.checked = 'checked';
    })

    // let filteredArr = [];
    // for (const [key, value] of this.props.updatedFilter) {
    //   if (key === this.props.dataPro.facetName) {
    //     value.map((option, i) => {
    //       filteredArr.push(option)
    //     })
    //   }
    // }

    //this.setState({facetArr: filteredArr})

    // this.setState({
    //   active: !this.state.active,
    //   facetArr: filteredArr
    // });
  }

  componentDidMount() {

    this.subFacetValues(this.props.itemPro);
  }

  componentWillReceiveProps(nextProps) {
    this.unCkeckAll(nextProps.itemPro);
    if (this.props.itemPro !== nextProps.itemPro) {
      console.log('componentWillReceiveProps -- ')
      //this.toggleDropdown(nextProps.itemPro);
      this.subFacetValues(nextProps.itemPro);
      
      
    }
  }

  subFacetValues(item) {
    if (item.facetName === this.state.currentFilter.facetName) {
      return;
    }
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


    //this.unCkeckAll(item);
    // [...document.getElementsByClassName('checkboxSelected' + item.facetName)].map((input) => {
    //   input.checked = 'checked';
    // })

    // var alreadyAddedFiltersArr = [];
    let filteredArr = [...this.state.facetArr];
    for (const [key, value] of this.props.updatedFilter) {
      if (key === item.facetName) {
        value.map((option, i) => {
          filteredArr.push(option)
          //alreadyAddedFiltersArr.push(option);
        })
      }
    }



    this.setState({ facetArr: filteredArr })
    const alreadyAddedFiltersArr = filteredArr.map(item => {
      //console.log('exstractedArr --- ',item.value);
      return item.value;

    })

    console.log('dddmdmd -- ', alreadyAddedFiltersArr, item)
    // this.setState({
    //   facetArr: filteredArr,
    //   alreadyAddedFiltersArr: alreadyAddedFiltersArr,
    // })

    var facetItem = item.facetValues.map((option, i) => {

      //Check For Selected Checkbox -----------------------------
      var checkboxItem = null;
      var customSelectionBoxId = null;

      if (alreadyAddedFiltersArr.includes(option.value)) {
        customSelectionBoxId = 'selected_' + item.facetName + i
        checkboxItem = <input className={'inputCheck checkboxSelected' + item.facetName} onChange={evt => this.onCheckBoxClick(i)} defaultChecked={true} type="checkbox" id={customSelectionBoxId} />
        console.log('ITsChecked----');
      }
      else {
        customSelectionBoxId = item.facetName + i
        // checkboxItem = <input className={'inputCheck checkbox' + this.props.dataPro.facetName} onChange={evt => this.onCheckBoxClick(i)} type="checkbox" id="chkkl" name="scales" />
        checkboxItem = <input className={'inputCheck checkbox' + item.facetName} onChange={evt => this.onCheckBoxClick(i)} type="checkbox" id={customSelectionBoxId} />
        // checkboxItem = <input className={'checkbox'+this.props.dataPro.facetName} onChange={this.onCheckBoxClick.bind(this)} defaultChecked={this.state.checked} type="checkbox" name="scales" />
        //this.unCkeckAll(item);

        console.log('ITs Not Checked----');
      }


      //Show images only in colors facet -----------------------------
      var checkItem;
      // if (option.facetImage !== "") { //this condition to display all the images in any facet.
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
          console.log('Facet Faet ---- ', imgUrl, option)
          customCheckItem = <img className={colorRGBClass} style={colorStyle} src={imgUrl} />
        }

        // const checkNew = <img className={colorRGBClass} style={colorStyle} src={imgUrl}/>
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
          <button onClick={() => this.onCancelBtn()} className='cancelBtn'>Cancel</button>
          <button onClick={() => this.onApplyBtnClick()} className='applyBtn'>Apply</button>
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

