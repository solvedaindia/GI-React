import React from 'react';
import { Row, Col,Grid } from 'react-bootstrap';
import { productTitleCharLimit, productDescriptionCharLimit } from '../../../public/constants/constants';
import { trimTheSentence } from '../../utils/utilityManager';

const pdpNameDescription = (props) => {
    return (
        <>
            <Row>
            <Col md={12} sm={12} xs={12} className="slimline">
                <h1 id="box1" className='heading' style={{opacity: '1'}}>
                    {props.productData.productName.length > productTitleCharLimit ? trimTheSentence(props.productData.productName, productTitleCharLimit) : props.productData.productName } 
                </h1>
                <h1 className="materialType"> 	
{props.productData.shortDescription.length > productDescriptionCharLimit ? trimTheSentence(props.productData.shortDescription, productDescriptionCharLimit) : props.productData.shortDescription}</h1>
            </Col>
            </Row>
        </>    
    );
};

export default pdpNameDescription;
