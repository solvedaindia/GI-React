import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/chefkitchen.scss';

import {imagePrefix,espotAPI} from '../../../public/constants/constants';

class ChefKitchenBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: 'GI_CHEF_KITCHENS_BANNER',
      kitchenSlider: null,
      isLoading: false,
      error: null,
      title: '',
      description: '',
      type: ''

    };
  }

  getKitchensBannerData() {
    apiManager
    .get(espotAPI + this.state.espotName)
      .then(response => {
        const {data} = response || {}
        this.setState({
          kitchenSlider: data && data.data.bannerList,
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
    this.getKitchensBannerData();
  }

  render() {
    const { kitchenSlider } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
	  autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="kitchensBannerLayout fsBanner">
        <Slider {...settings}>
          {!!kitchenSlider &&
            kitchenSlider.map((sliderData, index) => (
               <a key={index} >
				<a href={`${sliderData.onClickUrl}`} >
					<img src={`${imagePrefix}${sliderData.imageSrc}`} alt={sliderData.alt} />
				</a>
              </a>
            ))}
        </Slider>
      </div>
    );
  }
}

export default ChefKitchenBanner;
