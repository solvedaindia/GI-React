import React from 'react';
import apiManager from '../../../../utils/apiManager';
import { changePasswordAPI } from '../../../../../public/constants/constants';
import '../../../../../public/styles/myAccount/trackMyOrder.scss';
import OrderItem from '../orderItem';

class TrackOrderProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="clearfix" />
        <div className="orderProduct clearfix">
          <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img
                src={require('../../../../../public/images/miniItem1.png')}
                className="imgfullwidth"
              />
            </div>

            <div className="product-text">
              <p className="heading">Slimline 3 Door Steel Almirah</p>
              <p className="description">(With Locker, Mirror, OHU & Drawer)</p>
              <p className="price">
                <span className="discount-price">₹24,700</span>
              </p>
              <p className="quantity-shipping clearfix">
                <span className="quantity">
                  Quantity
                  <br />
                  <span className="textval">5</span>
                </span>
              </p>
            </div>
          </div>

          <div className="orderStauts">
            <ol className="progtrckr" data-progtrckr-steps="5">
              <li className="progtrckr-done">
                <span className="statusText">Order Processing</span>
              </li>
              <li className="progtrckr-done">
                <span className="statusText">Pre-Production</span>
              </li>
              <li className="progtrckr-done">
                <span className="statusText">In Production</span>
              </li>
              <li className="progtrckr-todo">
                <span className="statusText">Shipped</span>
              </li>
              <li className="progtrckr-todo">
                <span className="statusText">Delivered</span>
              </li>
            </ol>
          </div>
        </div>
      </>
    );
  }
}

export default TrackOrderProduct;
