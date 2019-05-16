import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import axios from 'axios';
import {
    getReleventReduxState
  } from '../../utils/utilityManager';

export class ComparePageContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }
}

const mapStateToProps = state => {
    const stateObj = getReleventReduxState(state, 'plpContainer');
    return {
      
    };
};

const withConnect = connect(
    mapStateToProps
  );
  
//   const withReducer = injectReducer({ key: 'plpContainer', reducer });
//   const withSaga = injectSaga({ key: 'plpContainer', saga });
  
  export default compose(
    withConnect,
  )(PlpContainer);