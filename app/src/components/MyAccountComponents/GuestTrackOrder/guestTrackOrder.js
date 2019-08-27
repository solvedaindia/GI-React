import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { validateEmptyObject } from '../../../utils/validationManager';
import apiManager from '../../../utils/apiManager';
import { changePasswordAPI } from '../../../../public/constants/constants';
import '../../../../public/styles/guestTrackOrder.scss';
import {isMobile} from '../../../utils/utilityManager';

class GuestTrackOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      error: false,
      errorMessage: null,
      inputText: null,
    };
  }

  handleInputChange(text) {
    this.setState({
      error: false,
      inputText: text.target.value,
    });
  }

  submitBtnClicked() {
    if (!validateEmptyObject(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: 'Please enter OrderID',
      });
      return;
    }

    this.setState({
      error: false,
      redirect: true,
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: '/myAccount',
            state: { from: 'myorder', isGuestTrackOrder: true },
          }}
        />
      );
    }

    let errorItem = null;
    if (this.state.error) {
      errorItem = <p className="error-msg">{this.state.errorMessage}</p>;
    }

    return (
      <div className="guestTrackOrder">
         {!isMobile() && <h3 className="helloGuestMsg clearfix">
          Hello Guest! Please enter your Order Number to track
        </h3>}
        <div className='form-group'>
        {isMobile() && <label className='form-label'>Order Number</label>}
        <input
          className="form-control"
          placeholder="Enter order number"
          onChange={this.handleInputChange.bind(this)}
        />
        {errorItem}
        </div>
        {/* <Link to={{ pathname: '/myAccount', state: { from: 'myorder', isGuestTrackOrder: true } }}> */}
        <div className='track-order-btn'>
          <button
            className="submitBtn"
            onClick={this.submitBtnClicked.bind(this)}
          >
            Track Order
          </button>
        </div>
        {/* </Link> */}

        {isMobile() &&<div className='back-btn'>
           <Link to='/' className='go-back'>Go back</Link>
          </div>}
      </div>
    );
  }
}

export default GuestTrackOrder;
