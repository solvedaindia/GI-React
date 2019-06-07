import React from 'react';
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

  render() {
    return (
      <>
       <div className='clearfix'></div>
      <div className='orderProduct clearfix'>
       <div className="orderimgbox clearfix">
          <div className="imgBox">            
            <img src={require('../../../../public/images/miniItem1.png')}  className="imgfullwidth"/>
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
          <button className='btn-borderwhite'>Track My Order</button>
        </div>
      </div>
      </>
    );
  }
}

export default ProductOrder;
