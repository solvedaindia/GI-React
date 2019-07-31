import React, { Component } from "react";
import Slider from "react-slick";
const prevArrowImg = (
  <img clasName="leftArrow" src={require('../SVGs/carousel__arrowLeft.svg')} />
);
const nextArrowImg = (
  <img src={require('../SVGs/carousel__arrowRight.svg')} />
);

export default class WhyPeopleLove extends Component {
  constructor(props) {
    super(props);
    const para1 = <p className="CrousParagraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do<br /> eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut<br /> enim ad minim veniam, quis nostrud</p>
    const para2 = <p className="CrousParagraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do<br /> eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut<br /> enim ad minim veniam, quis nostrud</p>
    const para3 = <p className="CrousParagraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do<br /> eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut<br /> enim ad minim veniam, quis nostrud</p>
    const para4 = <p className="CrousParagraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do<br /> eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut<br /> enim ad minim veniam, quis nostrud</p>
    const para5 = <p className="CrousParagraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do<br /> eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut<br /> enim ad minim veniam, quis nostrud</p>
    const para6 = <p className="CrousParagraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do<br /> eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut<br /> enim ad minim veniam, quis nostrud</p>

    this.state = {
      slides: [para1, para2, para3, para4, para5, para6]
    };
    this.click = this.click.bind(this);
  }
  click() {
    const { slides } = this.state;
    this.setState({
      slides:
        slides.length === 6 ? [para1, para2, para3, para4, para5, para6, "", "", ""] : [para1, para2, para3, para4, para5, para6]
    });
  }


  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
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