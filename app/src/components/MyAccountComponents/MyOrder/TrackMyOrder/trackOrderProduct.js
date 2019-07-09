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
    
    const productData = this.props.prodctDataPro;
    return (
      <>
        <div className="clearfix" />
        <div className="orderProduct clearfix">
        <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img src={productData.thumbnail !== '' ? `${imagePrefix}${this.props.dataPro.thumbnail}` : require('../../../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
            </div>

            <div className="product-text">
              <p className="heading">{productData.productName}</p>
              <p className="description">({productData.shortDescription})</p>
              <p className="price">
                <span className="discount-price">₹{productData.offerPrice}</span>
              </p>
              <p className="quantity-shipping clearfix">
                <span className="quantity">
                  Quantity
                  <br />
                  <span className="textval">{productData.quantity}</span>
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
