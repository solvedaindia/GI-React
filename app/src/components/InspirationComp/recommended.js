import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/Inspiration/inspiration.scss'
const prevArrowImg = (
    <img clasName="leftArrow" src={require('../SVGs/carousel__arrowLeft.svg')} />
  );
  const nextArrowImg = (
    <img src={require('../SVGs/carousel__arrowRight.svg')} />
  );
export default class Recommended extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="kitchenhallsize" src="https://www.dda.com.sg/cache_data/products//r-0-520-60-user-data-products-000406-FINAL-LIVING-DINING-VIEW-2.jpg" alt="rectangle"/>
    const img2 = <img className="kitchenhallsize" src="https://www.dda.com.sg/cache_data/products//r-0-520-60-user-data-products-000406-FINAL-LIVING-DINING-VIEW-2.jpg" alt="rectangle"/>
    const img3 = <img className="kitchenhallsize" src="https://s3-ap-southeast-1.amazonaws.com/static-pages-test/static-pages/img/full-house/4bhk/master-bedroom.jpg" alt="rectangle"/>
    const img4 = <img className="kitchenhallsize" src="http://images.homify.com/image/upload/c_scale,h_282,w_500/v1495001963/p/photo/image/2013905/CAM_2_OPTION_1.jpg" alt="rectangle"/>
    const img5 = <img className="kitchenhallsize" src="https://www.thespruce.com/thmb/uDiBfqChm2eqWSWLwTweqXmfmpM=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-494358447-59a2b77ad963ac00116b7e36.jpg"/>
    const img6 = <img className="kitchenhallsize" src="http://1.bp.blogspot.com/_C4L8XftIrHU/SxmNmVjA8-I/AAAAAAAAD34/K9ZCryqm1KI/s400/Cat-friendly-House-Design.jpg" alt="rectangle"/>

    this.state = {
      slides: [img1, img2, img3, img4, img5, img6]
    };
    this.click = this.click.bind(this);
  }
  click() {
    const { slides } = this.state;
    this.setState({
      slides:
        slides.length === 6 ? [img1, img2, img3, img4, img5, img6, "", "", ""] : [img1, img2, img3, img4, img5, img6]
    });
  }


  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
      prevArrow: prevArrowImg,
      nextArrow: nextArrowImg
    };
    return (
        <div>
      <div className="container">
        <h2 className="RecHead">Recommended Lookbooks</h2>
        </div>

        <Slider {...settings}>
          {this.state.slides.map(function(slide) {
            return (
              <div key={slide}>
                <h3>{slide} <div className="crousdiv"><h1 className="subheadet">Talking Textures</h1><p className="Paragraph-Copy-133">The new way to style velvet in your living room lorem<br/>ipsum </p></div></h3>
              </div>
            );
          })}
        </Slider>

        </div>
    );
  }
}