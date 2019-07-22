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
        console.log(orderId, "this is order id")
        this.callCheckoutAPI(orderId)
            .then(this.callOrderAPI)
            .catch((err) => {
                // window.location.redirect()
            })
        this.callOrderAPI(orderId);

    }

    callCheckoutAPI = (id) => {
        return new Promise((resolve, reject) => {
            let token = appCookie.get('accessToken');
            var data = {
                orderId: id
            }
            axios.post(CheckoutAPI, data, {
                headers: { store_id: storeId, access_token: token }
            }).then((res) => {
                if(res.data.orderPlaced == true) {
                    console.log("order place -----------", res)
                    resolve();
                } else {
                    console.log("order rejected -----------", res)
                    reject();
                }
            }).catch((err) => {
                console.log(err);
                reject();
            })
        })
    } 
    
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
        setTimeout(() => {
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
        }, 3500)
        
    }

    renderItems = () => {
        var items = [];
        if(this.state.orderData) {
            this.state.orderData.orderItems.forEach((item) => {
                items.push(
                    <div className="col-md-6">
                        <div style={{background: 'white', margin: "10px"}}>
                        <div className="row">
                            <div className="col-md-4">
                                <img src={item.thumbnail} />
                            </div>
                            
                            <div className="col-md-6">
                            <div style={{borderLeft: '1px solid grey', height: 'auto'}}></div>
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
                )
            })
            return items;
        }
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <h4>You Order has been confirmed!</h4>
                            <p>Thank you for shopping with us!</p>
                            <p>An Email will be sent to your account when your order has been shipped.</p>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-large">Continue Shopping</button>
                        </div>
                    </div>
                    <div style={{background: '#eceaea', padding: '15px'}}>
                        <h4>Order Details</h4>
                        {this.state.orderData ? <div className="row">
                            <div className="col-md-2">
                                <h6>Order ID</h6>
                                <p>{this.state.orderData.orderID}</p>
                            </div>
                            <div className="col-md-2">
                                <h6>Order Date</h6>
                                <p>{moment(this.state.orderData.orderDate).format('dddd')}, {moment(this.state.orderData.orderDate).format('MMMM Do YYYY')}</p>
                            </div>
                            <div className="col-md-3">
                                <h6>Address</h6>
                                <p>{this.state.orderData.address.address}, {this.state.orderData.address.city}, {this.state.orderData.address.state}, {this.state.orderData.address.pincode}</p>
                            </div>
                            <div className="col-md-2">
                                <h6>Payment Method</h6>
                                <p>{this.state.orderData.paymentMethod}</p>
                            </div>
                            <div className="col-md-3">
                                <h6>Total Amount</h6>
                                <p>{this.state.orderData.orderSummary.netAmount}</p>
                            </div>
                        </div> : ''}
                        <button className="btn btn-large">Track Order</button>
                        <hr style={{borderTop: '1px solid #bbbaba'}} />
                        <p>Items in order</p>
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