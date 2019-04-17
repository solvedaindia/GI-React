import React from 'react';
import { Grid, Row, Col, Link } from 'react-bootstrap';
import Productimageandvideo  from './productImagesAndVideos';
import ProductInfo  from './productInfo';
import PdpEspot  from './pdpEspot';
import ProductDetail  from './productDetail';
import '../../../public/styles/pdpComponent/pdpComponent.scss';

class PdpComponent extends React.Component {
    render() {
        return (
            <div className='galleryArea'>           
                <Row className='no-margin'>
                    <Col className='no-paddingLeft' md={7} sm={12} xs={12}>   
                      <div className='GalleryBox'>                  
                        <Productimageandvideo 
                            imagesAndVideos={this.props.data.productData.imagesAndVideos}
                            ribbonText={this.props.data.productData.ribbonText}
                        />
                     </div>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                     <div className='GallerytextBox'>
                        <ProductInfo productData={this.props.data.productData} />
                     </div>
                    </Col>
                </Row>
                <Grid>
                <Row>
                    <Col md={12} sm={12} xs={12}>
                        <ProductDetail productDetail={this.props.data.productDetails} />
                    </Col>
                </Row>
                
	        </Grid>
                <PdpEspot PdpEspot={this.props.espot} />                   
            </div>
        );
    }
}

export default PdpComponent;
