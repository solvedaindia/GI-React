import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/static-pages/warobes.scss'
const prevArrowImg = (
  <img clasName="leftArrow" src={require('../SVGs/carousel__arrowLeft.svg')} />
);
const nextArrowImg = (
  <img src={require('../SVGs/carousel__arrowRight.svg')} />
);
export default class WhatGoesward extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="Rectanglessss" src='https://pimediaonline.co.uk/wp-content/uploads/2015/02/tumblr_njxxmferwe1r5ld2yo2_1280.jpg' alt="rectangle"/>
    const img2 = <img className="Rectanglessss" src="http://www.carcrossyukon.com/wp-content/uploads/2018/10/walk-in-wardrobe.jpg" alt="rectangle"/>
    const img3 = <img className="Rectanglessss" src='https://pimediaonline.co.uk/wp-content/uploads/2015/02/tumblr_njxxmferwe1r5ld2yo2_1280.jpg' alt="rectangle"/>
    const img4 = <img className="Rectanglessss" src="http://www.carcrossyukon.com/wp-content/uploads/2018/10/walk-in-wardrobe.jpg" alt="rectangle"/>
    const img5 = <img className="Rectanglessss" src='https://pimediaonline.co.uk/wp-content/uploads/2015/02/tumblr_njxxmferwe1r5ld2yo2_1280.jpg' alt="rectangle"/>
    const img6 = <img className="Rectanglessss" src="http://www.carcrossyukon.com/wp-content/uploads/2018/10/walk-in-wardrobe.jpg" alt="rectangle"/>

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
      slidesToShow: 2,
      slidesToScroll: 2,
      prevArrow: prevArrowImg,
     nextArrow: nextArrowImg
    };
    return (
 <Slider {...settings}>
          {this.state.slides.map(function(slide) {
            return (
              <div key={slide}>
                <h3>{slide}</h3>
              </div>
            );
          })}
        </Slider>

    );
  }
}