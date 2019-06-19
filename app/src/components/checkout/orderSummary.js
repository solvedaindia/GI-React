import React from 'react';
import '../../../public/styles/checkout.scss';
import {
  storeId,
  accessToken,
  accessTokenCookie,
  OrderSummaryAPI
} from '../../../public/constants/constants';
import appCookie from '../../utils/cookie';
import axios from 'axios';
import EMI from '../../../public/images/emi.svg';
export class OrderSummaryComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          
        }
    }

    componentDidMount() {
        this.callOrderSummaryAPI();
    }

    callOrderSummaryAPI = () => {
      let token = appCookie.get('accessToken');
      axios.get(OrderSummaryAPI, {
        headers: { store_id: storeId, access_token: token }
      }).then(response => {
        console.log(response, 'order Summary response');
      }).catch(error => {
        console.log(err, "order summary error")
        reject(error);
      })
    }

    render() {
      return (
            <div className='col-md-4 col-sm-12 col-xs-12 orderSummary'>
              <div className='summaryHeading'><h4 className='headingOrder'>Order Summary</h4></div>
              <div className='listRow clearfix'>
                <div className='lefttext-box'>Cart Total</div>
                <div className='righttext-box'>&#8377;25000</div>
              </div>

              <div className='listRow clearfix'>
                <div className='lefttext-box'>Product Discount</div>
                <div className='righttext-box'>- &#8377;500</div>
              </div>

              <div className='listRow clearfix'>
                <div className='lefttext-box'>Order Discount</div>
                <div className='righttext-box'>- &#8377;500</div>
              </div>

              <div className='listRow clearfix'>
                <div className='lefttext-box'>Shipping</div>
                <div className='righttext-box'>Free</div>
              </div>

              <div className='freeshipping'>Free shipping on cart total above &#8377;5000  </div>
              <div className='startEmi clearfix'>
                <div className='emi-icon'><img src={EMI} alt='EMI'/></div>
                <div className='emitext'> Starting from &#8377;999 per month</div>
                <div className='knowmore'>Know More</div>
              </div>
             
             <div className='totalBox clearfix'>
                <div className='totaltext'><span className='label-text'>Total</span><br/>
                <div className='savetext'><span className='save-label'>You saved</span> <span className='saving-amount'>&#8377;2500</span></div>
                </div>
                <div className='totalAmount'>&#8377;24,000</div>
             </div>              
              
              <div className="payBtn">
                <button className="btn-block btn-blackbg">Pay &#8377;24,000</button>
              </div>
              <div className="SecureCheckout">
                Secure Checkout
              </div>
            </div>
      )
    }
}