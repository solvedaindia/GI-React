import React from 'react';
import axios from 'axios';
import SuccessPop from './successPop';
import appCookie from '../../utils/cookie';
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
        setTimeout(() => {
            let token = appCookie.get('accessToken');
            var url = `${OrderDetailAPI}/${id}`
            axios.get(url, {
                headers: { store_id: storeId, access_token: token, profile: 'summary' }
            }).then((res) => {
                console.log(res, "order data");
            }).catch((err) => {
                console.log(err, "order error")
            })
        }, 4000)
        
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
                        <button className="btn btn-large">Track Order</button>
                        <hr style={{borderTop: '1px solid #bbbaba'}} />
                        <h5>Items in order</h5>
                    </div>
                </div>
                {this.state.showPop ? <SuccessPop /> : '' }
            </div>
        )
    }
}