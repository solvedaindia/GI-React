import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/about-us/aboutUs.scss'
export default class OurProcess extends Component {
  constructor(props) {
    super(props);
     const img1 = <img className="rawpixel-983726-unsplash" src={require('../../../public/images/Bailbrook-House.jpg')} alt="rectangle"/>
    const img2 = <img className="rawpixel-983726-unsplash" src={require('../../../public/images/interior.jpg')} alt="rectangle"/>
    const img3 = <img className="rawpixel-983726-unsplash" src={require('../../../public/images/Bailbrook-House.jpg')} alt="rectangle"/>
    const img4 = <img className="rawpixel-983726-unsplash" src={require('../../../public/images/product1.jpg')} alt="rectangle"/>
    const img5 = <img className="rawpixel-983726-unsplash" src={require('../../../public/images/teach.jpg')} alt="rectangle"/>
   
    this.state = {
      slides: [img1, img2, img3, img4, img5]
    };
    this.click = this.click.bind(this);
  }
  click() {
    const { slides } = this.state;
    this.setState({
      slides:
        slides.length === 6 ? [img1, img2, img3, img4, img5, img6, "", "", ""] : [img1, img2, img3, img4, img5]
    });
  }


  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 2
    };
    return (
        <div>
 <Slider {...settings}>
          {this.state.slides.map(function(slide) {
            return (
              <div key={slide}>
                <h3>{slide} <div className="crousdiv"><p className="Paragraph-Copy-13">Chennai, L Kitchen</p></div></h3>
              </div>
            );
          })}
        </Slider>

        </div>
    );
  }
}