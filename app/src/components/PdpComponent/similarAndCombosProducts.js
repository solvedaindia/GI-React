import React from 'react';
import Slider from 'react-slick';
import { Row, Col } from 'react-bootstrap';
import {
  newMachineUrl,
  store,
  catalog,
  imagePrefix,
} from '../../../public/constants/constants';

const prevArrowImg = (
  <img src={`${imagePrefix}/images/godrejInterio/LeftArrow.svg`} />
);
const nextArrowImg = (
  <img src={`${imagePrefix}/images/godrejInterio/RightArrow.svg`} />
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
    return props.map((data, index) => {
      const imgUrl = `${imagePrefix}${data.thumbnail}`;

      return (
        <div className="similarProducts" key={index}>
          <div className="productlist">
            <div className="imgBox">
              <img className="imgfullwidth" src={imgUrl} alt="Img" />
            </div>
            <div className="product-text">
              <p className="heading text">{data.productName}</p>

              <p className="price text">
                <span className="discount-price">
                  &#8377;
                  {data.offerPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
                {data.offerPrice < data.actualPrice && (
                  <span className="priceno-discount">
                    &#8377;
                    {data.actualPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              </p>
              <p className="emi-text text">
                <span className="free-accessories">
                  EMI Starting from <span className="bold">{data.emiData}</span>
                </span>
                <span className="bold">{data.discount}% Off </span> on this
                product
              </p>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: prevArrowImg,
      nextArrow: nextArrowImg,
    };
    return (
      <>
        {this.props.similarCombosProducts.combos.length > 0 &&
          this.props.similarCombosProducts.similarProducts.length > 0 && (
          <Col md={12} sm={12} xs={12} className="similarProduct-Wrapper">
              <Row>
                <Col
                  md={12}
                  sm={12}
                  xs={12}
                  className="similar-pro-tab text-center"
                >
                  <a
                    role="button"
                    id="similarHead"
                    className="tabs active"
                    onClick={this.productsType.bind(this, 'similar', 'combos')}
                  >
                    Similar Products
                  </a>
                  <a
                    role="button"
                    id="combosHead"
                    className="tabs"
                    onClick={this.productsType.bind(this, 'combos', 'similar')}
                  >
                    Combos You May Like
                  </a>
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
                      this.props.similarCombosProducts.similarProducts,
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
                      this.props.similarCombosProducts.combos,
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
