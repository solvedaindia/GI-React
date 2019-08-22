

import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/kitchen.scss'

import {
  whatGoesKitchenAPI,
  imagePrefix,
  storeId,
  accessToken,
} from '../../../public/constants/constants';

class WhatGoes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      .get(whatGoesKitchenAPI)
      .then(response => {
        console.log('response of whatgoes banner', response)
        const {data} = response || {}
        this.setState({
          whatGoesSlider: data && data.data.bannerList,
          title: data && data.data.title,
          imageDescription: data && data.data.imgDesc,
          type: data && data.data.type,
          isLoading: false,
          imageHeading:  data && data.data.imgHeading
        });
        console.log('whatgoes Data',  data.data.bannerList[0].imgDesc);
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
        console.log('SLider Data Error');
      });
    console.log('SLider Data Error');
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
    };
    return (
      <div className="goesOnKitchen">
            <h1 className="title">{this.state.title}</h1>
            <Slider {...settings}>
            {!!whatGoesSlider &&
              whatGoesSlider.map((sliderData, index) => (
              <a href={sliderData.onClickUrl} key={index}>
                <img  src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
              </a>
              ))}
            </Slider>
      </div>
    );
  }
}

export default WhatGoes;
