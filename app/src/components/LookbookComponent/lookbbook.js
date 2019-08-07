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
    const img1 = <img className="Bitmap" src="https://storage.googleapis.com/gen-atmedia/2/2019/03/Interior-Define-Sloan-Sectional-1.jpg" alt="rectangle"/>
    const img2 = <img className="Bitmap" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkiBethJNOqa4_GbiZYZ7Irj8s2Fw7cg9R1XuSPQnrylAcVWep" alt="rectangle"/>
    const img3 = <img className="Bitmap" src="https://storage.googleapis.com/gen-atmedia/2/2019/03/Interior-Define-Sloan-Sectional-1.jpg" alt="rectangle"/>
    const img4 = <img className="Bitmap" src={require('../../../public/images/1.jpg')} alt="rectangle"/>
    // const img5 = <img className="Bitmap" src={require('../../../public/images/ss5.png')} alt="rectangle"/>
    // const img6 = <img className="Bitmap" src={require('../../../public/images/ss4.png')} alt="rectangle"/>

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