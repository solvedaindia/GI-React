import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/static-pages/warobes.scss';

export default class WrdrobesTypes extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="typeskitchenimg" src='https://203.110.85.50/imagestore/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png' alt="rectangle"/>
    const img2 = <img className="typeskitchenimg" src='https://203.110.85.50/imagestore/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png' alt="rectangle"/>
    const img3 = <img className="typeskitchenimg" src='https://203.110.85.50/imagestore/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png' alt="rectangle"/>
    const img4 = <img className="typeskitchenimg" src='https://203.110.85.50/imagestore/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png' alt="rectangle"/>
    const img5 = <img className="typeskitchenimg" src='https://203.110.85.50/imagestore/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png' alt="rectangle"/>
    const img6 = <img className="typeskitchenimg" src='https://203.110.85.50/imagestore/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png' alt="rectangle"/>

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
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
        <div>
      <div className="container">

        <p className="Paragraphhall">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br /> tempor incididunt ut labore et dolore magna aliquat enim ad minim.</p>
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