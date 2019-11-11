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
    };
    return (
      hallSlider && 
      <div className="hallOfFame">
        <h2 className="title">{title}</h2>
        <p className="desc">{description}</p>
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



