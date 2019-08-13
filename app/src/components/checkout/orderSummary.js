import React from 'react';
import '../../../public/styles/checkout.scss';
import {
  storeId,
  accessToken,
  accessTokenCookie,
  OrderSummaryAPI,
  minEMIAPI
} from '../../../public/constants/constants';
import appCookie from '../../utils/cookie';
import axios from 'axios';
import EMI from '../../../public/images/emi.svg';
import {isMobile, formatPrice} from '../../utils/utilityManager';
export class OrderSummaryComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          minEMI: false
        }
    }

    // componentDidMount() {
    //   this.callEMI()
    // }
    callEMI = () => {
        let token = appCookie.get('accessToken');
      axios.get(`${minEMIAPI}/${this.props.orderData.netAmount}`, {
        headers: { store_id: storeId, access_token: token }
      }).then((res) => {
        this.setState({
          minEMI: res.data.data.minEMIValue
        })
        console.log(res, 'emi reposnse')
      }).catch((err) => {
        console.log('min emi error', err)
      })
    }

    render() {
      if(this.state.minEMI == false) {
        this.callEMI()
      }
      return (
        <>
        {!isMobile() ? (<div className='col-md-4 col-sm-12 col-xs-12 orderSummary'>
              
              <div className='summaryHeading'><h4 className='headingOrder'>Order Summary</h4></div>
              <div className='listRow clearfix'>
                <div className='lefttext-box'>Cart Total</div>
                <div className='righttext-box'>&#8377;{formatPrice(this.props.orderData.totalAmount)}</div>
              </div>

              <div className='listRow clearfix'>
                <div className='lefttext-box'>Product Discount</div>
                <div className='righttext-box'>- &#8377;{formatPrice(this.props.orderData.productDiscount)}</div>
              </div>

              <div className='listRow clearfix'>
                <div className='lefttext-box'>Order Discount</div>
                <div className='righttext-box'>- &#8377;{formatPrice(this.props.orderData.orderDiscount)}</div>
              </div>

              <div className='listRow clearfix'>
                <div className='lefttext-box'>Shipping</div>
                <div className='righttext-box'>{this.props.orderData.shippingCharges == 0 ? 'Free' : this.props.orderData.shippingCharges}</div>
              </div>

              <div className='freeshipping'>Free shipping on cart total above &#8377;5,000  </div>
              <div className='startEmi clearfix'>
                <div className='emi-icon'><img src={EMI} alt='EMI'/></div>
                <div className='emitext'> Starting from &#8377;{formatPrice(this.state.minEMI)} per month</div>
                <div className='knowmore'>Know More</div>
              </div>
             
             <div className='totalBox clearfix'>
                <div className='totaltext'><span className='label-text'>Total</span><br/>
                <div className='savetext'><span className='save-label'>You saved</span> <span className='saving-amount'>&#8377;{formatPrice(this.props.orderData.saving)}</span></div>
                </div>
                <div className='totalAmount'>&#8377;{formatPrice(this.props.orderData.netAmount)}</div>
             </div>              
              
              <div className="payBtn">
                <button className={`btn-block btn-blackbg ${this.props.pay ? '' : 'disableddiv'}`} onClick={this.props.initialBdpayment}>Pay &#8377;{formatPrice(this.props.orderData.netAmount)}</button>
              </div>
              <div className="SecureCheckout">
                Secure Checkout
              </div>
               
            </div>): ''}

            {this.props.checkoutStep == 3 && isMobile() ? (
              <div className='checkout-btn-floater'>
              <div className='total-amount'><div className='net-amount-box'>&#8377;{formatPrice(this.props.orderData.netAmount)} <span className='total-amount-text'>Total Amount</span></div></div>
              <div className='proceed-btn'><button className={`btn-block btn-blackbg ${this.props.pay ? '' : 'disableddiv'}`} onClick={this.props.initialBdpayment}>Pay</button></div>
              </div>
            ) : ''}
            </>
      )
    }
}