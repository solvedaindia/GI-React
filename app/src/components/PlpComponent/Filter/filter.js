import React from 'react';
import { connect } from 'react-redux';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import { getReleventReduxState } from '../../../utils/utilityManager';

const downArrow = (
  <img className='dropdownArrow' src={require('../../../../public/images/plpAssests/drop-down-arrow-down.svg')} />
);
const upArrow = (
  <img className='dropdownArrow' src={require('../../../../public/images/plpAssests/drop-down-arrow-up.svg')} />
);
class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 0,
      options: ['recommended', 'price_L_H', 'price_H_L', 'newArrival'],
      //facetMap: new Map(),
      facetItem: null,
      facetArr: [],
      checked: false,
    }
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.onCheckBoxClick = this.onCheckBoxClick.bind(this)
    this.onCancelBtnClick = this.onCancelBtnClick.bind(this)
    this.onApplyBtnClick = this.onApplyBtnClick.bind(this)
  }

  toggleDropdown() {
    if (!this.state.active) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.unCkeckAll();
    [...document.getElementsByClassName('checkboxSelected' + this.props.dataPro.facetName)].map((input) => {
        input.checked = 'checked';
    })

    let filteredArr = [];
    for (const [key, value] of this.props.updatedFilter) {
      if (key === this.props.dataPro.facetName) {
        value.map((option, i) => {
          filteredArr.push(option)
        })
      }
    }
    
    //this.setState({facetArr: filteredArr})

    this.setState({
      active: !this.state.active,
      facetArr: filteredArr
    });
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.toggleDropdown();
  }


  onCheckBoxClick(index) {
    const selectedFacet = this.props.dataPro.facetValues[index];

    let filteredArr = [...this.state.facetArr];
    //console.log('FilterArr---',this.state.facetArr);
    const extFacetArr = this.state.facetArr.map(item => {
      console.log('exstractedArr --- ',item.value);
      return item.value;
    })
    if (!extFacetArr.includes(selectedFacet.value)) {
      filteredArr.push(selectedFacet)
      // this.setState({ facetArr: filteredArr })
    }
    else {
      filteredArr = this.state.facetArr.filter(function (value, i, arr) {
        console.log('else value -- ',value, selectedFacet);
        if (value.value != selectedFacet.value) {
          return value;
        }
      });
    }
    console.log('Selected --- ',filteredArr);
    this.setState({ facetArr: filteredArr })
  }

  onCancelBtnClick() {
    

    this.toggleDropdown();
  }

  unCkeckAll() {
    [...document.getElementsByClassName('checkbox' + this.props.dataPro.facetName)].map((input) => {
      // console.log('uncheck---', input);
      if (input.checked) {
        input.checked = !input.checked;
      }
      return null;
    })
  }

  componentDidMount() {
    var alreadyAddedFiltersArr = [];
    let filteredArr = [...this.state.facetArr];
    for (const [key, value] of this.props.updatedFilter) {
      if (key === this.props.dataPro.facetName) {
        value.map((option, i) => {
          filteredArr.push(option)
          alreadyAddedFiltersArr.push(option);
        })
      }
    }

    
    this.setState({facetArr: filteredArr})
    const extFacetArr = filteredArr.map(item => {
      //console.log('exstractedArr --- ',item.value);
      return item.value;
      
    })
    this.filterOptions(extFacetArr);
  }



  onApplyBtnClick() {
    console.log('TotalFace---', this.state.facetArr);
    // if (this.state.facetArr.length !== 0) {
      this.props.onFilterUpdate(this.state.facetArr, this.props.dataPro.facetName)
    // }
  }

  filterOptions(alreadyAddedFiltersArr) {
    console.log('Redux Filter -- ',alreadyAddedFiltersArr);
    //return this.props.dataPro.facetValues.map((option, i) => {
    var item = this.props.dataPro.facetValues.map((option, i) => {

      var checkboxItem;
      if (alreadyAddedFiltersArr.includes(option.value)) {
        checkboxItem = <input className={'checkboxSelected' + this.props.dataPro.facetName} onChange={evt => this.onCheckBoxClick(i)} defaultChecked={true} type="checkbox" id="chk" name="scales" />
        console.log('ITsChecked----', checkboxItem);
      }
      else {
        checkboxItem = <input className={'checkbox' + this.props.dataPro.facetName} onChange={evt => this.onCheckBoxClick(i)} type="checkbox" id="chkkl" name="scales" />
        // checkboxItem = <input className={'checkbox'+this.props.dataPro.facetName} onChange={this.onCheckBoxClick.bind(this)} defaultChecked={this.state.checked} type="checkbox" name="scales" />
      }
      return (
        <div className='col-md-4'>
          {checkboxItem}
          <li onClick={evt => this.handleClick(i)} key={i} className={"dropdown__list-item " + (i === this.state.selected ? 'dropdown__list-item--active' : '')}>
            {option.label + ' (' + option.count + ')'}
          </li>
        </div>
      );
    });
    this.setState({
      facetItem: item
    })
  }

  render() {
    console.log('Selected Render --- ',this.state.facetArr);
    return (
      <>
        <div ref={node => { this.node = node; }} className="dropdown_filter">
          <div className="dropdown_filter__filter">
            <div className="dropdown_filter__toggle dropdown_filter__list-item"
              onClick={() => this.toggleDropdown()}
            >
              {this.props.dataPro.facetName}
            {this.state.active ? downArrow : upArrow}
            </div>

          </div>

          <ul className={"dropdown_filter__list " + (this.state.active ? 'dropdown_filter__list--active' : '')}>{this.state.facetItem}
            <div className="col-md-offset-4">
              <button onClick={() => this.onCancelBtnClick()} className='dropdown_filter__cancelBtn'>Cancel</button>
              <button onClick={() => this.onApplyBtnClick()} className='dropdown_filter__applyBtn'>Apply</button>
            </div>
          </ul>
        </div>
      </>
    )
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
)(Filter);


