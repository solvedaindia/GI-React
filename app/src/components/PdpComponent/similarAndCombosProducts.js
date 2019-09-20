import React from 'react';
import Slider from 'react-slick';
import { Row, Col } from 'react-bootstrap';
import {
  imagePrefix,
} from '../../../public/constants/constants';
import {createPdpURL, formatPrice } from '../../utils/utilityManager';
import {EMI_STARTING,ON_THIS_PRODUCT} from '../../constants/app/pdpConstants';


const prevArrowImg = (
  <img src={`${imagePrefix}/images/godrejInterio/LeftArrow.svg`} alt='Left' />
);
const nextArrowImg = (
  <img src={`${imagePrefix}/images/godrejInterio/RightArrow.svg`} alt='Right'/>
);
class SimilarCombosProducts extends React.Component {
  constructor() {
    super();
  }

  /* hide and show produts */
  productsType(activeType, deActiveType) {
    const activeEle = document.getElementById(`${activeType}`);
    document.getElementById(`${activeType}Head`).classList.add('active');
    activeEle.classList.remove('dataNotActive');
    activeEle.classList.add('dataActive');

    const deActiveEle = document.getElementById(`${deActiveType}`);
    document.getElementById(`${deActiveType}Head`).classList.remove('active');
    deActiveEle.classList.remove('dataActive');
    deActiveEle.classList.add('dataNotActive');
  }

  getSimilarCombosProducts(props) {
    if (props && props.length > 0) {
    return props.map((data, index) => {
      const imgUrl = `${imagePrefix}${data.thumbnail}`;
      return (
        <div className="similarProducts" key={index}>
        <a href={createPdpURL(data.productName, data.partNumber)}>
          <div className="productlist">
            <div className="imgBox">
              <img className="imgfullwidth" src={imgUrl} alt={data.productName} />
            </div>
            <div className="product-text">
              <p className="heading text">{data.productName}</p>

              <p className="price text">
              {data.offerPrice &&
                <span className="discount-price">
                  &#8377;
                  {formatPrice(data.offerPrice)}
                </span>
              }
                {data.offerPrice < data.actualPrice && (
                  <span className="priceno-discount">
                    &#8377;
                    {formatPrice(data.actualPrice)}
                  </span>
                )}
              </p>
              <p className="emi-text text">
                <span className="free-accessories">
                  {data.emiData &&
                    <>{EMI_STARTING} <span className="bold">{parseInt(data.emiData)}</span></>
                  }
                  
                </span>
                { parseInt(data.discount) > 1 &&
                <><span className="bold">{parseInt(data.discount)}% Off </span> {ON_THIS_PRODUCT}</>
                }
              </p>
            </div>
          </div>
          </a>
        </div>
      );
    });
    }
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: prevArrowImg,
      nextArrow: nextArrowImg,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
            prevArrow: false,
            nextArrow: false,
            centerMode: true,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            prevArrow: false,
            nextArrow: false,
            centerMode: true,
            infinite: true
          }
        }
      ]
    };
    let combosBundleData = '';
    let combosBundleType = '';
    let similarData = this.props.similarCombosProducts.similarProducts;
    let combosBundleObj = '';
    let isData = false;
    if (this.props.similarCombosProducts.combos) {
      combosBundleData = this.props.similarCombosProducts.combos;
      combosBundleType = 'Popular Combinations';
      combosBundleObj = combosBundleData;
    } else {
      combosBundleData = this.props.similarCombosProducts.itemInThisBundle;
      combosBundleType = 'Products In This Bundle';
      combosBundleObj = similarData;
      similarData = combosBundleData;  
    }

    if (similarData && similarData.length > 0 || combosBundleObj && combosBundleObj.length > 0) {
      isData = true;
    }

    return (
      <>
        { isData === true &&  (
            
          <Col md={12} sm={12} xs={12} className="similarProduct-Wrapper">
              <Row>
                <Col
                  md={12}
                  sm={12}
                  xs={12}
                  className="similar-pro-tab text-center"
                >
                { similarData && similarData.length > 0 &&
                  <a
                    role="button"
                    id="similarHead"
                    className="tabs active"
                    onClick={this.productsType.bind(this, 'similar', 'combos')}
                  >
                    { this.props.similarCombosProducts.combos ? (
                      <>Similar Products</>
                    ) : (
                      combosBundleType
                    )
                    }
                  </a>
                }
                { combosBundleObj && combosBundleObj.length > 0 &&
                  <a
                    role="button"
                    id="combosHead"
                    className="tabs"
                    onClick={this.productsType.bind(this, 'combos', 'similar')}
                  >
                  { this.props.similarCombosProducts.combos ? (
                      combosBundleType
                    ) : (
                      <>Similar Products</>
                    )
                    }
                  </a>
                }
              </Col>

                <Col
                  md={12}
                  sm={12}
                  xs={12}
                  id="similar"
                  className="dataActive"
                >
                  <Slider {...settings}>
                    {this.getSimilarCombosProducts(
                      similarData,
                    )}
                </Slider>
              </Col>
                <Col
                  md={12}
                  sm={12}
                  xs={12}
                  id="combos"
                  className="dataNotActive"
                >
                  <Slider {...settings}>
                    {this.getSimilarCombosProducts(
                      combosBundleObj,
                    )}
                </Slider>
              </Col>
              </Row>
          </Col>
        )}
      </>
    );
  }
}

export default SimilarCombosProducts;
