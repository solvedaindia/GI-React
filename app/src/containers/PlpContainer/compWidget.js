import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getReleventReduxState } from '../../utils/utilityManager';
import '../../../public/styles/compWidget.scss';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import * as actionCreators from './actions';
import CompItem from '../../components/PlpComponent/compItem';

import plus from '../../../public/images/plusIcon.svg';
import { Link } from 'react-router-dom';
import { MINCOMPARECOUNT_MSG } from '../../constants/app/primitivesConstants';
import DownArrow from '../../../public/images/down-arrow.svg';
import UpArrow from '../../../public/images/up-arrow.svg';
import appCookie from '../../utils/cookie';

export class CompContainer extends React.Component {
  constructor(props) {
    super(props);
    this.buildData = this.buildData.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleGoToCompare = this.handleGoToCompare.bind(this);
    this.state = {
      showCompare: true,
      modalClass: 'open',
      isLoading: true,
    };
  }

  shouldComponentUpdate(nextProps, nextState)
  {
    return true;
  }

  filterCookieData() {
    this.setState({
      isLoading: true
    })
  }

  buildData(compData) {
    const addDiv = (
      <li className="list">
        <div className='addproduct-box'>
          <button className='add-icon'><img src={plus} alt='plusIcon'/></button>
          <div className='addproduct-text'>Add Product</div>
        </div>
      </li>
    );
    const data = [];
    if (compData.length > 0) {
      compData.forEach((element, index) => {
        data.push(
          <CompItem key={index} product={element} remove={this.props.removeProduct} filterCookie={this.filterCookieData.bind(this)} />
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

  componentDidMount() {
  
  }

  componentWillReceiveProps(newProps) { 
    if ((newProps.compData.length > this.props.compData.length) || (appCookie.get('compareProduct') && JSON.parse(appCookie.get('compareProduct')).length > 0 ))  {
      this.setState({
        modalClass: 'open',
        isLoading: false
      })
    }
  }

  showHideCompare = () => {
    if (this.state.modalClass == 'open') {
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
    let handleCompData = [];
    if (this.props.compData.length > 0) {
      handleCompData = this.props.compData;
    } else {
      handleCompData = JSON.parse(appCookie.get('compareProduct'));
    }

    if (handleCompData.length < 2) {
      e.preventDefault();
      alert(MINCOMPARECOUNT_MSG);
    }
    else{
      appCookie.set('compareProductTemp', appCookie.get('compareProduct'), 365 * 24 * 60 * 60 * 1000);
      appCookie.set('compareProduct', '', 365 * 24 * 60 * 60 * 1000);
      this.props.removeAll();
    }
  }
  clearAll() {
    appCookie.set('compareProduct', '', 365 * 24 * 60 * 60 * 1000);
    appCookie.set('compareProductTemp', '', 365 * 24 * 60 * 60 * 1000);
    this.props.removeAll();
  }

  render() {
    var searchParam = '';
    var compIdData =[];
    let compData = [];
    if (this.props.compData.length > 0 || this.state.isLoading === false) {
      appCookie.set('compareProduct', JSON.stringify(this.props.compData), 365 * 24 * 60 * 60 * 1000);
      compData =  JSON.parse(appCookie.get('compareProduct'));
    } else if (appCookie.get('compareProduct') && JSON.parse(appCookie.get('compareProduct').length > 0)) {
      compData =  JSON.parse(appCookie.get('compareProduct'));
    }
    if (compData.length !== 0) {
      compData.forEach(element => {
        compIdData.push(element.skuId);
      });
      compIdData.map((skuId, index) => {
        searchParam += `${skuId}${compIdData.length === index + 1 ? '' : '/'}`
      })
    }



    return (
      <>
        {compData.length > 0 ? this.state.modalClass == 'open' ? <div className='compare'><button className='btnCompare' onClick={this.showHideCompare}> <img className='arrow' src={DownArrow} alt='downArrow' /> </button> </div> :
          <div className='compare'><button onClick={this.showHideCompare} className="btnCompare"> <img className='arrow' src={UpArrow} alt='upArrow' /></button><div className='clearfix'></div> <div className='comparelebal'>Compare</div></div> : ''}
        {compData.length > 0 ? <div className={`animationDIV ${this.state.modalClass}`} id='change'>
          <div className='compareProductwrap'>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <ul className="compareProducts">
                    {this.buildData(compData)}
                    {compData.length > 0 ? <li className="list">
                      <Link className="btn-compare" to={{pathname: '/compare'}} onClick={(e) => this.handleGoToCompare(e)} >
                        Compare {compData.length}
                        /3
                    </Link>
                      <button className="btn-clearall" onClick={this.clearAll}>
                        Clear All
                    </button>
                    </li> : ""}
                  </ul>
                </div>
              </div>
            </div>
          </div> :
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
