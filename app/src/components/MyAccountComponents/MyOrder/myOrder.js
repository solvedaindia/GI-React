import React from 'react';
import apiManager from '../../../utils/apiManager';
import {
  changePasswordAPI
} from '../../../../public/constants/constants';
import '../../../../public/styles/myAccount/myOrder/myOrder.scss';
import OrderItem from './orderItem';

class MyOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className='myOrder'>
        <OrderItem/>
      </div>
    );
  }
}

export default MyOrder;
