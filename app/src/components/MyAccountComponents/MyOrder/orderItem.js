import React from 'react';
import apiManager from '../../../utils/apiManager';
import {
  changePasswordAPI
} from '../../../../public/constants/constants';
import OrderProduct from './orderProduct';
import OrderSummery from './orderSummery';

class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpend: false,
      expendCollapseText: 'Expend'
    };
  }

  collapseExpendClicked() {
    this.setState({
      isExpend: !this.state.isExpend,
      expendCollapseText: !this.state.isExpend ? 'Collapse' : 'Expend'
    })
  }

  render() {
    return (
      <>
        <div className='tabBar clearfix'>
          <ul className='heading clearfix'>
            <li className='list'><span className='heading-top'>Order ID</span> <span className='heading-sub'>1102400467</span></li>
            <li className='list'><span className='heading-top'>Ordered on</span> <span className='heading-sub'>Fri, 21 Dec 2018</span></li>
            <li className='list'><span className='heading-top'>Status</span> <span className='heading-sub'>Partially Shipped</span></li>
            <li className='list'><span className='heading-top'>Total</span> <span className='heading-sub'>₹60,000</span></li>
          </ul>
          <button className='btn-collapse' onClick={this.collapseExpendClicked.bind(this)}>Order Details {this.state.expendCollapseText}</button>
        </div>
        <div className='itemBox'>
          {this.state.isExpend ? <OrderSummery /> : null}
          <OrderProduct />
         
        </div>
      </>
    );
  }
}

export default OrderItem;
