import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { imagePrefix } from '../../../../public/constants/constants';
import Accordion from './Accordion';
import '../../../../public/styles/pdpComponent/accordian.scss';
import Slider from 'react-slick';
import {PRODUCT_FEATURE} from '../../../constants/app/pdpConstants';

class productFeatures extends React.Component {
  constructor() {
    super();
    this.dataClass = '';
    this.state = {
      selectedTabId: 0,
    };
  }

  isActive = id => this.state.selectedTabId === id;

  setActiveTab = selectedTabId => {
    this.setState({ selectedTabId });
  };

  /* show feature images */
  showFeatureImage(divId) {
    const featureImages = document.getElementsByClassName('featureImages');
    const contentElement = document.getElementById(`featureImage_${divId}`);
    for (let i = 0; i < featureImages.length; i++) {
      featureImages[i].classList.remove('dataNotActive');
      featureImages[i].classList.add('dataNotActive');
    }
    contentElement.classList.remove('dataNotActive');
  }

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
            infinite: true
          }
        }
      ]
    }
    if (this.props.productFeatureData.productFeatures.length > 0) {
      defaultImgPath = imagePrefix+this.props.productFeatureData.productFeatures[0].imagePath;
    }
    return (
      <>
        {this.props.productFeatureData.productFeatures && this.props.productFeatureData.productFeatures.length > 0 && (
          
          <Col md={12} sm={12} xs={12}>
          
            <div className="PdpFeatures">
            <Accordion>
              <div className="featureVertical-tab" id="featureVertical-tab">
                <Row>
                  <Col md={12} sm={12} xs={12}>
                    <div className="headingBox">
                      <h2 className="heading">{PRODUCT_FEATURE}</h2>
                      <span className="plusIcon" onClick={this._handleClick}>
                      </span>
                    </div>
                  </Col>
                </Row>
              <div className="row body">
              <Col md={12} sm={12} xs={12}>
                 <Slider {...settings}>
                   { this.props.productFeatureData.productFeatures.map((data, index) => {                    
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
                      </div>);
                   })

                   }
                  </Slider>
                 </Col>
                </div>
              </div>
            
              </Accordion>
            </div>
          </Col>
        )}
      </>
    );
  }
}

export default productFeatures;
