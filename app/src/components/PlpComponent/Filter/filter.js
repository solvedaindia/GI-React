import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import { getReleventReduxState, isMobile } from '../../../utils/utilityManager';
import { imagePrefix } from '../../../../public/constants/constants';
import { runInThisContext } from 'vm';

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

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 0,
      options: ['recommended', 'price_L_H', 'price_H_L', 'newArrival'],
      // facetMap: new Map(),
      facetItem: null,
      facetArr: [],
      checked: false,
      //RWD Vars
      isMobile: window.innerWidth <= 760,
      isRWDFilterSelected: false,
    }
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
    this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
    this.onApplyBtnClick = this.onApplyBtnClick.bind(this);
  }

  toggleDropdown(ismmm) {
    console.log('ismmm -- ', ismmm);
    // if (this.props.isFromRWD && this.state.active) {
    //   // this.props.resetAllPro();

    //   //return;
    // }


    if (!this.state.active) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.unCkeckAll();
    [
      ...document.getElementsByClassName(
        `checkboxSelected${this.props.dataPro.facetName}`,
      ),
    ].map(input => {
      input.checked = 'checked';
    });

    const filteredArr = [];
    for (const [key, value] of this.props.updatedFilter) {
      if (key === this.props.dataPro.facetName) {
        value.map((option, i) => {
          filteredArr.push(option);
        });
      }
    }

    // this.setState({facetArr: filteredArr})

    this.setState({
      active: !this.state.active,
      facetArr: filteredArr,
    });
  }


  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    console.log('handleOutsideClick')
    this.toggleDropdown();
  }

  onCheckBoxClick(index) {
    const selectedFacet = this.props.dataPro.facetValues[index];

    let filteredArr = [...this.state.facetArr];
    // console.log('FilterArr---',this.state.facetArr);
    const extFacetArr = this.state.facetArr.map(item => {
      return item.value.replace(/\%2B/g, '+');
    });
    if (!extFacetArr.includes(selectedFacet.value)) {
      filteredArr.push(selectedFacet);
      // this.setState({ facetArr: filteredArr })
    } else {
      filteredArr = this.state.facetArr.filter((value, i, arr) => {
        console.log('else value -- ', value, selectedFacet);
        if (value.value.replace(/\%2B/g, '+') != selectedFacet.value) {
          return value;
        }
      });
    }
    console.log('Selected --- ', filteredArr);
    const params = new URLSearchParams(this.props.location.search);

    this.setState({ facetArr: filteredArr });
  }

  onCancelBtnClick() {
    this.toggleDropdown();
    if (this.props.isFromRWD) {
      this.props.rwdFilterCallbackPro();
    }

  }

  unCkeckAll() {
    [
      ...document.getElementsByClassName(
        `checkbox${this.props.dataPro.facetName}`,
      ),
    ].map(input => {
      // console.log('uncheck---', input);
      if (input.checked) {
        input.checked = !input.checked;
      }
      return null;
    });
  }

  componentDidMount() {
    console.log('dddmdmd -- ', this.props.indexPro);

    const alreadyAddedFiltersArr = [];
    const filteredArr = [...this.state.facetArr];
    for (const [key, value] of this.props.updatedFilter) {
      console.log('kkkeyy --- ', key);
      if (key === this.props.dataPro.facetName) {
        value.map((option, i) => {
          console.log('otttt -- ', option);
          filteredArr.push(option);
          alreadyAddedFiltersArr.push(option);
        });
      }
    }
    console.log('maksss -- ', alreadyAddedFiltersArr);
    this.setState({
      facetArr: filteredArr,
      active: this.props.indexPro === 0 && this.props.isFromRWD ? !this.state.active : false
    });
    const extFacetArr = filteredArr.map(
      item =>
        // console.log('exstractedArr --- ',item.value);
        item.value.replace(/\%2B/g, '+'),
    );
    console.log('maksss jjjjj -- ', extFacetArr);
    this.filterOptions(extFacetArr);
  }

  componentWillReceiveProps() {
    if (this.state.active && isMobile()) {
      this.unCkeckAll();
    }
  }

  onApplyBtnClick() {
    console.log('TotalFaeexxxxx--', this.state.facetArr);
    this.state.facetArr.map(item => {
      item.value = item.value.replace(/\+/g, '%2B');
    });


    // var ddd = this.state.facetArr[0]
    // var facetName = ddd.value;
    // facetName = facetName.replace('+', '%2B')
    console.log('TotalFace---', this.state.facetArr);
    // ddd.value = facetName
    // console.log('TotalFacemakeee---', ddd);
    // if (this.state.facetArr.length !== 0) {
    this.props.onFilterUpdate(
      this.state.facetArr,
      this.props.dataPro.facetName,
    );
    // }
  }

  filterOptions(alreadyAddedFiltersArr) {
    // return this.props.dataPro.facetValues.map((option, i) => {
    var isRWDFacetSelecte = false;
    const item = this.props.dataPro.facetValues.map((option, i) => {
      let checkboxItem;
      let customSelectionBoxId;
      console.log('Momentt --- ', alreadyAddedFiltersArr);
      if (alreadyAddedFiltersArr.includes(option.value)) {
        customSelectionBoxId = `selected_${this.props.dataPro.facetName}${i}`;
        checkboxItem = (
          <input
            className={`inputCheck checkboxSelected${
              this.props.dataPro.facetName
              }`}
            onChange={evt => this.onCheckBoxClick(i)}
            defaultChecked
            type="checkbox"
            id={customSelectionBoxId}
            name="scales"
          />

        );
        isRWDFacetSelecte = true;
        console.log('ITsChecked----', option.value);
      } else {
        customSelectionBoxId = this.props.dataPro.facetName + i;
        // checkboxItem = <input className={'inputCheck checkbox' + this.props.dataPro.facetName} onChange={evt => this.onCheckBoxClick(i)} type="checkbox" id="chkkl" name="scales" />
        checkboxItem = (
          <input
            className={`inputCheck checkbox${this.props.dataPro.facetName}`}
            onChange={evt => this.onCheckBoxClick(i)}
            type="checkbox"
            id={customSelectionBoxId}
            name="scales"
            disabled={option.count === 0 ? true : false}
          />
        ); console.log('ITsChecked Not----', option.value);

        // checkboxItem = <input className={'checkbox'+this.props.dataPro.facetName} onChange={this.onCheckBoxClick.bind(this)} defaultChecked={this.state.checked} type="checkbox" name="scales" />
      }

      let checkItem;
      // if (option.facetImage !== "") { //this condition to display all the images in any facet.
      // if (this.props.dataPro.facetName.includes('Color') || this.props.dataPro.facetName.includes('Material')) { //As discussed with Lalit removing the condtion and adding check on Facet values
      // Show images only in colors facet

      let colorStyle = {
        display: 'block',
      };
      let imgUrl = null;
      let colorRGBClass;
      let customCheckItem;
      if (option.colorCode) {
        colorRGBClass = 'circleRGB';
        colorStyle = { backgroundColor: `rgb${option.colorCode}` };
        customCheckItem = (
          <div className="circlebox">
            <span className={colorRGBClass} style={colorStyle} />
          </div>
        );
        checkItem = (
          <label className="lblradio" htmlFor={customSelectionBoxId}>
            {customCheckItem}
          </label>
        );
      }
      else if (option.facetImage) {
        colorRGBClass = 'circle';
        imgUrl = `${imagePrefix}${option.facetImage}`;
        console.log('Facet Faet ---- ', imgUrl, option);
        customCheckItem = (
          <img className={colorRGBClass} style={colorStyle} src={imgUrl} />
        );
        checkItem = (
          <label className="lblradio" htmlFor={customSelectionBoxId}>
            {customCheckItem}
          </label>
        );
      }
      else {
        checkItem = (
          <label className="lblCheck" htmlFor={customSelectionBoxId} />
        );
      }

      // const checkNew = <img className={colorRGBClass} style={colorStyle} src={imgUrl}/>

      // } 
      // else {
      //   checkItem = (
      //     <label className="lblCheck" htmlFor={customSelectionBoxId} />
      //   );
      // }

      return (
        <li key={i} className="list">
          <div
            // onClick={evt => this.handleClick(i)}
            key={i}
            className={`dropdown__list-item ${
              i === this.state.selected ? 'dropdown__list-item--active' : ''
              }`}
          >
            <div className="input_box">
              {checkboxItem}
              {checkItem}
            </div>

            {!isMobile() ? (
              <div className={option.count === 0 ? 'label_text_disable' : 'label_text'}>
                {`${option.label} (${option.count})`}
              </div>
            )
              : (
                <div className={option.count === 0 ? 'label_text_disable' : 'label_text'}>
                  {option.label} <span className='filterCount'> {option.count}</span>
                </div>
              )}

          </div>
        </li>
      );
    });
    this.setState({
      facetItem: item,
      isRWDFilterSelected: isRWDFacetSelecte,
    });
  }

  render() {
    return (
      <>
        <div
          ref={node => {
            this.node = node;
          }}
          className="dropdown_filter"
        >
          <div className="dropdown_filter__filter">
            <div className="dropdown_filter__toggle dropdown_filter__list-item" onClick={this.props.isFromRWD ? this.state.active ? null : () => this.toggleDropdown(true) : () => this.toggleDropdown(true)}>
              {this.props.dataPro.facetName}
              {this.props.isFromRWD ? this.state.isRWDFilterSelected ? <div className='selectedFacet'>•</div> : null : null}
              {this.props.isFromRWD ? null : this.state.active ? upArrow : downArrow}
            </div>
          </div>

          {!isMobile() && <ul className={`dropdown_filter__list ${this.state.active ? 'dropdown_filter__list--active' : ''}`}>
            {this.state.facetItem}
            <div className='clearfix'></div>
            <div className="filterbtnWrapper">
              <button onClick={() => this.onCancelBtnClick()} className="dropdown_filter__cancelBtn btn">Cancel</button>
              <button onClick={() => this.onApplyBtnClick()} className="dropdown_filter__applyBtn btn">Apply</button>
            </div>
          </ul>}

          {isMobile() && <div className='filter-data-list'><ul
            className={`dropdown_filter__list ${
              this.state.active ? 'dropdown_filter__list--active' : ''
              }`}
          >
            {this.state.facetItem}
            {isMobile() && <><div className='clearfix'></div>

              <div className="filterbtnWrapper">
                <button onClick={() => this.onCancelBtnClick()} className="dropdown_filter__cancelBtn btn" >Cancel</button>
                <button onClick={() => this.onApplyBtnClick()} className="dropdown_filter__applyBtn btn">Apply</button>
              </div></>}
          </ul></div>}



        </div>
      </>
    );
  }
}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => ({
  onFilterUpdate: (updatedArr, facetName) =>
    dispatch(actionCreators.filter(updatedArr, facetName)),
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
)(Filter);