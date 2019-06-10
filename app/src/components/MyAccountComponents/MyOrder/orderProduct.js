import React from 'react';
import { Link } from 'react-router-dom';
import apiManager from '../../../utils/apiManager';
import {
  changePasswordAPI
} from '../../../../public/constants/constants';


class ProductOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onTrackOrderClick() {

  }

  render() {
    return (
      <>
        <div className='clearfix'></div>
        <div className='orderProduct clearfix'>
          <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img src={require('../../../../public/images/miniItem1.png')} className="imgfullwidth" />
            </div>

            <div className="product-text">
              <p className="heading">Slimline 3 Door Steel Almirah</p>
              <p className="description">(With Locker, Mirror, OHU & Drawer)</p>
              <p className="price"><span className="discount-price">₹24,700</span></p>
              <p className="quantity-shipping clearfix">
                <span className="quantity">Quantity<br />
                  <span className="textval">5</span>
                </span>
              </p>
            </div>
          </div>

          <div className='orderbtn'>
            <button className='btn-borderwhite btn-cancel'>Cancel Order</button>
            <button className='btn-borderwhite' onClick={this.props.proceedToTrackOrderPro}>Track My Order</button>
          </div>

          <div className='orderStauts'>
            <ol class="progtrckr" data-progtrckr-steps="5">
              <li class="progtrckr-done"><span className='statusText'>Order Processing</span></li>
              <li class="progtrckr-done"><span className='statusText'>Pre-Production</span></li>
              <li class="progtrckr-done"><span className='statusText'>In Production</span></li>
              <li class="progtrckr-todo"><span className='statusText'>Shipped</span></li>
              <li class="progtrckr-todo"><span className='statusText'>Delivered</span></li>
            </ol>
          </div>


        </div>
      </>
    );
  }
}

export default ProductOrder;
