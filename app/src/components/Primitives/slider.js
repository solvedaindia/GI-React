import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
// import BannerData from '../../data/BannerData.json';
import '../../../public/styles/slider.scss';
import {
  heroSliderAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';

class FullBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroSlider: null,
      isLoading: false,
      error: null,     
    };
  }

  getSliderData() {
    apiManager
      .get(heroSliderAPI)
      .then(response => {
        const {data} = response || {}
        this.setState({
          heroSlider: data && data.data.bannerList,
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
    this.getSliderData();
  }

  

  handleOnClick (e) {
    window.scrollTo(0, 0);
  }

  render() {
    const { heroSlider } = this.state;
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
      <div className="fsBanner">
        <Slider {...settings}>
          {!!heroSlider &&
            heroSlider.map((sliderData, index) => (
              <a href={sliderData.onClickUrl} onClick={e => this.handleOnClick(e)} onMouseDown={e => this.handleOnClick(e)} key={index}>
                <img src={sliderData.imageSrc} alt={sliderData.alt} />
              </a>
            ))}
        </Slider>
      </div>
    );
  }
}

export default FullBanner;
