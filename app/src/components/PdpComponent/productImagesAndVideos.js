import React from 'react';
import { Col } from 'react-bootstrap';

const productImagesAndVideos = (props) => {
    const productData = props.name.productImages.map((val, index) => {
        return(
            <div>
                <Col key={index} md={2} sm={2}>
                    <img src={val.imageSrc}/>
                </Col>
            </div>
        );
    })
    return productData;
}

export default productImagesAndVideos;