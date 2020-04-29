import React from 'react';
import apiManager from '../../../../utils/apiManager';
import { changePasswordAPI, imagePrefix } from '../../../../../public/constants/constants';
import OrderProduct from '../orderProduct';
import OrderSummery from '../orderSummery';
import { isMobile } from '../../../../utils/utilityManager';
import RWDSingleProduct from './RWDSingleProduct'

const showImg = <img className='iconImg' src={require('../../../SVGs/plusIcon.svg')} alt='plusIcon'/>
const hideImg = <img className='iconImg' src={require('../../../SVGs/minusIcon.svg')} alt='hideIcon'/>
class RWDOrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpend: false,
      expendCollapseText: showImg,
    };
  }

  onViewOrderClick(data) {
    window.scrollTo(0,0);
    this.props.myOrderCallbackPro('ViewOrder', data)
  }

  onProductClick(data, completeData) {
    if (data.shipmentData.length > 1) {
      this.props.myOrderCallbackPro('MultiProduct', data, completeData)
    }
    else {
      this.props.myOrderCallbackPro('SingleProduct', data, completeData)
    }
  }

  getStatusDate(shipmentData, status) {
    var statusDate;
    if (status === 'Created') {
      statusDate = shipmentData.createdDate
    }
    else if (status === 'Packed') {
      statusDate = shipmentData.packedDate
    }
    else if (status === 'Shipped' || status === 'Shipping') {
      statusDate = shipmentData.shippedDate
    }
    else if (status === 'Delivered' || status === 'Delivery') {
      statusDate = shipmentData.deliveryDate
    }
    else if (status === 'Installed' || status === 'Installation') {
      statusDate = shipmentData.installationDate
    }
    return statusDate;
  }

  filterProductStat(shipmentData) {
    if(shipmentData && shipmentData.length>0){
      if (shipmentData.length > 1) {
        return <div className='itemStatus'>Multiple Shipments</div>
      }
      else {
        return <div className='itemStatus'>{shipmentData[0].status}<br />{this.getStatusDate(shipmentData[0], shipmentData[0].status)}</div>
      }
    }
  }

  render() {
    const orderData = this.props.orderItemData;
    const showCancelButton=orderData.orderCancelFlag==='Y';
    const disableCancelButton=orderData.orderCancelButtonDisable==='Y';
  //  console.log("orderCancelButtonDisable",showCancelButton,disableCancelButton);
    return (
      <>
        <div className="tabBar clearfix">
          <ul className="orders-short-desc-heading clearfix">
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
          </ul>
        </div>

        {orderData.orderItems.map((data, key) => {
          return (
            <div className="order-item-box" onClick={this.onProductClick.bind(this, data, orderData)}>
              <div className='itemImg'>
                <img className='imgBox' src={data.thumbnail !== '' ? `${imagePrefix}${data.thumbnail}` : require('../../../../../public/images/plpAssests/placeholder-image.png')} alt='placeHolder'/>
              </div>
              {this.filterProductStat(data.shipmentData)}
              <div className='itemArrow'><img src={require('../../../../../public/images/nav_next.svg')} alt='nxtImg'/></div>
            </div>
          )
        })}

        <div className='totalItem'>
          <label className='totalTag'>Total: ₹{orderData.orderSummary.netAmount}</label>
          <button className='viewOrder' onClick={this.onViewOrderClick.bind(this, orderData)}>View Order</button>
          
        </div>
        { showCancelButton &&
         <button className={disableCancelButton?"btn-bg disabled":"btn-bg"} style={{width:'100%',backgroundColor:'#005084'}} onClick={(evt)=>{this.props.showCancelModal(orderData,undefined)}} >
              Cancel Order
          </button> 
        }
        <div className='order-separator'></div>
      </>
    );
  }
}

export default RWDOrderItem;
