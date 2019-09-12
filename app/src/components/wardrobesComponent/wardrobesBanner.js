import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/warobes.scss';

import {imagePrefix,espotAPI} from '../../../public/constants/constants';

class WardrobeBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName:'GI_WARDROBES_BANNER',
      wardrobeSlider: null,
      isLoading: false,
      error: null,
      title: '',
      description: '',
      type: ''

    };
  }

  getWardrobesBannerData() {
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
    this.getWardrobesBannerData();
  }

  render() {
    const { wardrobeSlider } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="fsBanner">
        <Slider {...settings}>
          {!!wardrobeSlider &&
            wardrobeSlider.map((sliderData, index) => (
              <a href={sliderData.onClickUrl} key={index}>
                <img src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
              </a>
            ))}
        </Slider>
      </div>
    );
  }
}

export default WardrobeBanner;
