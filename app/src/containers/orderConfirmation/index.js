import React from 'react';
import axios from 'axios';
import { Link, Route, withRouter } from 'react-router-dom';
import SuccessPop from './successPop';
import appCookie from '../../utils/cookie';
import moment from 'moment';
import { getCookie } from '../../utils/utilityManager';
import { imagePrefix } from '../../../public/constants/constants';
import { formatPrice, mapPaymentMethodMode } from '../../utils/utilityManager';
import {
    storeId,
    accessToken,
    accessTokenCookie,
    OrderDetailAPI,
    CheckoutAPI
} from '../../../public/constants/constants';
class OrderConformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPop: false,
            orderData: ''
        }
    }

    componentDidMount() {
        console.log('Confirmation ---- ', this.props);
        var orderId = this.props.match.params.orderId;
        this.callOrderAPI(orderId);

    }

    // callCheckoutAPI = (id) => {
    //     return new Promise((resolve, reject) => {
    //         let token = appCookie.get('accessToken');
    //         var data = {
    //             orderId: id
    //         }
    //         axios.post(CheckoutAPI, data, {
    //             headers: { store_id: storeId, access_token: token }
    //         }).then((res) => {
    //             if(res.data.orderPlaced == true) {
    //                 console.log("order place -----------", res)
    //                 resolve();
    //             } else {
    //                 console.log("order rejected -----------", res)
    //                 reject();
    //             }
    //         }).catch((err) => {
    //             console.log(err);
    //             reject();
    //         })
    //     })
    // } 

    callOrderAPI(id) {
        this.setState({
            showPop: true
        });
        setTimeout(() => {
            this.setState({
                showPop: false
            })
        }, 4000);
        let token = appCookie.get('accessToken');
        var url = `${OrderDetailAPI}/${id}`
        axios.get(url, {
            headers: { store_id: storeId, access_token: token, profile: 'summary' }
        }).then((res) => {
            this.setState({
                orderData: res.data.data
            })
            console.log(res, "order data");
        }).catch((err) => {
            console.log(err, "order error")
        })


    }

    renderItems = () => {
        var items = [];
        if (this.state.orderData) {
            this.state.orderData.orderItems.forEach((item) => {
                items.push(
                    <div className="col-md-6">
                        <div className='itemOrderdata'>
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={`${imagePrefix}${item.thumbnail}`} />
                                </div>

                                <div className="col-md-8">
                                    <div className='itemText'>
                                    <h4 className='heading'>{item.productName}</h4>
                                    <p className='subText'>{`(${item.shortDescription})`}</p>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className='headingSubtext'>Quantity</div>
                                            <div className='quantityDelivery'>{item.quantity}</div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className='headingSubtext'>Delivery On</div>
                                            <div className='quantityDelivery'>{this.state.orderData.orderDate}</div>
                                        </div>
                                    </div>
                                    <div className='priceHeading'>Price</div>
                                    <div className=''>₹{formatPrice(item.offerPrice)}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            return items;
        }
    }

    onContinueShoppingBtn() {
        this.props.history.push('/')
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
            )
    }


    render() {

        return (
            <div className="orderconfirm">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="orderConfirmed">
                                <h3 className="heading">Your Order has been confirmed!</h3>
                                <p className="text">Thank you for shopping with us!</p>
                                <p className="text">We will notify you via email when your order is ready to be shipped.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="continueShopping">
                                <button onClick={this.onContinueShoppingBtn.bind(this)} className="btn-bg">Continue Shopping</button>
                            </div>
                        </div>
                    </div>
                    <div className="orderDetails">
                        <h4 className="heading-details">Order Details</h4>
                        {this.state.orderData ? <div className="row">
                            <div className="col-md-2">
                                <div className='heading'>Order ID</div>
                                <div className='subText'>{this.state.orderData.orderID}</div>
                            </div>
                            <div className="col-md-2">
                            <div className="heading">Order Date</div>
                            <div className="subText">{this.state.orderData.orderDate}</div>
                            </div>
                            <div className="col-md-3">
                                <div className='heading'>Address</div>
                                <div className="subText">{this.state.orderData.address.address}, {this.state.orderData.address.city}, {this.state.orderData.address.state}, {this.state.orderData.address.pincode}</div>
                            </div>
                            <div className="col-md-2">
                               <div className='heading'>Payment Method</div>
                               <div className="subText">{mapPaymentMethodMode(this.state.orderData.paymentMethod)}</div>
                            </div>
                            <div className="col-md-3">
                            <div className='heading'>Total Amount</div>
                            <div className="totalAmount">₹{formatPrice(this.state.orderData.orderSummary.netAmount)}</div>
                            </div>
                        </div> : ''}

                        {getCookie('isLoggedIn') === 'true' ? (
                            <Link
                                className="action"
                                to={{ pathname: '/myAccount', state: { from: 'myorder' } }}
                            >
                                <button className="btn-bg btntrackorder">Track Order</button>
                            </Link>
                        ) : (
                                <Link className="action" to="/guestTrackOrder">
                                    <button className="btn-bg btntrackorder">Track Order</button>                                    
                                </Link>
                            )}



                        <div className='seprator'></div>
                        <h4 className="heading-details">Items in order</h4>
                        <div className="row">
                            {this.state.orderData ? this.renderItems() : ''}
                        </div>
                    </div>
                </div>
                {this.state.showPop ? <SuccessPop /> : ''}
            </div>
        )
    }
}

export default withRouter(OrderConformation);