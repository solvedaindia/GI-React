import React from 'react';
import { Row, Col,Grid } from 'react-bootstrap';
const pdpNameDescription = (props) => {
    return (
        <>
            <Row>
            <Col md={12} sm={12} xs={12} className="slimline">
                <h4 id="box1" className='heading' style={{opacity: '1'}}>
                    {props.productData.productName}
                </h4>
                <div className="materialType"> {props.productData.shortDescription}</div>
            </Col>
            </Row>
        </>    
    );
};

export default pdpNameDescription;
