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
        <div className='tabBar'>
          <button onClick={this.collapseExpendClicked.bind(this)}>{this.state.expendCollapseText}</button>
        </div>
        <div className='itemBox'>
          {this.state.isExpend ? <OrderSummery /> : null}
          <OrderProduct />
          <OrderProduct />
        </div>
      </>
    );
  }
}

export default OrderItem;
