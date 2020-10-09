import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { imagePrefix } from '../../../../public/constants/constants';
import Accordion from './Accordion';
import '../../../../public/styles/pdpComponent/accordian.scss';
import Slider from 'react-slick';
import {PRODUCT_FEATURES} from '../../../constants/app/pdpConstants';

class productFeatures extends React.Component {
  render() {
    let defaultImgPath;
    let fullImagePath;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            prevArrow: false,
            nextArrow: false,
            centerMode: false,
            infinite: true,
          },
        },
      ],
    };
    if (this.props.productFeatureData.productFeatures.length > 0) {
      defaultImgPath =
        imagePrefix +
        this.props.productFeatureData.productFeatures[0].imagePath;
    }
    return (
      <>
        {this.props.productFeatureData.productFeatures &&
          this.props.productFeatureData.productFeatures.length > 0 && (
          <Col md={12} sm={12} xs={12}>
            <div className="PdpFeatures">
              <div className="featureVertical-tab" id="featureVertical-tab">
                <Row>
                  <Col md={12} sm={12} xs={12}>
                    <div className="headingBox">
                      <h2 className="heading">{PRODUCT_FEATURES}</h2>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} sm={12} xs={12}>
                    <Slider {...settings}>
                      {this.props.productFeatureData.productFeatures.map(
                        (data, index) => {
                          fullImagePath = `${imagePrefix}${data.imagePath}`;
                          if(data.imagePath === "") {
                            fullImagePath = defaultImgPath;
                          }
                        return(
                        <div className="featureResponsiveview">
                          <div className="featureImgbox">
                            <img src={fullImagePath} className="imgfullwidth" alt={data.title} />
                          </div>

                          <ul className="featureTextbox">
                            <h3 className="heading">{data.title}</h3>
                            <li className='list'>{data.description}</li>
                          </ul>
                            </div>
                          );
                        })
                      }
                    </Slider>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        )}
      </>
    );
  }
}

export default productFeatures;
