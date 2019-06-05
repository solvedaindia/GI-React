

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
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

  componentWillReceiveProps(nextProp) {
    console.log('In My Account Next Props ---- ', this.props.location);
  }


  render() {
    console.log('In My Account ---- ', this.props.location);
    const redirectedFrom = this.props.location.state.from;

    return (
      <div className='MyAccount'>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-3 col-md-3 myaccount-leftnav">
              <ul className="nav nav-tabs">
                {this.props.username !== null ? <h4 className='username'>{this.props.username}!</h4> : null}
                <li className='list'><a className={`link ${redirectedFrom === 'myprofile' ? 'active' : ''}`} href="#profile-v" data-toggle="tab">My Profile</a></li>
                <li className='list'><a className={`link ${redirectedFrom === 'password' ? 'active' : ''}`} href="#changePassword-v" data-toggle="tab">Change Password</a></li>
                <li className='list'><a className={`link ${redirectedFrom === 'myorder' ? 'active' : ''}`} href="#myOrder-v" data-toggle="tab">My Orders</a></li>
                <li className='list'><a className={`link ${redirectedFrom === 'address' ? 'active' : ''}`} href="#manageAddresses-v" data-toggle="tab">Manage Addresses</a></li>
                {/* <li className='list'><a className='link' href="#godrejCredit-v" data-toggle="tab">Godrej Credit</a></li>
              <li className='list'><a className='link' href="#giftCards-v" data-toggle="tab">Gift Cards</a></li>
              <li className='list'><a className='link' href="#notifications-v" data-toggle="tab">Notifications</a></li>
              <li className='list'><a className='link' href="#customercare-v" data-toggle="tab">Customer Care</a></li> */}
              </ul>
            </div>

            <div className="col-xs-12 col-sm-9 col-md-9">
              <div className="tab-content">
                <div className={`tab-pane ${redirectedFrom === 'myprofile' ? 'active' : ''}`} id="profile-v"> <MyProfile /></div>
                <div className={`tab-pane ${redirectedFrom === 'password' ? 'active' : ''}`} id="changePassword-v"><ChangePassword /></div>
                <div className={`tab-pane ${redirectedFrom === 'myorder' ? 'active' : ''}`} id="myOrder-v">My Order Tab.</div>
                <div className={`tab-pane ${redirectedFrom === 'address' ? 'active' : ''}`} id="manageAddresses-v"><ManageAddress /></div>
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
// function mapStateToProps(state) {
//   console.log('MyAccount MapStatetoprops --- ', state);
//   const stateObj = getReleventReduxState(state, 'global');
//   const updatedUsername = getReleventReduxState(stateObj, 'userName');

//   return {
//     username: updatedUsername
//   };
// };

// const mapDispatchToProps = dispatch => ({

// });

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// const withReducer = injectReducer({ key: 'myAccountContainer', reducer });
// const withSaga = injectSaga({ key: 'myAccountContainer', saga });

// export default compose(
//   withReducer,
//   withSaga,
//   withConnect,
// )(MyAccountContainer);

export default connect(mapStateToProps)(MyAccountContainer);
