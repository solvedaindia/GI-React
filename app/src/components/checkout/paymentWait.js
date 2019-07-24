import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
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
        console.log(res, "checkout response");
          if(res.data.data.orderPlaced == true) {
              window.location.assign(`http://localhost:5000/order/confirm/${orderId}`)
              
          } else {
            window.location.assign('http://localhost:5000/checkout?status=fail')
          }
      }).catch((err) => {
        window.location.assign('http://localhost:5000/checkout?status=fail')
      })
  }
  
  
  render() {
    // if(this.state.redirect == "order") {
    //   return <Redirect to={`order/confirm/${this.state.orderId}`} />
    // }
    // if(this.state.redirect == "checkout") {
    //   return <Redirect to="checkout?status=fail" />
    // }
    return (
        <div>
            <h3>Please Wait, You are being redirected.</h3>
        </div>
    );
  }
}