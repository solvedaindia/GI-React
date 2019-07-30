import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/static-pages/kitchens.scss'

export default class KitchenBanner extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="bann" src="http://www.metrointeriordecorators.in/img/kitchen/kitchen-banner.jpg" alt="rectangle"/>
    const img2 = <img className="bann" src="http://www.metrointeriordecorators.in/img/kitchen/kitchen-banner.jpg" alt="rectangle"/>
    const img3 = <img className="bann" src="http://www.metrointeriordecorators.in/img/kitchen/kitchen-banner.jpg" alt="rectangle"/>
    

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
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 2,
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