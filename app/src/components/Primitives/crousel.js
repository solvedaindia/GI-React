import React, { Component } from "react";
import Slider from "react-slick";

export default class Inscrousel extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="Oval-Copy-6" src={require('../../../public/images/cr1.jpg')} alt="rectangle"/>
    const img2 = <img className="Oval-Copy-6" src={require('../../../public/images/cr1.jpg')} alt="rectangle"/>
    const img3 = <img className="Oval-Copy-6" src={require('../../../public/images/cr1.jpg')} alt="rectangle"/>
    const img4 = <img className="Oval-Copy-6" src={require('../../../public/images/cr1.jpg')} alt="rectangle"/>
    const img5 = <img className="Oval-Copy-6" src={require('../../../public/images/cr1.jpg')} alt="rectangle"/>
    const img6 = <img className="Oval-Copy-6" src={require('../../../public/images/cr1.jpg')} alt="rectangle"/>
    const img7 = <img className="Oval-Copy-6" src={require('../../../public/images/cr1.jpg')} alt="rectangle"/>
    const img8 = <img className="Oval-Copy-6" src={require('../../../public/images/cr1.jpg')} alt="rectangle"/>

    this.state = {
      slides: [img1, img2, img3, img4, img5, img6, img7, img8]
    };
  }
  render() {
    const settings = {
      dots: false,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000
    };
    return (
      <div>
        <h2 className="Browse-Lookbook-by-T">Browse Lookbook by Theme</h2>
        <Slider {...settings}>
          {this.state.slides.map(function(slide) {
            return (
              <div key={slide} className='themeSlider'>
                <figure className='themeSlides'>{slide}<h4 className="crusealHead">Classic</h4></figure>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}