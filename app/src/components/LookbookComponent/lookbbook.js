import React, { Component } from "react";
import Slider from "react-slick";
import apiManager from '../../utils/apiManager';

import '../../../public/styles/static-pages/inspiration.scss'
import {espotAPI,imagePrefix} from '../../../public/constants/constants';

export default class Lookbook extends Component {
  constructor(props) {
    super(props);
  

    this.state = {
      espotName:'GI_LOOKBOOK_SUMMER_SPARK',
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
    .get(espotAPI + this.state.espotName)
      .then(response => {
        const {data} = response || {}
        this.setState({
          lookSlider: data && data.data.bannerList,
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
    this.getLookBookData();
  }
  render() {
    const { lookSlider, title, description } = this.state;

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 3,
      arrows: true,
      
    };
    return (
      <>
      <div className='container'>
<div className='lookbookImgSize'>
        <h1 className="title">{title}</h1>
               <p className="paragraph">{description}</p>
        <Slider {...settings}>
        {!!lookSlider &&
            lookSlider.map((sliderData, index) => (
              <a href={sliderData.onClickUrl} key={index} className='slides'>
                <img  src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
               </a>

            ))}
        </Slider>
      </div>
      </div>
      </>
    );
  }
}