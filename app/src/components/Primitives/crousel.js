import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import {isMobile} from '../../utils/utilityManager';

import {
  lookbookThemeAPI,
  FullImg,
  imagePrefix,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
const prevArrowImg = (
    <img clasName="leftArrow" src={require('../SVGs/carousel__arrowLeft.svg')} />
  );
  const nextArrowImg = (
    <img src={require('../SVGs/carousel__arrowRight.svg')} />
  );
  

class LookbookThemeCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hallSlider: null,
      isLoading: false,
      error: null,
      title: '',
      description:'',
      
    };
  }

  getkitchensHallData() {
    apiManager
      .get(lookbookThemeAPI)
      .then(response => {
        console.log('response of kitchen hall', response)
        const {data} = response || {}
        this.setState({
          hallSlider: data && data.data.bannerList,
          title: data && data.data.title,
          description:data && data.data.desc,
          isLoading: false,
        });
        console.log('hall Data', data.data.desc);
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
    this.getkitchensHallData();
  }

  render() {
    const { hallSlider } = this.state;
    // console.log('test data', description)
    const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 2,
            prevArrow: prevArrowImg,
            nextArrow: nextArrowImg,
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
                  slidesToShow: 3,
                  slidesToScroll: 2,
                  dots: false,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  dots: false,
                },
              },
            ],
          };
    return (
      <div className="fsBanner">
          <h1 className="title">{this.state.title}</h1>
          <p className="Paragraphhall">{this.state.description}</p>
          <Slider {...settings}>
            {!!hallSlider &&
              hallSlider.map((sliderData, index) => (
                <a href={sliderData.onClickUrl} key={index} className='browse-theme'>
                  <img className='loobookImg' src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
                </a>
              ))}
          </Slider>
      </div>
    );
  }
}

export default LookbookThemeCarousel;



