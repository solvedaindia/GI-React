import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/static-pages/aboutUs.scss'


export default class GreenInitiatives extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="greenImage" src={require('../../../public/images/greenGuard.jpg')} alt="rectangle"/>
    const img2 = <img className="greenImage" src={require('../../../public/images/greenGuard.jpg')} alt="rectangle"/>
    const img3 = <img className="greenImage" src={require('../../../public/images/greenGuard.jpg')} alt="rectangle"/>
    

    this.state = {
      slides: [img1, img2, img3]
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
      slidesToShow: 1.8,
      slidesToScroll: 3,
    // centerMode: true
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