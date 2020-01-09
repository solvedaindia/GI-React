

import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/kitchen.scss'

import {espotAPI,imagePrefix} from '../../../public/constants/constants';

class WhatGoes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName:'GI_MODULAR_KITCHEN_SLIDER',
      whatGoesSlider: [],
      isLoading: false,
      error: null,
      title: '',
      imageDescription: '',
      type: '',
      imageHeading: ""
    };
  }

  getWardrobesBannerData() {
    apiManager
    .get(espotAPI + this.state.espotName)
      .then(response => {
        const {data} = response || {}
        this.setState({
          whatGoesSlider: data && data.data.bannerList,
          title: data && data.data.title,
          imageDescription: data && data.data.imgDesc,
          type: data && data.data.type,
          isLoading: false,
          imageHeading:  data && data.data.imgHeading
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
    this.getWardrobesBannerData();
  }

  render() {
    const { whatGoesSlider } = this.state;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll:1,
            arrows:false,
            autoplay: false,
            dots: false,
            infinite: true,
            centerMode: false,
          }
        }
        
    ],
    };
    return (
      <div className="goesOnKitchen">
            <h2 className="title">{this.state.title}</h2>
            
            <Slider {...settings}>
            {!!whatGoesSlider &&
              whatGoesSlider.map((sliderData, index) => (			  
              <div className='what-goes-slider'>
              <a className='imgLink' href={sliderData.onClickUrl} key={index}>
                <img  src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} /></a>
                <h2 className="sliderHeading" >{sliderData.imgHeading}</h2>
                <p className="sliderDesc" >{sliderData.imgDesc}</p>
                </div>
              ))}
            </Slider>
      </div>
    );
  }
}

export default WhatGoes;
