import React, { Component } from "react";
import Slider from "react-slick";
import '../../../public/styles/static-pages/inspiration.scss'
const prevArrowImg = (
  <img clasName="leftArrow" src={require('../SVGs/carousel__arrowLeft.svg')} />
);
const nextArrowImg = (
  <img src={require('../SVGs/carousel__arrowRight.svg')} />
);

export default class Lookbook extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="Bitmap" src="https://203.110.85.50/imagestore/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner3.jpg" alt="rectangle"/>
    const img2 = <img className="Bitmap" src="https://203.110.85.50/imagestore/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner3.jpg" alt="rectangle"/>
    const img3 = <img className="Bitmap" src="https://203.110.85.50/imagestore/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner3.jpg" alt="rectangle"/>
    const img4 = <img className="Bitmap" src='https://203.110.85.50/imagestore/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner3.jpg' alt="rectangle"/>
  

    this.state = {
      slides: [img1, img2, img3, img4]
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
      slidesToShow: 2,
      slidesToScroll: 3,
      arrows: true,
      prevArrow: prevArrowImg,
      nextArrow: nextArrowImg
    };
    return (
      <div>
        <Slider {...settings}>
          {this.state.slides.map(function(slide) {
            return (
              <div key={slide}>
                <h3>{slide}</h3>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}