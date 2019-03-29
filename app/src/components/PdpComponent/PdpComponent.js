import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Productimageandvideo  from './productImagesAndVideos';
import ProductFeatures  from './productFeatures';
import ProductImageAndVideoSlider  from './imageAndVideo';

class PdpComponent extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={8} sm={12} xs={12}>
                        <Productimageandvideo name={this.props.imagesAndVideos} />
                    </Col>
                    <Col md={4} sm={12} xs={12}></Col>
                </Row>
                <Row>
                    <Col md={12} sm={12} xs={12}>
                        <ProductFeatures name={this.props.featureProduct} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} sm={12} xs={12}>
                        <ProductImageAndVideoSlider />
                    </Col>
                </Row>
	        </Grid>
        );
    }
}

export default PdpComponent;
