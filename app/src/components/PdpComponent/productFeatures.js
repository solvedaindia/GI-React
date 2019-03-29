import React from 'react';
import { Col } from 'react-bootstrap';

const productFeatures = (props) => {
    console.log(props, 'propspropsprops');
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
                    props.name.values.map((litem, i) => {
                        console.log(litem.heading, 'litemlitem');
                        <div key={i}>
                            <h3 className='heading'>
                                {litem.heading}
                            </h3>
                            {litem.description}
                        </div>
                    })
                }
            </Col>
        </div>
    );
}

export default productFeatures;