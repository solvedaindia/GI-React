import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';

import {
  kitchenHallAPI,
  imagePrefix,
} from '../../../public/constants/constants';

class KitchenHall extends React.Component {
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
      .get(kitchenHallAPI)
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
                <img className='kitchenhallsize' src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
               </a>
            ))}
        </Slider>
      </div>
    );
  }
}

export default KitchenHall;



