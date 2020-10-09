import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import {PLEASE_WAIT } from '../../constants/app/checkoutConstants';

import {
  storeId,
  accessToken,
  accessTokenCookie,
  OrderDetailAPI,
  CheckoutAPI
} from '../../../public/constants/constants';
import appCookie from '../../utils/cookie';
import { Redirect } from 'react-router-dom'
export default class PaymentWait extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      orderId: ''
    };
  }

  componentDidMount() {
      var orderId = this.props.match.params.orderId;
      let token = appCookie.get('accessToken');
      var data = {
        orderId: orderId
      }
      axios.post(CheckoutAPI, data, {
          headers: { store_id: storeId, access_token: token }
      }).then((res) => {
          if(res.data.data.orderPlaced == true) {
              window.location.assign(`${window.location.origin}/order/confirm/${orderId}`)
              
          } else {
            window.location.assign(`${window.location.origin}/checkout?status=fail`)
          }
      }).catch((err) => {
        window.location.assign(`${window.location.origin}/checkout?status=fail`)
      })
  }
  
  
  render() {
    return (
        <div className='redirectedMsg'>
            <h3>{PLEASE_WAIT}</h3>
        </div>
    );
  }
}