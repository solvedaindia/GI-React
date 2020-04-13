import React from 'react';
import apiManager from '../../../utils/apiManager';
import { changePasswordAPI } from '../../../../public/constants/constants';
import OrderProduct from './orderProduct';
import OrderSummery from './orderSummery';
import {isMobile} from '../../../utils/utilityManager';

const showImg = <img className='iconImg' src={require('../../SVGs/plusIcon.svg')}  alt='Increase'/>
const hideImg = <img className='iconImg' src={require('../../SVGs/minusIcon.svg')}  alt='Decrease'/>
class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpend: false,
      expendCollapseText: showImg,
    };
  }

  collapseExpendClicked() {
    this.setState({
      isExpend: !this.state.isExpend,
      expendCollapseText: !this.state.isExpend ? hideImg : showImg,
    });
  }

  proceedToTrackOrder(trackOrderData) {
    this.props.renderSelectionPro(trackOrderData);
  }

  render() {
    const orderData = this.props.orderItemData;

    return (
      <>
        <div className="tabBar clearfix">
          <ul className="heading clearfix">
            <li className="list">
              <span className="heading-top">Order ID</span>{' '}
              <span className="heading-sub">{orderData.orderID}</span>
            </li>
            <li className="list">
              <span className="heading-top">Ordered on</span>{' '}
              <span className="heading-sub">{orderData.orderDate}</span>
            </li>
            <li className="list">
              <span className="heading-top">Status</span>{' '}
              <span className="heading-sub">{orderData.orderStatus}</span>
            </li>
            <li className="list">
              <span className="heading-top">Total</span>{' '}
              <span className="heading-sub">₹{orderData.orderSummary.netAmount}</span>
            </li>
          </ul>
          <button
            className="btn-collapse"
            onClick={this.collapseExpendClicked.bind(this)}
          >
            Order Details
            {this.state.expendCollapseText}
          </button>
        </div>
        <div className="itemBox">
          {/* {this.state.isExpend ? <div className={`orderSummery ${this.state.isExpend ? `heightActive` : `heightInActive`}`}>
            <OrderSummery />
          </div> : null} */}
          {/* Check if the Invoice belongs to the Customer of not -TODO */}
          <div className={`orderSummery  clearfix ${this.state.isExpend ? `heightActive` : `heightInActive`}`}>
            <OrderSummery summeryDataro={orderData.orderSummary}
              addressDataPro={orderData.address}
              paymentMethodPro={orderData.paymentMethod}
              invoiceDataPro={orderData.invoices}
               />
          </div>
          {orderData.orderItems.map((data, key) => {
            return (
              <OrderProduct
                totalItems={orderData.orderItems.length}
                itemIndex={key}
                proceedToTrackOrderPro={this.proceedToTrackOrder.bind(this)}
                prodctDataPro={data}
                showCancelModal={(orderItem)=>{this.props.showCancelModal(orderData,orderItem)}}
                allDataPro={this.props.orderItemData}
              />
            )
          })}
          <button className="btn-bg" style={{width:'100%',backgroundColor:'#005084'}} onClick={(evt)=>{this.props.showCancelModal(orderData,undefined)}} >
              Cancel Order
          </button> 
        </div>
      </>
    );
  }
}

export default OrderItem;
