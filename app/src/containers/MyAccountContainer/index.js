/**
 *
 * PlpContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
// import makeSelectPlpContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getReleventReduxState,
  resolveTheFilter,
} from '../../utils/utilityManager';
import '../../../public/styles/myAccount/myAccount.scss';
import * as actionCreators from './actions';
import apiManager from '../../utils/apiManager';
import {
  plpSubCatAPI,
} from '../../../public/constants/constants';
import '../../../public/styles/myAccount/myAccount.scss';

export class MyAccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }


  render() {
    return (
      <div class="container">
        <div className="row">
           <div className="col-xs-12 col-sm-3 col-md-3 myac-left-nav">
            <ul className="nav nav-tabs">
              <li><a href="#home-v" data-toggle="tab">Home</a></li>
              <li><a href="#profile-v" data-toggle="tab">Profile</a></li>
              <li><a href="#messages-v" data-toggle="tab">Messages</a></li>
              <li><a href="#settings-v" data-toggle="tab">Settings</a></li>
            </ul>
          </div>

          <div className="col-xs-12 col-sm-9 col-md-9">

            <div className="tab-content">
              <div className="tab-pane active" id="home-v">home tab</div>
              <div className="tab-pane" id="profile-v">Profile Tab.</div>
              <div className="tab-pane" id="messages-v">Messages Tab.</div>
              <div className="tab-pane" id="settings-v">Settings Tab.</div>
            </div>
          </div>
        </div>
        </div>
    );
  }
}


/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'myAccountContainer');
  return {

  };
};

const mapDispatchToProps = dispatch => ({

});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'myAccountContainer', reducer });
const withSaga = injectSaga({ key: 'myAccountContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MyAccountContainer);
