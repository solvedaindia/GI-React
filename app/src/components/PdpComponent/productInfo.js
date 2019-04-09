import React from 'react';
import { Col, Button } from 'react-bootstrap';
import EmiInfo from './emiInfo';

const productInfo = (props) => {
    return(
        <div>
            <Col md={12} sm={12} xs={12}>
                <div>
                    Product ID: {props.productData.partNumber}
                </div>
                <h3 className='heading'>
                    {props.productData.productName}
                </h3>
                <div>
                    रु{props.productData.actualPrice}&nbsp;
                    <strike>रु{props.productData.offerPrice}</strike>
                </div>
                <div>
                    Shipping Charges:<b>{props.productData.shipingCharges}</b>
                </div>
                <div>
                    % {props.productData.discount} OFF & free accessories
                </div>
                <div>
                    {
                        props.productData.promotionData.map((promotion, i) => {
                            return(
                                <div key={i}>
                                    <h3 className='heading'>
                                        {promotion.heading}
                                    </h3>
                                    {promotion.description} <a href={promotion.tcUrl}>{promotion.tcText}</a>
                                </div>
                            )
                        })
                    }
                </div>
                <div><br/>
                    Starting from <b>रु{props.productData.emiData}</b> per month <EmiInfo />
                </div>
                <div><br/>
                    <Button className="btn-primary">-</Button>
                        <input type='text' readOnly value={props.productData.defaultQuantity} />
                    <Button className="btn-primary">+</Button>
                    <Button className="btn-primary">Add to Cart</Button>
                </div>
            </Col>
        </div>
    );
}

export default productInfo;