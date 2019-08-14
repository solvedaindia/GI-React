import React from 'react';
import axios from 'axios';
import SuccessPop from './successPop';
import appCookie from '../../utils/cookie';
import moment from 'moment';
import {
    storeId,
    accessToken,
    accessTokenCookie,
    OrderDetailAPI,
    CheckoutAPI
  } from '../../../public/constants/constants';
export default class OrderConformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPop: false,
            orderData: ''
        }
    }

    componentDidMount() {
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
        if(this.state.orderData) {
            this.state.orderData.orderItems.forEach((item) => {
                items.push(
                    <div className="col-md-6">
                        <div className='itemOrderdata'>
                        <div className="row">
                            <div className="col-md-4">
                                <img src={item.thumbnail} />
                            </div>
                            
                            <div className="col-md-6">
                            <div className='itemText'>
                                <p>{item.productName}</p>
                                <h6>{item.shortDescription}</h6>
                                <div className="row">
                                    <div className="col-md-4">
                                        <h6>Quantity</h6>
                                        <p>{item.quantity}</p>
                                    </div>
                                    <div className="col-md-6">
                                            <h6>Delivery On</h6>
                                            <p>{moment(this.state.orderData.orderDate).format('MMMM Do YYYY')}</p>
                                    </div>
                                </div>
                                <h6>Price</h6>
                                <p>{item.offerPrice}</p>
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


    render() {
        return (
            <div className="orderconfirm">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="orderConfirmed">
                              <h3 className="heading">Your Order has been confirmed!</h3>
                              <h4 className="text">Thank you for shopping with us!</h4>
                              <h4 className="text">An Email will be sent to your account when your order has been shipped.</h4>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="continueShopping">
                              <button className="btn-bg">Continue Shopping</button>
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
                                <div className="subText">{moment(this.state.orderData.orderDate).format('dddd')}, {moment(this.state.orderData.orderDate).format('MMMM Do YYYY')}</div>
                            </div>
                            <div className="col-md-3">
                                <div className='heading'>Address</div>
                                <div className="subText">{this.state.orderData.address.address}, {this.state.orderData.address.city}, {this.state.orderData.address.state}, {this.state.orderData.address.pincode}</div>
                            </div>
                            <div className="col-md-2">
                               <div className='heading'>Payment Method</div>
                               <div className="subText">{this.state.orderData.paymentMethod}</div>
                            </div>
                            <div className="col-md-3">
                            <div className='heading'>Total Amount</div>
                            <div className="totalAmount">{this.state.orderData.orderSummary.netAmount}</div>
                            </div>
                        </div> : ''}
                        <button className="btn-bg btntrackorder">Track Order</button>
                        <div className='seprator'></div>
                        <h4 className="heading-details">Items in order</h4>
                        <div className="row">
                           {this.state.orderData ? this.renderItems() : '' }
                        </div>
                    </div>
                </div>
                {this.state.showPop ? <SuccessPop /> : '' }
            </div>
        )
    }
}