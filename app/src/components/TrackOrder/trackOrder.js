import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import {
    trackOrderMiniAPI,
    userDetailAPI
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
                            // <p>
                            //     {orderDetails.orderID}
                            // </p>
                            orderDetails.orderItems.map((subOrderDetails, index) => {
                                return(
                                    <div className='orderSummary'>
                                        <figure className='prodImg'>
                                            <img src='https://192.168.0.57/imagestore/images/godrejInterio/pdp/sampleImages/56101502SD00473/56101502SD00473_546x307_01.png' alt={index}/>
                                        </figure>

                                    </div>
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