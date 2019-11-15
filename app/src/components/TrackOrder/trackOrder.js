import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import { Link } from 'react-router-dom';
import {
    trackOrderMiniAPI,
    userDetailAPI,
    imagePrefix
} from '../../../public/constants/constants';
import { getCookie, isMobile } from '../../utils/utilityManager';
import '../../../public/styles/trackMiniOrder/trackMiniOrder.scss';
import {HELLO, SHIPMENT, ITEM, ORDER_ID, TRACK_ORDER, DELIVERY_ON,VIEW_ORDER  } from '../../constants/app/primitivesConstants';

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
        })
        .catch(error => {
            this.setState({
            error,
            isLoading: false
            });
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
            infinite: false,
            speed: 500,
            autoPlay: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          };
        return (
           !!orderData && !!orderData.ongoingOrders[0] && orderData.ongoingOrders[0].orderItems.length > '0'
            ?
            <section className='trackMiniOrder'>
                <div className='userDetails'>
                    <p className='userName'> {HELLO + !!userInfo && userInfo.name}</p>
                    {!isMobile() && <p className='track'>{TRACK_ORDER}</p>}
                </div>
                <div className='orderDetails'>
                    <Slider {...settings}>
                        {!!orderData && orderData.ongoingOrders.map((orderDetails) => {
                            return(
                                orderDetails.orderItems.map((subOrderDetails, itemIndex) => {
                                    return(
                                        subOrderDetails.shipmentData.map((shipmentDetails, index) => {
                                            return(
                                                <div className='orderSummary'>
                                                    <figure className='prodImg'>
                                                        <img src={`${imagePrefix}${subOrderDetails.thumbnail}`} alt={index} className='img'/>
                                                    </figure>
                                                    <div className='prodDetails'>
                                                        {orderDetails.orderItems.length > 1 && <p className='count'>({ITEM + ' ' + (itemIndex+1)}/{orderDetails.orderItems.length})</p>}
                                                        {subOrderDetails.shipmentData.length > 1 && <p className='count'> ({SHIPMENT  + ' ' + (index+1)}/{subOrderDetails.shipmentData.length})</p>}
                                                        <p className='orderID'> {ORDER_ID + ' ' + orderDetails.orderID}</p>
                                                        <p className='prodName'>{subOrderDetails.productName}</p>
                                                        <p className='qty item'>{!isMobile() ?  'QUANTITY' :  'Quantity:'}
                                                            <span className='qtyVal val'>{shipmentDetails.quantity}</span>
                                                        </p>
                                                        <p className='status item'>{!isMobile() ? 'STATUS' : 'Status:'}
                                                            <span className='statusVal val'>{shipmentDetails.status}</span>
                                                        </p>
                                                        {!!shipmentDetails.expectedDeliveryDate && !isMobile() && 
                                                            <p className='delDate item'>
                                                                {!isMobile() ? 'DELIVERY' : 'Delivery on:' }
                                                                {!isMobile() ? <span className='delVal val'>{shipmentDetails.expectedDeliveryDate}</span>: '' }
                                                            </p>		
                                                        }
                                                        
                                                        { !!shipmentDetails.expectedDeliveryDate && isMobile() && 
                                                            <span className='delDate item'>{DELIVERY_ON}</span>								
                                                        }
                                                        { !!shipmentDetails.expectedDeliveryDate && isMobile() && 
                                                            <span className='delDate item'>{shipmentDetails.expectedDeliveryDate} </span>
                                                        }
                                                        
                                                    </div>
                                                    <Link to={{ pathname: '/myAccount', state: { from: 'myorder' } }}>
                                                        <a className='link btn'>{VIEW_ORDER}</a>
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
            : ''
        )
    }
}

export default TrackOrder;