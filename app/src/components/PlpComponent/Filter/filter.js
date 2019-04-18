import React from 'react';
import { connect } from 'react-redux';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../containers/PlpContainer/actions';

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
    }
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

  filterOptions() {
    // if (!this.state.options) {
    //   return;
    // }
    // return this.state.options.map((option, i) => {
    //   return (
    //     <li
    //       onClick={evt => this.handleClick(i)}
    //       key={i}
    //       className={"dropdown__list-item " + (i === this.state.selected ? 'dropdown__list-item--active' : '')}
    //     >
    //         {option}

    //     </li>
    //   );
    // });

    return (
      <>
        <h1>kdfkddk</h1>
      </>

    )
  }

  render() {
    return (
      <div ref={node => { this.node = node; }} className="dropdown_filter">
        <div className="dropdown_filter__toggle dropdown_filter__list-item"
          onClick={() => this.toggleDropdown()}
        >
          Filter
          {this.state.active ? downArrow : upArrow}
        </div>
        <ul className={"dropdown__list " + (this.state.active ? 'dropdown__list--active' : '')}>{this.filterOptions()}</ul>
      </div>
      // <>
      //   <h1 onClick={this.props.onFilterUpdate}>Filterrrr</h1>
      // </>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    onFilterUpdate: () => dispatch(actionCreators.filter('Master Filter New')),
  }
};

const mapStateToProps = state => {
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
)(Filter);


