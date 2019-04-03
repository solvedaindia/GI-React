import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Productimageandvideo  from './productImagesAndVideos';
import ProductInfo  from './ProductInfo';

import ProductFeatures  from './productFeatures';

class PdpComponent extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={8} sm={12} xs={12}>
                        <Productimageandvideo name={this.props.data.productData.imagesAndVideos} />
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <ProductInfo 
                            productData={this.props.data.productData}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} sm={12} xs={12}>
                        <div className="container our-promises">
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="ourpromises-heading clearfix">
                                        <h3 className="heading">Our Promises</h3>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <div className="Promise-boxtext"> 
                                            <img className="imgfullwidth" src="https://192.168.0.39:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/delivery.svg" alt="delivery" />
                                            <h4 className="sub-heading">On Time delivery</h4>
                                            <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <div className="Promise-boxtext">
                                            <img className="imgfullwidth" src="https://192.168.0.39:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/installation.svg" alt="installation" />
                                            <h4 className="sub-heading">Free Installation</h4>
                                            <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <div className="Promise-boxtext">
                                            <img className="imgfullwidth" src="https://192.168.0.39:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/exchange.svg" alt="exchange" />
                                            <h4 className="sub-heading">Furniture Exchange</h4>
                                            <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="product-bg">
                                        <img className="imgfullwidth" src="https://192.168.0.39:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/promises-product.png" alt="Img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                {/*
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
                */}
	        </Grid>
        );
    }
}

export default PdpComponent;
