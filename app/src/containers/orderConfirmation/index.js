import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import SuccessPop from './successPop';
import appCookie from '../../utils/cookie';
import '../../../public/styles/plpContainer/plpContainer.scss';
import {
  getCookie,
  formatPrice,
  mapPaymentMethodMode,
  isMobile,
} from '../../utils/utilityManager';
import {
  imagePrefix,
  storeId,
  OrderDetailAPI,
} from '../../../public/constants/constants';
import ContentEspot from '../../components/Primitives/staticContent';
import { triggerOrderConfirmationGTEvent } from '../../utils/gtm';

class OrderConformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPop: false,
      orderData: '',
      showPage: false,
      showGtagScript: false,
    };
  }

  componentDidMount() {
    const orderId = this.props.match.params.orderId;
    this.callOrderAPI(orderId);
    triggerOrderConfirmationGTEvent(this.state.orderData);
  }
  componentDidUpdate() {
    triggerOrderConfirmationGTEvent(this.state.orderData);
  }
  callOrderAPI(id) {
    this.setState({
      showPop: true,
    });

    const token = appCookie.get('accessToken');
    const url = `${OrderDetailAPI}/${id}`;
    axios
      .get(url, {
        headers: { store_id: storeId, access_token: token, profile: 'summary' },
      })
      .then(res => {
        setTimeout(() => {
          this.setState({
            showPop: false,
          });
        }, 4000);
        this.setState({
          showPage: true,
          orderData: res.data.data,
          showGtagScript: true,
        });
      })
      .catch(err => {
        this.props.history.push('/');
      });
  }

  renderItems = () => {
    const items = [];
    if (this.state.orderData) {
      this.state.orderData.orderItems.forEach(item => {
        items.push(
          <div className="col-md-6 paddingRight orderItemsList">
            <div className="itemOrderdata">
              <div className="row">
                <div
                  className={
                    !isMobile()
                      ? 'col-xs-4 col-sm-3 col-md-4'
                      : 'col-xs-4 col-sm-3 col-md-4 orderItemsImg'
                  }
                >
                  <div className="itemImg">
                    <img
                      className="imgFullwidth"
                      src={`${imagePrefix}${item.thumbnail}`}
                      alt="itemImg"
                    />
                  </div>
                </div>

                <div
                  className={
                    !isMobile()
                      ? 'col-xs-8 col-sm-9 col-md-8 borderLeft'
                      : 'col-xs-8 col-sm-9 col-md-8'
                  }
                >
                  <div className="itemText">
                    <h4 className="heading">{item.productName}</h4>
                    <p className="subText">{`(${item.shortDescription})`}</p>
                    <div className="row">
                      <div className="col-xs-6 col-sm-6 col-md-4 qty-details">
                        <div className="headingSubtext">
                          Quantity {isMobile() && ': '}
                        </div>
                        <div className="quantityDelivery">{item.quantity}</div>
                      </div>
                      {isMobile() && (
                        <div className="col-xs-6 col-sm-6 item-per-price">
                          ₹{formatPrice(item.offerPrice)}
                        </div>
                      )}

                      <div className="col-xs-12 col-sm-12 col-md-8 dlivery-desc">
                        <div className="headingSubtext">Delivery On</div>
                        <div className="quantityDelivery">
                          {item.deliveryDate}
                        </div>
                      </div>
                    </div>
                    {!isMobile() && (
                      <>
                        <div className="priceHeading">Price</div>
                        <div className="priceVal">
                          ₹{formatPrice(item.offerPrice)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>,
        );
      });
      return items;
    }
  };

  onContinueShoppingBtn() {
    this.props.history.push('/');
  }

  onTrackOrderBtn() {
    getCookie('isLoggedIn') === 'true' ? (
      <Link
        className="action"
        to={{ pathname: '/myAccount', state: { from: 'myorder' } }}
      >
        {linkData.text}
      </Link>
    ) : (
        <Link className="action" to="/guestTrackOrder">
          {linkData.text}
        </Link>
      );
  }

  showLoader() {
    const idid = <div className="lazyloading-Indicator">
      <img id="me" className="loadingImg" alt='Lazy Loader' src={require('../../../public/images/plpAssests/lazyloadingIndicator.svg')} />
    </div>
    return idid;
  }

  render() {
    if (!this.state.showPage) {
      return this.showLoader();
    }
    return (
      <div className="orderconfirm">
        {this.state.showGtagScript ? <script
          dangerouslySetInnerHTML={{
            __html: `
            gtag('config', 'UA-2934706-17');
            gtag('event', 'conversion', {
              'send_to': 'AW-880478252/AnvmCJ3FwrYBEKyQ7KMD',
              'value': ${this.state.orderData.orderSummary.netAmount},
              'currency': 'INR',
              'transaction_id': '${this.state.orderData.orderID}'
          `,
          }}
        /> : null}
        

        <ContentEspot espotName={'GI_PIXEL_ORDERCONFIRMATION_BODY_START'} />
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="orderConfirmed">
                <h3 className="heading">Your order has been confirmed</h3>
                <p className="text">Thank you for shopping with us!</p>
                <p className="text">
                  We will send an email to your registered address when your
                  order is ready to be shipped.
                </p>
              </div>
            </div>
            {!isMobile() && (
              <div className="col-md-3">
                <div className="continueShopping">
                  <button
                    onClick={this.onContinueShoppingBtn.bind(this)}
                    className="btn-bg"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="orderDetails">
            <div className="trackOrdersData">
              <h4 className="heading-details">Order Details</h4>
              {this.state.orderData ? (
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-2">
                    <div className="heading">Order ID</div>
                    <div className="subText">
                      {this.state.orderData.orderID}
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-2">
                    <div className="heading">Order Date</div>
                    <div className="subText">
                      {this.state.orderData.orderDate}
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-3">
                    <div className="heading">Address</div>
                    <div className="subText">
                      {this.state.orderData.address.address},{' '}
                      {this.state.orderData.address.city},{' '}
                      {this.state.orderData.address.state},{' '}
                      {this.state.orderData.address.pincode}
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-2">
                    <div className="heading">Payment Method</div>
                    <div className="subText">
                      {mapPaymentMethodMode(this.state.orderData.paymentMethod)}
                    </div>
                  </div>
                  {!isMobile() && (
                    <div className="col-md-3">
                      <div className="heading">Total Amount</div>
                      <div className="totalAmount">
                        ₹
                        {formatPrice(
                          this.state.orderData.orderSummary.netAmount,
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                  ''
                )}
            </div>

            {getCookie('isLoggedIn') === 'true' ? (
              <div className="trackOrderBtnBox">
                <Link
                  className="action"
                  to={{ pathname: '/myAccount', state: { from: 'myorder' } }}
                >
                  <button className="btn-bg btntrackorder">Track Order</button>
                </Link>
              </div>
            ) : (
                <div className="trackOrderBtnBox">
                  <Link className="action" to="/guestTrackOrder">
                    <button className="btn-bg btntrackorder">Track Order</button>
                  </Link>
                </div>
              )}

            {!isMobile() && <div className="seprator" />}
            <div className="orderItemSummary">
              <h4 className="heading-details">Items in Order</h4>
              <div className="row">
                {this.state.orderData ? this.renderItems() : ''}
              </div>
            </div>

            {isMobile() && (
              <div className="row track-order-total">
                {this.state.orderData && (
                  <div className="order-price-details">
                    <div className="heading">Total:</div>
                    <div className="totalAmount">
                      ₹
                      {formatPrice(this.state.orderData.orderSummary.netAmount)}
                    </div>
                  </div>
                )}

                <div className="continueShopping">
                  <button
                    onClick={this.onContinueShoppingBtn.bind(this)}
                    className="btn-bg"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {this.state.showPop ? <SuccessPop /> : ''}
        {/* <SuccessPop /> */}
        <ContentEspot espotName={'GI_PIXEL_ORDERCONFIRMATION_BODY_END'} />
      </div>
    );
  }
}

export default withRouter(OrderConformation);
