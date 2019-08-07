import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/static-pages/aboutUs.scss'


export default class GreenInitiatives extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="greenImage" src={require('../../../public/images/rectimg.jpg')} alt="rectangle"/>
    const img2 = <img className="greenImage" src={require('../../../public/images/rectimg.jpg')} alt="rectangle"/>
    const img3 = <img className="greenImage" src={require('../../../public/images/rectimg.jpg')} alt="rectangle"/>
    

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
      // slidesToShow: 1.2,
      // slidesToScroll: 2,
      slidesToShow: 2,
      slidesToScroll: 2,
      arrows: false,
      centerMode: true,
    // centerMode: true
    };
    return (
        <div>
 <Slider {...settings}>
          {this.state.slides.map(function(slide) {
            return (
              <div key={slide}>               
                <div className='row'>
                  <div className='col-md-4'>
{slide}
                  </div>
                  <div className='col-md-8'>
                    <h2 className='ULcontent'>UL Greenguard</h2>
                  <p className='ULparagraph'>your information is secure and encrypted, consectetur
                adipisicing elit,sed do eiumsod tempor incididunt ut
                labore et dalore magna aliqion anim ad minim.</p>
                  </div>

                </div>
                
               
              </div>
            );
          })}
        </Slider>

        </div>
    );
  }
}