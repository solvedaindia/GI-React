import React from 'react';
import { Col } from 'react-bootstrap';

const productFeatures = (props) => {
    return(
        <div>
            <Col md={6} sm={12} xs={12}>
            <h3 className='heading'>
                Features
            </h3>
            <img src={props.name.featureImage}/>
            </Col>
            <Col md={6} sm={12} xs={12}>
                {
                    props.name.values.map((data, i) => {
                        <div key={i}>
                            <h3 className='heading'>
                                {data.heading}
                            </h3>
                            {data.description}
                        </div>
                    })
                }
            </Col>
        </div>
    );
}

export default productFeatures;