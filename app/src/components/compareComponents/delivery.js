import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';
import { Row, Col, Grid } from 'react-bootstrap';

import close from '../../../public/images/close.svg';
import Link from 'react-router-dom/Link';
import appCookie from '../../utils/cookie';
import apiManger from '../../utils/apiManager';
import { storeId, accessToken, findinventoryAPI } from '../../../public/constants/constants';
import {DELIVERY_BETWEEN} from '../../constants/app/compareConstants'

import axios from 'axios';

class DelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryData: '',
      isLoading: true,
    }
  }
  componentDidMount() {
    this.callDeliveryDateAPI(this.props.skuData.partNumber);
  }

  callDeliveryDateAPI = (partNumber) => {
    var token = appCookie.get('accessToken');
    var defPin = appCookie.get('pincode');
    var url = `${findinventoryAPI}${defPin}?partNumber=${partNumber}&quantity=1`
    axios.get(url, {
      headers: {
        store_id: storeId,
        access_token: token
      }
    }).then((resp) => {
      console.log(resp.data.data.deliveryDate, "delivery date response")
      this.setState({
        deliveryData: resp.data.data.deliveryDate,
        isLoading: false,
      })
    }).catch((err) => {
      console.log(err, "delivery date err")
      this.setState({
        isLoading: false,
      })
    })
  }

  dotLoader() {
    return (
      <div class="loading-dots">
        <div class="loading-dots--dot"></div>
        <div class="loading-dots--dot"></div>
        <div class="loading-dots--dot"></div>
      </div>
    )
  }

  render() {
    return (
      <Col xs={12} sm={4} md={4}>
        <div className='DeliveryLoaderwrap'>
          <div className='DeliveryText'>{DELIVERY_BETWEEN}</div>
          <div className='loaderdiv'>{this.state.isLoading ? this.dotLoader() : <strong>{this.state.deliveryData}</strong>}</div>
        
        </div> 
      </Col>
    );
  }



}

export default DelContainer;
