import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/static-pages/inspirationDetails.scss'
import apiManager from '../../utils/apiManager';

import '../../../public/styles/static-pages/inspiration.scss'
import {
  recommendedAPI,
} from '../../../public/constants/constants';
export default class Recommended extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slides: [],
      recommendedSlider: null,
      isLoading: false,
      error: null,
      title: '',
      description:'',
    };
  }

  getRecommendedData() {
    apiManager
      .get(recommendedAPI)
      .then(response => {
        console.log('response of kitchen hall', response)
        const {data} = response || {}
        this.setState({
          recommendedSlider: data && data.data.bannerList,
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
    this.getRecommendedData();
  }


  render() {
    const { recommendedSlider, title, description } = this.state;

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
    
    };
    return (
      recommendedSlider && 
      <div className="hallOfFame">
        <h2 className="title">{title}</h2>
        <p className="desc">{description}</p>
        <Slider {...settings}>
          {!!recommendedSlider &&
            recommendedSlider.map((sliderData, index) => (
              <a href={sliderData.onClickUrl} key={index} className='slides'>
                <img className='img' src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
               </a>

            ))}
        </Slider>
      </div>
    );
  }
}
