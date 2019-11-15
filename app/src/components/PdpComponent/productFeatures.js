import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { imagePrefix } from '../../../public/constants/constants';
import {PRODUCT_FEATURES} from '../../constants/app/pdpConstants';



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
    if (this.props.productFeatureData.productFeatures.length > 0) {
      defaultImgPath = imagePrefix+this.props.productFeatureData.productFeatures[0].imagePath;
    }
        
    return (
      <>
        {this.props.productFeatureData.productFeatures && this.props.productFeatureData.productFeatures.length > 0 && (
          <Col md={12} sm={12} xs={12}>
            <div className="PdpFeatures">
              <div className="featureVertical-tab">
                <Row>
                  <Col md={12} sm={12} xs={12}>
                    <div className="headingBox">
                      <h2 className="heading">{PRODUCT_FEATURES}</h2>
                    </div>
                  </Col>
                </Row>
                <div className="row">
                  <Col md={6} sm={12} xs={12}>
                    <div className="featureImgbox">			 
                      {this.props.productFeatureData.productFeatures.map(
                        (featureImagePath, index) => {
                           let fullImagePath = ``;
                           if(featureImagePath.imagePath === "") {
                              fullImagePath = defaultImgPath;
                           }else{
                           fullImagePath = `${imagePrefix}${featureImagePath.imagePath}`;
                           }
                          this.dataClass = '';
                          if (index > 0) {
                            this.dataClass = 'dataNotActive';
                          }

                          return (
                            <div
                              id={`featureImage_${index}`}
                              key={index}
                              className={`featureImages ${this.dataClass}`}
                            >
                              <img
                                src={fullImagePath}
                                className="imgfullwidth"
                              />
                            </div>
                          );
                        })
					}
                    </div>
                  </Col>
                  <Col md={6} sm={12} xs={12}>
                    <ul className="verticalTab">
                      {this.props.productFeatureData.productFeatures.map(
                        (featureData, i) => (
                          <li
                            className={
                              this.isActive(i) ? 'list active' : 'list'
                            }
                            key={i}
                            onClick={() => this.setActiveTab(i)}
                          >
                            <a
                              className="link"
                              role="button"
                              onClick={this.showFeatureImage.bind(this, i)}
                            >
                              <h2 className="heading">{featureData.title}</h2>
                              {featureData.description}
                            </a>
                          </li>
                        ),
                      )}
                    </ul>
                  </Col>
                </div>
              </div>
            </div>
          </Col>
        )}
      </>
    );
  }
}

export default productFeatures;
