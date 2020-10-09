import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
// import BannerData from '../../data/BannerData.json';
import '../../../public/styles/slider.scss';
import { withRouter } from 'react-router-dom';
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
    this.isScrolling=false;
  }

  getSliderData() {
    apiManager
      .get(heroSliderAPI)
      .then(response => {
        const { data } = response || {};
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

  handleOnClick(e) {
    window.scrollTo(0, 0);
  }

  handleOnBannerClick(path, onNewPage) {
    const target = onNewPage && onNewPage === 'true' ? '_blank' : '_self';
    window.scrollTo(0, 0);
    if (!this.isScrolling && path) {
      if (
        path.search('http') !== -1 ||
        path.search('#') !== -1 ||
        target === '_blank'
      ) {
        window.open(path, target);
      } else {
        this.props.history.push({ pathname: path });
      }
    }
  }

  render() {
    const { heroSlider } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      
    };
    return (
      <div className="fsBanner">
        <Slider
          {...settings}
          afterChange={() => {this.isScrolling=false}}
          swipeEvent={() => {
            this.isScrolling = true;
            setTimeout(() => {this.isScrolling = false}, 1000);
          }}
        >
          {!!heroSlider &&
            heroSlider.map((sliderData, index) => (
              <a
                onClick={e => this.handleOnBannerClick(sliderData.onClickUrl, sliderData.onNewPage)}
                onMouseDown={e => this.handleOnClick(e)}
                key={index}
              >
                <img src={sliderData.imageSrc} alt={sliderData.alt} />
              </a>
            ))}
        </Slider>
      </div>
    );
  }
}

export default withRouter(FullBanner);
