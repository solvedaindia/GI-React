import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/static-pages/InspirationDetails.scss'
import {
  imagePrefix,
} from '../../../public/constants/constants';
export default class Recommended extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="recImages" src={`${imagePrefix}/staticImages/kitchens/typekitchfirst.png`} alt=""/>
    const img2 = <img className="recImages" src={`${imagePrefix}/staticImages/kitchens/typekitchfirst.png`} alt=""/>
    const img3 = <img className="recImages" src={`${imagePrefix}/staticImages/kitchens/typekitchfirst.png`} alt=""/>
    const img4 = <img className="recImages" src={`${imagePrefix}/staticImages/kitchens/typekitchfirst.png`} alt=""/>
    const img5 = <img className="recImages" src={`${imagePrefix}/staticImages/kitchens/typekitchfirst.png`}/>
    const img6 = <img className="recImages" src={`${imagePrefix}/staticImages/kitchens/typekitchfirst.png`} alt=""/>

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
    
    };
    return (
      <div className="container recommendedLookbook">
        <h2 className="recommendedTitle">Recommended Lookbooks</h2>
       

        <Slider {...settings}>
          {this.state.slides.map(function(slide) {
            return (
              <div key={slide}>
                {slide} <div className="crouseltextarea">
                  <h2 className="heading">Talking Textures</h2>
                  <p className="subText">The new way to style velvet in your living room lorem<br/>ipsum</p></div>
              </div>
            );
          })}
        </Slider>

        </div>
    );
  }
}