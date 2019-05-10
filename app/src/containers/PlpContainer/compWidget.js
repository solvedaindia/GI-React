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
    this.state = {};
  }

  buildData = () => {
    console.log('frd in compwidget', this.props);
    const data = [];
    if (this.props.compData.length > 0) {
      this.props.compData.forEach(element => {
        data.push(
          <CompItem product={element} remove={this.props.removeProduct} />,
        );
      });
    }
    return data;
  };

  render() {
    return (
      <div>
        <div className="container comp">
          <ul>{this.buildData()}</ul>
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
