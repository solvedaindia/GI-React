import React from 'react';
import Slider from 'react-slick';
// import GetImage from './image';
import BannerData from '../../data/BannerData.json';
import '../../../public/styles/slider.scss';

class FullBanner extends React.Component {
  render() {
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
          {BannerData.map(BannerlistData =>
            BannerlistData.bannerList.map((bannerData, index) => (
              <a href={bannerData.onClickUrl} key={index}>
                <img src={bannerData.src} alt={bannerData.alt} />
              </a>
              </a>
          )}
        </Slider>
      </div>
    );
  }
}

export default FullBanner;
