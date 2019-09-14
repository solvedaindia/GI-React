import React from 'react';
import '../../../public/styles/checkout.scss';
import {
  storeId,
  minEMIAPI
} from '../../../public/constants/constants';
import appCookie from '../../utils/cookie';
import axios from 'axios';
import EMI from '../../../public/images/emi.svg';
import EmiInfo from '../../components/PdpComponent/emiInfo';
import {isMobile, formatPrice} from '../../utils/utilityManager';
import {
	CART_TOTAL,
	ORDER_SUMMARY,
	PRODUCT_DISCOUNT,
	ORDER_DISCOUNT,
	SHIPPING,
	STARTING_FROM,
	TOTAL,
	TOTAL_AMOUNT,
	PAY,
	YOU_SAVED,
	SECURE_CHECKOUT
} from '../../constants/app/checkoutConstants';

export class OrderSummaryComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          minEMI: false,
          isPayBtnDisabled: false
        }
    }

    callEMI = () => {
        let token = appCookie.get('accessToken');
      axios.get(`${minEMIAPI}/${this.props.orderData.netAmount}`, {
        headers: { store_id: storeId, access_token: token }
      }).then((res) => {
        this.setState({
          minEMI: res.data.data.minEMIValue
        })
      }).catch((err) => {
      })
    }

    componentWillReceiveProps(nextProps) {
      console.log('issisisis --- ',nextProps.isCheckSumAPIFailPro);
      if (nextProps.isCheckSumAPIFailPro) {
        this.setState({
          isPayBtnDisabled: false,
        })
      }

    }

    onPayClick() {
      this.setState({
        isPayBtnDisabled: true
      })
      this.props.initialBdpayment()
    }

    render() {
      if(this.state.minEMI == false) {
        this.callEMI()
      }
      return (
        <>
        {!isMobile() ? (<div className='col-md-4 col-sm-12 col-xs-12 orderSummary'>
              
              <div className='summaryHeading'><h4 className='headingOrder'>{ORDER_SUMMARY}</h4></div>
              <div className='listRow clearfix'>
                <div className='lefttext-box'>{CART_TOTAL}</div>
                <div className='righttext-box'>&#8377;{formatPrice(this.props.orderData.totalAmount)}</div>
              </div>

              <div className='listRow clearfix'>
                <div className='lefttext-box'>{PRODUCT_DISCOUNT}</div>
                <div className='righttext-box'>- &#8377;{formatPrice(this.props.orderData.productDiscount)}</div>
              </div>

              <div className='listRow clearfix'>
                <div className='lefttext-box'>{ORDER_DISCOUNT}</div>
                <div className='righttext-box'>- &#8377;{formatPrice(this.props.orderData.orderDiscount)}</div>
              </div>

              <div className='listRow clearfix'>
                <div className='lefttext-box'>{SHIPPING}</div>
                <div className='righttext-box'>{this.props.orderData.shippingCharges == 0 ? 'Free' : this.props.orderData.shippingCharges}</div>
              </div>

              <div className='freeshipping'></div>
              <div className='startEmi clearfix'>
                <div className='emi-icon'><img src={EMI} alt='EMI'/></div>
                <div className='emitext'> {STARTING_FROM} &#8377;{formatPrice(this.state.minEMI)} a month</div>
                {/* <div className='knowmore'>{KNOW_MORE}</div> */}
				<EmiInfo price={this.props.orderData.netAmount}/>
              </div>
             
             <div className='totalBox clearfix'>
                <div className='totaltext'><span className='label-text'>{TOTAL}</span><br/>
                <div className='savetext'><span className='save-label'>{YOU_SAVED}</span> <span className='saving-amount'>&#8377;{formatPrice(this.props.orderData.saving)}</span></div>
                </div>
                <div className='totalAmount'>&#8377;{formatPrice(this.props.orderData.netAmount)}</div>
             </div>              
              
              <div className="payBtn">
                <button className={`btn-block btn-blackbg ${this.props.pay ? '' : 'disableddiv'}`} disabled={this.state.isPayBtnDisabled} onClick={this.onPayClick.bind(this)}>{PAY} &#8377;{formatPrice(this.props.orderData.netAmount)}</button>
              </div>
              <div className="SecureCheckout">
                {SECURE_CHECKOUT}
              </div>
               
            </div>): ''}

            {this.props.checkoutStep == 3 && isMobile() ? (
              <div className='checkout-btn-floater'>
              <div className='total-amount'><div className='net-amount-box'>&#8377;{formatPrice(this.props.orderData.netAmount)} <span className='total-amount-text'>{TOTAL_AMOUNT}</span></div></div>
              <div className='proceed-btn'><button className={`btn-block btn-blackbg ${this.props.pay ? '' : 'disableddiv'}`} disabled={this.state.isPayBtnDisabled} onClick={this.onPayClick.bind(this)}>{PAY}</button></div>
              </div>
            ) : ''}
            </>
      )
    }
}