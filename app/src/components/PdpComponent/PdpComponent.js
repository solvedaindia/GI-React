import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Productimageandvideo from './productImagesAndVideos';
import ProductInfo from './productInfo';
import PdpEspot from './pdpEspot';
import ProductFeatures from './productFeatures';
import PurchaseGuide from './purchaseGuide';
import ProductDetail from './productDetail';
import ProductKeywords from './productKeywords';
import SimilarProducts from './similarProducts';

import '../../../public/styles/pdpComponent/pdpComponent.scss';

class PdpComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      skuData: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.props.data.skuData.map(skuLevelData => {
      if (this.props.skuId.skuId === skuLevelData.uniqueID) {
        this.setState({
          skuData: skuLevelData,
          isLoading: false,
        });
      }
    });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="galleryArea">
        {!isLoading ? (
          <Row className="no-margin">
            <Col className="no-paddingLeft" md={7} sm={12} xs={12}>
              <div className="GalleryBox">
                <Productimageandvideo
                  imagesAndVideos={this.state.skuData.attachments}
                  ribbonText={this.state.skuData.ribbonText}
                />
              </div>
            </Col>
            <Col md={4} sm={12} xs={12}>
              <div className="GallerytextBox">
                {
                  <ProductInfo
                    productData={this.state.skuData}
                    defAttributes={this.props.data.defAttributes}
                    PdpEspot={this.props.espot.data}
                  />
                }
              </div>
            </Col>
          </Row>
        ) : (
          <div> Data is Loading..</div>
        )}
        {/* <Row className='no-margin'>
                        <Col className='no-paddingLeft' md={7} sm={12} xs={12}>   
                        <div className='GalleryBox'>                  
                            {/*<Productimageandvideo 
                                imagesAndVideos={this.props.data.productData.imagesAndVideos}
                                ribbonText={this.props.data.productData.ribbonText}
                            />}
                        </div>
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                        <div className='GallerytextBox'>
                            <ProductDefAttriutes defAttributes={this.props.data.defAttributes} />
                        </div>
                        </Col>
                    </Row> */}
        <Row>
          <Col md={12} sm={12} xs={12}>
            <ProductFeatures productFeature={this.props.data.productFeatures} />
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <PurchaseGuide purchaseGuide={this.props.data.purchaseGuide} />
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <ProductDetail productDetail={this.props.data.productDetails} />
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <ProductKeywords productKeywords={this.props.data.keywords} />
          </Col>
        </Row>
        <Row>
          {!isLoading ? (
            <SimilarProducts
              similarProducts={this.state.skuData.similarProducts}
            />
          ) : (
            <div> Data is Loading..</div>
          )}
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <PdpEspot espot={this.props.espot.data} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PdpComponent;
