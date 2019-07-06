import React from 'react';
import { Link } from 'react-router-dom';
import apiManager from '../../../utils/apiManager';
import { changePasswordAPI } from '../../../../public/constants/constants';

class ProductOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onTrackOrderClick() {
    this.props.proceedToTrackOrderPro(this.props.allDataPro);
  }

  render() {

    const productData = this.props.prodctDataPro;
    console.log('order Product --- ', this.props.allDataPro)
    return (
      <>
        <div className="clearfix" />
        <div className="orderProduct clearfix">
          <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img src={productData.thumbnail !== '' ? `${imagePrefix}${this.props.dataPro.thumbnail}` : require('../../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
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

          <div className="orderbtn">
            <button className="btn-borderwhite btn-cancel">Cancel Order</button>
            {/* {productData.shipmentData.length > 2 ? <button className="btn-borderwhite" onClick={evt => this.props.proceedToTrackOrderPro(this.props.prodctDataPro)} >
              Track My Order
            </button> : null} */}
            <button className="btn-borderwhite" onClick={evt => this.props.proceedToTrackOrderPro(this.props.prodctDataPro)} >
              Track My Order
            </button>

          </div>
          <div className='clearfix'></div>
          <div class="trackorder-wrap">
            <ul class="track-bar">
              <li class="list visited first">Ordered</li>
              <li class="list previous visited">Packed</li>
              <li class="list active">Shipping</li>
              <li class="list next">Delivery</li>
              <li class="list last">Installation</li>
            </ul>
          </div>


          {/* <div className="orderStauts">
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
          </div> */}
        </div>
      </>
    );
  }
}

export default ProductOrder;
