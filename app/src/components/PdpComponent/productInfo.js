import React from 'react';
import { Col, Button } from 'react-bootstrap';
import EmiInfo from './emiInfo';

const productInfo = (props) => {
    return(
        <>            
                <div className='product'>
                   <span className='text'>Product ID:</span> 
                   <span className='text'>{props.productData.partNumber}</span>
                </div>
                
                <div className='slimline'>
                <h4 className='heading'>
                    {props.productData.productName}
                </h4>
                </div>
                <div className='price'>
                    <span className='actualprice text'>&#8377;{props.productData.actualPrice}</span>
                    <span className='offerprice text'>&#8377;{props.productData.offerPrice}</span>
                </div>
                <div className='shippingCharge'>
                    Shipping Charges:<span className='bold'>&#8377;{props.productData.shipingCharges}</span>
                </div>
                <div className='accessories-offer'>
                    <div className='offerbg text'> % </div>
                    <div className='discount-off text'>{props.productData.discount} OFF </div>
                    <div className='text'> &  free accessories</div>
                </div>
                 <ul className='cashoffer-wrapper'>
                    {
                        props.productData.promotionData.map((promotion, i) => {
                            return(
                                <li className='list' key={i}>                                 
                                    <h4 className='heading'>{promotion.heading} </h4>
                                    {promotion.description} <a className='link' href={promotion.tcUrl}>{promotion.tcText}</a>                                  
                                </li>
                            )
                        })
                    }
                    </ul>
                
                <div className='starting-emitext'>
                    <div className='offerbg text'> <span className='emitext'>EMI</span></div>
                    <div className='text'>Starting from </div>
                    <div className='text bold'>रु{props.productData.emiData} </div>                   
                    <div className='text'>per month</div>
                    <div className='text emiinfo'><EmiInfo /></div>
                </div>
                <div className='addCart'>
                    <Button className="btn">-</Button>
                    <input className='btn' type='text' readOnly value={props.productData.defaultQuantity} />
                    <Button className="btn">+</Button>
                    <Button className="btn addcartbtn">Add to Cart</Button>
                </div>
           
        </>
    );
}

export default productInfo;