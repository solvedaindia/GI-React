import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Productimageandvideo from './productImagesAndVideos';
import ProductInfo from './productInfo';
import PdpEspot from './pdpEspot';
import ProductDetail from './productDetail';
import '../../../public/styles/pdpComponent/pdpComponent.scss';

class PdpComponent extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={8} sm={12} xs={12}>
            <Productimageandvideo
              imagesAndVideos={this.props.data.productData.imagesAndVideos}
              ribbonText={this.props.data.productData.ribbonText}
            />
          </Col>
          <Col md={4} sm={12} xs={12}>
            <ProductInfo productData={this.props.data.productData} />
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <ProductDetail productDetail={this.props.data.productDetails} />
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <PdpEspot PdpEspot={this.props.espot} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default PdpComponent;
