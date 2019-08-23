import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/static-pages/aboutUs.scss'
import {
 imagePrefix,
} from '../../../public/constants/constants';

export default class GreenInitiatives extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="greenImage" src={`${imagePrefix}/staticImages/aboutUs/greenguard.jpg`} alt=""/>
    const img2 = <img className="greenImage" src={`${imagePrefix}/staticImages/aboutUs/greenguard.jpg`} alt=""/>
    const img3 = <img className="greenImage" src={`${imagePrefix}/staticImages/aboutUs/greenguard.jpg`} alt=""/>
    

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
    slidesToShow: 2,
    slidesToScroll: 2,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
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