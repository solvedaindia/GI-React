import React from 'react';
import { Col } from 'react-bootstrap';

class productFeatures extends React.Component {

    constructor() {
        super();
        this.dataClass = '';
        this.state = {
            hide: ''
        }
    }

    /* show feature images */
    showFeatureImage(divId) {
        let featureImages = document.getElementsByClassName('featureImages');
        let contentElement = document.getElementById('featureImage_'+divId);
        for (let i = 0; i < featureImages.length; i++) {
            featureImages[i].classList.remove('dataNotActive');
            featureImages[i].classList.add('dataNotActive');
        }
        contentElement.classList.remove('dataNotActive');
    }

    render() {
        return(
            <div>
                <Col md={6} sm={12} xs={12}>
                    <h3 className='heading'>Features</h3>
                    {
                        this.props.productFeature.map((imagePath, index) => {
                            this.dataClass = '';
                            if (index > 0) {
                                this.dataClass = 'dataNotActive';
                            }

                            let imgPath = '';
                            if(index % 2 === 0) {
                                imgPath = 'https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/product-2.png';
                            } else {
                                imgPath = 'https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/product-3.png';
                            }
                            return(
                                <div id={`featureImage_${index}`} key={index} className={`featureImages ${this.dataClass}`}>
                                    <img src={imgPath} />
                                </div>
                            );
                        })
                    }
                </Col>
                <Col md={6} sm={12} xs={12}>
                    {
                        this.props.productFeature.map((featureData, i) => {
                            return(
                                <div key={i}>
                                    <a role='button' onClick={this.showFeatureImage.bind(this, i)}>
                                        <h3 className='heading'>
                                            {featureData.name}
                                        </h3>
                                        {featureData.description}
                                    </a>
                                </div>
                            );
                        })
                    }
                </Col>
            </div>
        );
    }
}

export default productFeatures;