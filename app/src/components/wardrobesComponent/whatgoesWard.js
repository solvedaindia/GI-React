import React, { Component } from "react";
import Slider from "react-slick";
import '../../../public/styles/static-pages/kitchen.scss';

export default class WhatGoesward extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="Rectanglessss" src='https://203.110.85.50/imagestore/B2C/56101522SD01882/56101522SD01882_01_500x500.png' alt="rectangle"/>
    const img2 = <img className="Rectanglessss" src='https://203.110.85.50/imagestore/B2C/56101522SD01882/56101522SD01882_01_500x500.png' alt="rectangle"/>
    const img3 = <img className="Rectanglessss" src='https://203.110.85.50/imagestore/B2C/56101522SD01882/56101522SD01882_01_500x500.png' alt="rectangle"/>
    const img4 = <img className="Rectanglessss" src='https://203.110.85.50/imagestore/B2C/56101522SD01882/56101522SD01882_01_500x500.png' alt="rectangle"/>
    const img5 = <img className="Rectanglessss" src='https://203.110.85.50/imagestore/B2C/56101522SD01882/56101522SD01882_01_500x500.png' alt="rectangle"/>
    const img6 = <img className="Rectanglessss" src='https://203.110.85.50/imagestore/B2C/56101522SD01882/56101522SD01882_01_500x500.png' alt="rectangle"/>

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
    
    };
    return (
      <div className="col-md-6">
<div className='whatGoesArrow'>
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
   
</div>
    );
  }
}