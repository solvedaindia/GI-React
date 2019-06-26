import React from 'react';
import { Row, Col,Grid } from 'react-bootstrap';
const pdpNameDescription = (props) => {
    return (
        <>
            <Row>
            <Col md={12} sm={12} xs={12} className="slimline">
                <h4 className='heading'>
                    {props.productData.productName}
                </h4>
                    {props.productData.shortDescription}<br/>
            </Col>
            </Row>
        </>    
    );
};

export default pdpNameDescription;
