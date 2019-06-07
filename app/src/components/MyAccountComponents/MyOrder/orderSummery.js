import React from 'react';
import apiManager from '../../../utils/apiManager';
import {
  changePasswordAPI
} from '../../../../public/constants/constants';

class OrderSummery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className='orderSummery'>
      <div className={'collapsible' + (true? ' active': '')}>
        <h2>Order Summery</h2>
        </div>
      </div>
    );
  }
}

export default OrderSummery;
