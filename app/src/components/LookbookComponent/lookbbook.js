import React, { Component } from "react";
import Slider from "react-slick";
import '../../../public/styles/Inspiration/inspiration.scss'


export default class Lookbook extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="Bitmap" src={require('../../../public/images/0731-2.png')} alt="rectangle"/>
    const img2 = <img className="Bitmap" src={require('../../../public/images/0731-2.png')} alt="rectangle"/>
    const img3 = <img className="Bitmap" src={require('../../../public/images/0731-2.png')} alt="rectangle"/>
    const img4 = <img className="Bitmap" src={require('../../../public/images/0731-2.png')} alt="rectangle"/>
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
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 3
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