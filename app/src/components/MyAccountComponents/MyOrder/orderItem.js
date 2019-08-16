import React from 'react';
import apiManager from '../../../utils/apiManager';
import { changePasswordAPI } from '../../../../public/constants/constants';
import OrderProduct from './orderProduct';
import OrderSummery from './orderSummery';
import {isMobile} from '../../../utils/utilityManager';

const showImg = <img className='iconImg' src={require('../../SVGs/plusIcon.svg')}/>
const hideImg = <img className='iconImg' src={require('../../SVGs/minusIcon.svg')}/>
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
    console.log('TackORderData --- ',trackOrderData);
    this.props.renderSelectionPro(trackOrderData);
  }

  render() {
    console.log('isGuestTrack----', this.props.orderItemData);
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
                proceedToTrackOrderPro={this.proceedToTrackOrder.bind(this)}
                prodctDataPro={data}
                allDataPro={this.props.orderItemData}
              />
            )
          })}
        </div>
      </>
    );
  }
}

export default OrderItem;
