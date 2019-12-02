import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/kitchen.scss'

import {espotAPI,imagePrefix,} from '../../../public/constants/constants';

class KitchenHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: 'GI_KITCHENS_HALL_OF_FAME',
      hallSlider: null,
      isLoading: false,
      error: null,
      title: '',
      description:'',
      
    };
  }

  getkitchensHallData() {
    apiManager
    .get(espotAPI + this.state.espotName)
      .then(response => {
        const {data} = response || {}
        this.setState({
          hallSlider: data && data.data.bannerList,
          title: data && data.data.title,
          description:data && data.data.desc,
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
    this.getkitchensHallData();
  }

  render() {
    const { hallSlider, title, description } = this.state;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
	    autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 3,
      slidesToScroll:2,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: true,
            arrows: false
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
            arrows: false
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false
          },
        },
      ],
    };
    return (
      hallSlider && 
      <div className="hallOfFame">
        <div className="hallOfFameHeadingDiv">
          <h2 className="title">{title}</h2>
          <p className="desc">{description}</p>
        </div>
        <Slider {...settings}>
          {!!hallSlider &&
            hallSlider.map((sliderData, index) => (
              <a href={sliderData.onClickUrl} key={index} className='slides'>
                <img className='img' src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
                <p className='info'>{sliderData.desc}</p>
               </a>

            ))}
        </Slider>
      </div>
    );
  }
}

export default KitchenHall;



