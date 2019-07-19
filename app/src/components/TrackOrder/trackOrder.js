import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import { Link } from 'react-router-dom';
import {
    trackOrderMiniAPI,
    userDetailAPI,
    imagePrefix
} from '../../../public/constants/constants';
import { getCookie } from '../../utils/utilityManager';
import '../../../public/styles/trackMiniOrder/trackMiniOrder.scss';

class TrackOrder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orderData: null,
            isLoading: true,
            errors: null,
            userInfo: null
        } 
    }
    getUserDetails() {
        apiManager
        .get(userDetailAPI)
        .then(response => {
            this.setState({
                userInfo : response.data.data,
                isLoading: false
            });
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            });
        })
    }
    getTracOrderDetails() {
        apiManager
        .get(trackOrderMiniAPI)
        .then(response => {
            this.setState({
                orderData: response.data.data,
                isLoading: false
            });
            console.log(' Mini Cart Data', data.data);
        })
        .catch(error => {
            this.setState({
            error,
            isLoading: false
            });
            console.log('ERROR');
        });
    }
    componentDidMount() {
        if (getCookie('isLoggedIn') === 'true') {
            this.getTracOrderDetails();
            this.getUserDetails();
        }
    }
    render() {
        const { orderData, userInfo } = this.state;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
          };
        return (
            <section className='trackMiniOrder'>
                <div className='userDetails'>
                    <p className='userName'>Hello {!!userInfo && userInfo.name}</p>
                    <p>Track Your Order</p>
                </div>
                <div className='orderDetails'>
                <Slider {...settings}>
                    {!!orderData && orderData.ongoingOrders.map((orderDetails) => {
                        return(
                            orderDetails.orderItems.map((subOrderDetails) => {
                                return(
                                    subOrderDetails.shipmentData.map((shipmentDetails, index) => {
                                        return(
                                            <div className='orderSummary'>
                                                <figure className='prodImg'>
                                                    <img src={`${imagePrefix}${subOrderDetails.thumbnail}`} alt={index}/>
                                                </figure>
                                                <div className='prodDetails'>
                                                    <p className='count'>ITEM({index}/{subOrderDetails.quantity})</p>
                                                    <p className='orderID'>Order ID {orderDetails.orderID}</p>
                                                    <p className='prodName'>{subOrderDetails.productName}</p>
                                                    <span className='qty'>Quantity<br></br>{subOrderDetails.quantity}</span>
                                                    <span className='status'>Status<br></br>{shipmentDetails.status}</span>
                                                    <span className='delDate'>DELIVERY ON<br></br>{shipmentDetails.deliveryDate}</span>
                                                </div>
                                                <Link to={{ pathname: '/myAccount', state: { from: 'myorder' } }}>
                                                    <a className='link btn'>View Order</a>
                                                </Link>
                                            </div>
                                        )
                                    })
                                    
                                )
                            })
                        )
                    })}
                    </Slider>
                </div>
            </section>
        )
    }
}

export default TrackOrder;