import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { getReleventReduxState } from '../../utils/utilityManager';
import '../../../public/styles/compWidget.scss';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
// import makeSelectPlpContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actionCreators from './actions';
import CompItem from '../../components/PlpComponent/compItem';

import plus from '../../../public/images/plusIcon.svg';
import { Route, NavLink, Link } from 'react-router-dom';

import DownArrow from '../../../public/images/down-arrow.svg';
import UpArrow from '../../../public/images/up-arrow.svg';


export class CompContainer extends React.Component {
  constructor(props) {
    super(props);
    this.buildData = this.buildData.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleGoToCompare = this.handleGoToCompare.bind(this);
    this.state = {
      showCompare: true,
      modalClass: 'open'
    };
  }

  buildData() {
    console.log('frd in compwidget', this.props);
    const addDiv = (
      <li className="list">
        <div className='addproduct-box'>
          <button className='add-icon'><img src={plus}/></button>
          <div className='addproduct-text'>Add Product</div>
        </div>
      </li>
    );
    const data = [];
    if (this.props.compData.length > 0) {
      this.props.compData.forEach((element, index) => {
        data.push(
          <CompItem key={index} product={element} remove={this.props.removeProduct} />
        );
      });
    }

    if (data.length == 1) {
      data.push(addDiv);
      data.push(addDiv);
    }
    if (data.length == 2) {
      data.push(addDiv);
    }
    return data;
  }

  componentWillReceiveProps(newProps) {
    if(newProps.compData.length > this.props.compData.length) {
      this.setState({
        modalClass: 'open'
      })
    }
  }

  showHideCompare = () => {
    if(this.state.modalClass == 'open') {
      this.setState({
        modalClass: '',
      })
    } else {
      this.setState({
        modalClass: 'open',
      })
    }
  }

  handleGoToCompare(e) { 
    // var element = document.getElementById("change");
    // element.classList.toggle("open");
    // this.setState({
    //   showCompare: false,
    //   modalClass: 'open',
    // })

      if(this.props.compData.length < 2) {
        e.preventDefault();
        alert('Please add at least two products to compare');
      }
  }
  clearAll() {
    this.props.removeAll();
  }

  render() {
    // alert(this.state.modalClass)
    return (
      <>
      {this.props.compData.length > 0 ? this.state.modalClass == 'open' ? <div className='compare'><button className='btnCompare' onClick={this.showHideCompare}> <img className='arrow' src={DownArrow} alt='downArrow'/> </button> </div>:
    <div className='compare'><button onClick={this.showHideCompare} className="btnCompare"> <img className='arrow' src={UpArrow} alt='upArrow'/></button><div className='clearfix'></div> <div className='comparelebal'>Compare</div></div> : ''}
    {this.props.compData.length > 0 ? <div  className={`animationDIV ${this.state.modalClass}`} id='change'>
      {/* {this.props.compData.length >= 0 && this.state.showCompare ?  */}
      <div  className='compareProductwrap'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="compareProducts">
                {this.buildData()}
                {this.props.compData.length > 0 ? <li className="list">
                    <Link to="/compare" className="btn-compare" onClick={(e) => this.handleGoToCompare(e)}>
                      Compare {this.props.compData.length}
                      /3
                    </Link>
                    <button className="btn-clearall" onClick={this.clearAll}>
                      Clear All
                    </button>
                    {/* <button className='btnCompare' onClick={this.showHideCompare}>
                      hide
                    </button> */}
                  </li> : ""}
              </ul>
            </div>
          </div>
        </div>
      </div> :
      {/* // : <button onClick={this.showHideCompare} className="btnCompare">
      //                 show
      //               </button> */}
      {/* 'uyu' */}
    {/* } */}
    </div> : ''}
    </>
    );
  }
}
const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {
    compData: stateObj.compWidgetData,
  };
};

const mapDispatchToProps = dispatch => ({
  removeProduct: id => dispatch(actionCreators.RemoveProduct(id)),
  removeAll: () => dispatch(actionCreators.RemoveAll()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'plpContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(CompContainer);
