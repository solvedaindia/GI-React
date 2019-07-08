import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/wardrobes/warobes.scss'
const prevArrowImg = (
  <img clasName="leftArrow" src={require('../SVGs/carousel__arrowLeft.svg')} />
);
const nextArrowImg = (
  <img src={require('../SVGs/carousel__arrowRight.svg')} />
);
export default class wardrobesHAll extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="kitchenhallsize" src={require('../../../public/images/cr1.jpg')} alt="rectangle"/>
    const img2 = <img className="kitchenhallsize" src={require('../../../public/images/cr2.jpg')} alt="rectangle"/>
    const img3 = <img className="kitchenhallsize" src={require('../../../public/images/cr3.jpg')} alt="rectangle"/>
    const img4 = <img className="kitchenhallsize" src={require('../../../public/images/cr4.jpg')} alt="rectangle"/>
    const img5 = <img className="kitchenhallsize" src={require('../../../public/images/cr6.jpg')} alt="rectangle"/>
    const img6 = <img className="kitchenhallsize" src={require('../../../public/images/cr0.jpg')} alt="rectangle"/>

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
        <h2 className="Kitchen-Hall-Of-Fame">Wardrobes Hall of Fame</h2>
        <p3 className="Paragraphhall">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br /> tempor incididunt ut labore et dolore magna aliquat enim ad minim.</p3>
        </div>

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