import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { validateEmptyObject } from '../../../utils/validationManager';
import apiManager from '../../../utils/apiManager';
import { guestTrackOrderAPI } from '../../../../public/constants/constants';
import '../../../../public/styles/guestTrackOrder.scss';
import { isMobile, getCookie } from '../../../utils/utilityManager';
import {HELLO_GUEST, ORDER_NO, GO_BACK} from '../../../constants/app/myAccountConstants';

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

  componentDidMount() {
    if (getCookie('isLoggedIn') === 'true') {
      this.props.history.push('/')
    }
  }

  handleInputChange(text) {
    this.setState({
      error: false,
      inputText: text.target.value.replace(/[^0-9]/g, ''),
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

    apiManager.get(`${guestTrackOrderAPI}${this.state.inputText}`)
      .then(response => {
        this.props.history.push({ pathname: '/myAccount', state: {from: 'myorder', isGuestTrackOrder: true, orderData:[response.data.data]}});
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        this.setState({
          error: true,
          errorMessage: errorMessage,
        });
      });
 
  }

  
  onKeyPress=(event)=>
  {
    if(event.key === 'Enter'){
      this.submitBtnClicked();
    } 
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
         {HELLO_GUEST}
        </h3>}
        <div className='form-group'>
          {isMobile() && <label className='form-label'>{ORDER_NO}</label>}
          <input
            className="form-control"
            placeholder="Enter order number"
            onChange={this.handleInputChange.bind(this)}
            onKeyPress={this.onKeyPress}
          />
          {errorItem}
        </div>
        <div className='track-order-btn'>
          <button
            className="submitBtn"
            onClick={this.submitBtnClicked.bind(this)}
          >
            {!isMobile() ? 'Track Order' : 'Submit'}
          </button>
        </div>

        <div className='back-btn'>
			
          <Link to='#' onClick={this.goBack} className='go-back'>{GO_BACK}</Link>
        </div>
      </div>
    );
  }
  
	goBack = (event) => {
  window.history.go(-1);
  event.preventDefault();
	}
}



export default GuestTrackOrder;
