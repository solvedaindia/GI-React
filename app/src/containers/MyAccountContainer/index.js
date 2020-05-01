import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import ServiceRequestForm from '../../components/ServiceRequestForm/index';
import {
  getReleventReduxState,
  resolveTheFilter,
  getCookie,
  isMobile,
} from '../../utils/utilityManager';
import '../../../public/styles/myAccount/myAccount.scss';
import * as actionCreators from './actions';
import apiManager from '../../utils/apiManager';
import { plpSubCatAPI } from '../../../public/constants/constants';
import '../../../public/styles/myAccount/myAccount.scss';
import ChangePassword from '../../components/MyAccountComponents/ChangePassword/changePassword';
import MyProfile from '../../components/MyAccountComponents/MyProfile/myProfile';
import ManageAddress from '../../components/MyAccountComponents/ManageAddress/manageAddress';
import MyOrder from '../../components/MyAccountComponents/MyOrder/myOrder';
import RWDMyOrder from '../../components/MyAccountComponents/MyOrder/RWDMyOrder/RWDmyOrder';
import MyServiceRequest from '../../components/MyAccountComponents/MyServiceRequest/index';

export class MyAccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileName: null,
      changePasswordTag: null,
      redirectedFrom: null,
    };
    this.myProfileCallback = this.myProfileCallback.bind(this);
  }

  componentDidMount() {
    if (getCookie('isLoggedIn') !== 'true' && !this.props.location.state) {
      this.props.history.push('/')
      return;
    }
  }

  componentWillReceiveProps(nextProp) {
    if (getCookie('isLoggedIn') !== 'true' && !this.props.location.state) {
      this.props.history.push('/')
      return;
    }

    // if (nextProp.location.state !== this.props.location.state) {
      this.setState({
        redirectedFrom: nextProp.location.state ? nextProp.location.state.from : null,
      })
    // }
  }
 
  scrollTop(){
    window.scrollTo(0,0);
  }

  myProfileCallback(userName, passwordTag) {
    this.setState({
      profileName: userName,
      changePasswordTag: passwordTag
    })
  }

  onCustomerCareClick() {
    this.props.history.push('/support');
  }

  onMyProfileClick() {
   this.scrollTop();
   this.props.history.replace({ pathname: '/myAccount', state: {from:'myprofile'}}); 
  //  this.setState({
  //     redirectedFrom: 'myprofile'
  //   })   
  }

  onPasswordClick() {
    this.scrollTop();
    this.props.history.replace({ pathname: '/myAccount', state: {from:'password'}}); 
    // this.setState({
    //   redirectedFrom: 'password'
    // })
  }

  onMyServiceRequestClick() {
    this.scrollTop();
    this.props.history.replace({ pathname: '/myAccount', state: {from:'serviceRequest'}}); 
   //  this.setState({
   //     redirectedFrom: 'myprofile'
   //   })   
   }

  onMyOrderClick() {
    this.scrollTop();
    // this.setState({
    //   redirectedFrom: 'myorder'
    // })
    this.props.history.replace({ pathname: '/myAccount', state: {from:'myorder'}});
  }

  onAddressClick() {
    this.scrollTop();
    this.props.history.replace({ pathname: '/myAccount', state: {from:'address'}});
    // this.setState({
    //   redirectedFrom: 'address'
    // })
  }

  render() {
    var guestOrderData;
    var isGuestTrackOrder;
    if (this.state.redirectedFrom === null) {
      if (this.props.location.state != undefined) {
        this.state.redirectedFrom = this.props.location.state.from;
      } else {
        this.state.redirectedFrom = 'myprofile'

      }
    }

    // if (this.state.redirectedFrom) {
    //   guestOrderData = this.props.location.state.orderData;
    // }

    if (this.props.location.state != undefined) {
      isGuestTrackOrder = this.props.location.state.isGuestTrackOrder;
      guestOrderData = this.props.location.state.orderData;
    }

    const navigationBar = (
      <div className="col-xs-12 col-sm-3 col-md-3 myaccount-leftnav">
        <ul className="nav nav-tabs">
          {this.state.profileName !== null && this.state.profileName !== undefined ? <h4 className="username">Hello {this.state.profileName.split(' ')[0]}!</h4> : null}
          {/* {this.props.username !== null ? (
            <h4 className="username">{this.props.username}!</h4>
          ) : null} */}
          <li className="list">
            <a onClick={this.onMyProfileClick.bind(this)} className={`link ${this.state.redirectedFrom === 'myprofile' ? 'active show' : ''}`}/*  href="#profile-v" */ /* data-toggle="tab" */>
              My Profile
            </a>
          </li>
          <li className="list">
            <a onClick={this.onPasswordClick.bind(this)} className={`link ${this.state.redirectedFrom === 'password' ? 'active show' : ''}`}/*  href="#changePassword-v" */ /* data-toggle="tab" */>
              Change Password
            </a>
          </li>
          <li className="list">
            <a onClick={this.onMyServiceRequestClick.bind(this)} className={`link ${this.state.redirectedFrom === 'serviceRequest' ? 'active show' : ''}`}/*  href="#profile-v" */ /* data-toggle="tab" */>
              My Service Request
            </a>
          </li>
          <li className="list">
            <a onClick={this.onMyOrderClick.bind(this)} className={`link ${this.state.redirectedFrom === 'myorder' ? 'active show' : ''}`} /* href="#myOrder-v" */ /* data-toggle="tab" */>
              My Orders
            </a>
          </li>
          <li className="list">
            <a onClick={this.onAddressClick.bind(this)} className={`link ${this.state.redirectedFrom === 'address' ? 'active show' : ''}`} /* href="#manageAddresses-v" */ /* data-toggle="tab" */>
              Manage Addresses
            </a>
          </li>
          {/* <li className='list'><a className='link' href="#godrejCredit-v" data-toggle="tab">Godrej Credit</a></li>
          <li className='list'><a className='link' href="#giftCards-v" data-toggle="tab">Gift Cards</a></li>
          <li className='list'><a className='link' href="#notifications-v" data-toggle="tab">Notifications</a></li> */}
          <li onClick={this.onCustomerCareClick.bind(this)} className='list'>
            <a className='link' href="#customercare-v" data-toggle="tab">Customer Care</a>
          </li>
        </ul>
      </div>
    );

    return (
      <div className="MyAccount">
        <div className="container">
          <div className="row">
            {isGuestTrackOrder ? null : navigationBar}
            <div
              className={
                isGuestTrackOrder
                  ? `col-xs-12 col-sm-12 col-md-12`
                  : `col-xs-12 col-sm-9 col-md-9 myOnGoingOoders`
              }
            >
              <div className="tab-content">
                <div className={`tab-pane ${this.state.redirectedFrom === 'myprofile' ? 'active' : ''}`}/*  id="profile-v" */ >
                  {' '}
                  <MyProfile myProfileCallbackPro={this.myProfileCallback}  restrictRefresh={this.state.redirectedFrom}/>
                </div>
                <div className={`tab-pane ${this.state.redirectedFrom === 'password' ? 'active' : ''}`}/*  id="changePassword-v" */ >
                  <ChangePassword changePasswordTagPro={this.state.changePasswordTag} />
                </div>
                <div className={`tab-pane ${this.state.redirectedFrom === 'serviceRequest' ? 'active' : ''}`}/*  id="serviceRequest-v" */ >
                  <MyServiceRequest />
                </div>
                <div className={`tab-pane ${this.state.redirectedFrom === 'myorder' ? 'active' : ''}`}/*  id="myOrder-v" */ >
                  {isMobile() ? <div className='row ongoing-order'><RWDMyOrder isGuestTrackOrderPro={isGuestTrackOrder} guestOrderDataPro={guestOrderData} /></div> :
                    <MyOrder isGuestTrackOrderPro={isGuestTrackOrder} guestOrderDataPro={guestOrderData} />}
                </div>
                <div className={`tab-pane ${this.state.redirectedFrom === 'address' ? 'active' : ''}`} /* id="manageAddresses-v" */>
                  <ManageAddress />
                </div>
                <div className="tab-pane" id="customercare-v">Customer Care Tab.</div>
                {/* <div className="tab-pane" id="godrejCredit-v">Godrej Credit Tab.</div>
                <div className="tab-pane" id="giftCards-v">Gift Cards Tab.</div>
                <div className="tab-pane" id="notifications-v">Notifications Tab.</div> */}



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
//   const stateObj = getReleventReduxState(state, 'global');
//   const updatedUsername = getReleventReduxState(stateObj, 'userName');

//   return {
//     username: updatedUsername,
//   };
// }

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

// export default withRouter(HeaderMobile);
export default connect(withRouter)(MyAccountContainer);
