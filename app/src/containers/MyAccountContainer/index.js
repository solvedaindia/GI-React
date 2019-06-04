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
import ChangePassword from '../../components/MyAccountComponents/ChangePassword/changePassword';
import MyProfile from '../../components/MyAccountComponents/MyProfile/myProfile';
import ManageAddress from '../../components/MyAccountComponents/ManageAddress/manageAddress';

export class MyAccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }


  render() {
    return (
     <div className='MyAccount'>
      <div className="container">
        <div className="row">
           <div className="col-xs-12 col-sm-3 col-md-3 myaccount-leftnav">
            <ul className="nav nav-tabs">
              <h4 className='username'>Hello Jonathan!</h4>
              <li className='list'><a className='link active' href="#profile-v" data-toggle="tab">My Profile</a></li>
              <li className='list'><a className='link' href="#changePassword-v" data-toggle="tab">Change Password</a></li>
              <li className='list'><a className='link' href="#myOrder-v" data-toggle="tab">My Orders</a></li>
              <li className='list'><a className='link' href="#manageAddresses-v" data-toggle="tab">Manage Addresses</a></li>
              {/* <li className='list'><a className='link' href="#godrejCredit-v" data-toggle="tab">Godrej Credit</a></li>
              <li className='list'><a className='link' href="#giftCards-v" data-toggle="tab">Gift Cards</a></li>
              <li className='list'><a className='link' href="#notifications-v" data-toggle="tab">Notifications</a></li>
              <li className='list'><a className='link' href="#customercare-v" data-toggle="tab">Customer Care</a></li> */}
            </ul>
          </div>

          <div className="col-xs-12 col-sm-9 col-md-9">
            <div className="tab-content">
              <div className="tab-pane active" id="profile-v"> <MyProfile /></div>
              <div className="tab-pane" id="changePassword-v"><ChangePassword /></div>
              <div className="tab-pane" id="myOrder-v">My Order Tab.</div>
              <div className="tab-pane" id="manageAddresses-v"><ManageAddress /></div>
              {/* <div className="tab-pane" id="godrejCredit-v">Godrej Credit Tab.</div>
              <div className="tab-pane" id="giftCards-v">Gift Cards Tab.</div>
              <div className="tab-pane" id="notifications-v">Notifications Tab.</div>
              <div className="tab-pane" id="customercare-v">Customer Care Tab.</div> */}
            </div>
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
