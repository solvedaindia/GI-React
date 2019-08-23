import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/warobes.scss';

import {
  wardrobesHallAPI,
  imagePrefix,
} from '../../../public/constants/constants';

class WardrobesHAll extends React.Component {
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

  getWardrobesHallData() {
    apiManager
      .get(wardrobesHallAPI)
      .then(response => {
        console.log('response of wardrobe hall', response)
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
    this.getWardrobesHallData();
  }

  render() {
    const { hallSlider } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll:2,
    };
    return (
      <div className="fsBanner">
         <h2 className="Kitchen-Hall-Of-Fame">{this.state.title}</h2>
     <p className="Paragraphhall">{this.state.description}</p>
        <Slider {...settings}>
          {!!hallSlider &&
            hallSlider.map((sliderData, index) => (
              <a href={sliderData.onClickUrl} key={index}>
                <img className='wardrobehallsize' src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
               </a>
            ))}
        </Slider>
      </div>
    );
  }
}

export default WardrobesHAll;
