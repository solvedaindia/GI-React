import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/static-pages/warobes.scss';
import apiManager from '../../utils/apiManager';

import {espotAPI,imagePrefix,} from '../../../public/constants/constants';

export default class WrdrobesTypes extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="typeskitchenimg" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt=""/>
    const img2 = <img className="typeskitchenimg" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt=""/>
    const img3 = <img className="typeskitchenimg" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt=""/>
    const img4 = <img className="typeskitchenimg" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt=""/>
    const img5 = <img className="typeskitchenimg" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt=""/>
    const img6 = <img className="typeskitchenimg" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt=""/>

    this.state = {
      espotName:'GI_TYPES_OF_MODULAR_WARDROBES',
      slides: [img1, img2, img3, img4, img5, img6],
      wardrobeSlider: null,
      isLoading: false,
      error: null,
      title: '',
      description: '',
      type: ''
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
  getTypesOfWardobData() {
    apiManager
    .get(espotAPI + this.state.espotName)
      .then(response => {
        const {data} = response || {}
        this.setState({
          wardrobeSlider: data && data.data.bannerList,
          title: data && data.data.title,
          description: data && data.data.desc,
          type: data && data.data.type,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }
  

  componentDidMount() {
    this.getTypesOfWardobData();
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
<h1 className='Types-of-Modular-War'>{this.state.title}</h1>
        <p className="Paragraphhall">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br /> tempor incididunt ut labore et dolore magna aliquat enim ad minim.</p>
        </div>

        <Slider {...settings}>
          {this.state.slides.map(function(slide) {
            return (
              <div key={slide}>
                {slide} <div className="crousdiv"><p className="Paragraph-Copy-13">Chennai, L Kitchen</p></div>
              </div>
            );
          })}
        </Slider>

        </div>
    );
  }
}