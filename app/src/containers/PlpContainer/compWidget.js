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
export class CompContainer extends React.Component {
  constructor(props) {
    super(props);
    this.buildData = this.buildData.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.state = {};
  }

  buildData() {
    console.log('frd in compwidget', this.props);
    var addDiv = <li className="list"><h4>Add Product</h4></li>
    const data = [];
    if (this.props.compData.length > 0) {
      this.props.compData.forEach(element => {
        data.push(
          <CompItem product={element} remove={this.props.removeProduct} />,
        );
      });
    }

    if(data.length == 1) {
      data.push(addDiv);
      data.push(addDiv);
    }
    if(data.length == 2) {
      data.push(addDiv);
    }
    return data;
  };

  clearAll() {
    this.props.removeAll();
  }

  render() {
    return (
      <div className='compareProductwrap'>
        <div className="container">
         <div className='row'>
          <div className='col-md-12'>
            <ul className='compareProducts'>{this.buildData()}
              {this.props.compData.length > 0 ? <li className="list">
              <button className="btn-large">Compare {this.props.compData.length}/3
              </button>
              <button className="btn-large" onClick={this.clearAll}>
                Clear All
              </button>
              </li> : ''}
            </ul>
          </div>
         </div>
        </div>
      </div>
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
  removeAll: () => dispatch(actionCreators.RemoveAll())
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
