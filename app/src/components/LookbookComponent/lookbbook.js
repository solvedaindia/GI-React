import React, { Component } from "react";
import Slider from "react-slick";
import apiManager from '../../utils/apiManager';

import '../../../public/styles/static-pages/inspiration.scss'
import {
  lookBookSummerSparkAPI,
} from '../../../public/constants/constants';
const prevArrowImg = (
  <img clasName="leftArrow" src={require('../SVGs/carousel__arrowLeft.svg')} />
);
const nextArrowImg = (
  <img src={require('../SVGs/carousel__arrowRight.svg')} />
);

export default class Lookbook extends Component {
  constructor(props) {
    super(props);
  

    this.state = {
      slides: [],
      lookSlider: null,
      isLoading: false,
      error: null,
      title: '',
      description:'',
    };
  }

  
  getLookBookData() {
    apiManager
      .get(lookBookSummerSparkAPI)
      .then(response => {
        console.log('response of kitchen hall', response)
        const {data} = response || {}
        this.setState({
          lookSlider: data && data.data.bannerList,
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
    this.getLookBookData();
  }
  render() {
    const { lookSlider, title, description } = this.state;

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 3,
      arrows: true,
      prevArrow: prevArrowImg,
      nextArrow: nextArrowImg
    };
    return (
      <>

        <h1 className="title">{this.state.title}</h1>
               <p className="paragraph">{this.state.description}</p>
      <div className='container'>
        <Slider {...settings}>
          {this.state.slides.map(function(slide) {
            return (
              <div key={slide}>
                <h3>{slide}</h3>
              </div>
            );
          })}
        </Slider>
      </div>
      </>
    );
  }
}