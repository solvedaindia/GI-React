import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Productimageandvideo  from './productImagesAndVideos';
import ProductInfo  from './productInfo';
import PdpEspot  from './pdpEspot';
import ProductDetail  from './productDetail';
import '../../../public/styles/pdpComponent/pdpComponent.scss';

import {Link} from 'react-bootstrap';
import '../../../public/styles/pdpComponent/pdp.scss';

class PdpComponent extends React.Component {
    render() {
        return (
            <div className='galleryArea'>
            <Grid>                
                   <ul className='breadcrumblist'>
                     <div>Living Room > Sofas > Plum Sofa</div>
                       {/* <li className='list'><Link className='link' to='home-rule'>Living Room</Link> ></li>
                       <li className='list'><Link className='link' to='home'>Sofas</Link> > </li>
                       <li className='list'><Link className='link' to='home'>Plum Sofa</Link> > </li> */}
                    </ul>
               
                <Row>
                    <Col md={7} sm={12} xs={12}>   
                      <div className='GalleryBox'>                  
                        <Productimageandvideo 
                            imagesAndVideos={this.props.data.productData.imagesAndVideos}
                            ribbonText={this.props.data.productData.ribbonText}
                        />
                     </div>
                    </Col>
                    <Col md={5} sm={12} xs={12}>
                     <div className='GallerytextBox'>
                        <ProductInfo productData={this.props.data.productData} />
                     </div>
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
            </div>
        );
    }
}

export default PdpComponent;
