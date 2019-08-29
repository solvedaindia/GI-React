import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/static-pages/chefkitchen.scss';
import apiManager from '../../utils/apiManager';

import {
  typesOfWardrobesAPI,
  imagePrefix,
  storeId,
  accessToken,
} from '../../../public/constants/constants';

export default class SteelKitchenTypes extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="typeskitchenimg" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt=""/>
    const img2 = <img className="typeskitchenimg" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt=""/>
    const img3 = <img className="typeskitchenimg" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt=""/>
    const img4 = <img className="typeskitchenimg" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt=""/>
    const img5 = <img className="typeskitchenimg" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt=""/>
    const img6 = <img className="typeskitchenimg" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt=""/>

    this.state = {
      slides: [img1, img2, img3, img4, img5, img6],
      wardrobeSlider: null,
      isLoading: false,
      error: null,
      title: '',
      description: '',
      type: ''
    };
    this.click = this.click.bind(this);
  }
  click() {
    const { slides } = this.state;
    this.setState({
      slides:
        slides.length === 6 ? [img1, img2, img3, img4, img5, img6, "", "", ""] : [img1, img2, img3, img4, img5, img6]
    });
  }
  getTypesOfWardobData() {
    apiManager
      .get(typesOfWardrobesAPI)
      .then(response => {
        console.log('response of wardrobes types', response)
        const {data} = response || {}
        this.setState({
          wardrobeSlider: data && data.data.bannerList,
          title: data && data.data.title,
          description: data && data.data.desc,
          type: data && data.data.type,
          isLoading: false,
        });
        console.log('types Data',data && data.data.title);
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
    this.getTypesOfWardobData();
  }


  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className='typesOfSteelContainer'>

        <div className='container'>
      <div className="container">
        </div>

        <Slider {...settings}>
          {this.state.slides.map(function(slide) {
            return (
              <div key={slide}>
                {slide} <div className="crousdiv"><p className="Paragraph-Copy-13">Chennai, L Kitchen</p></div>
              </div>
            );
          })}
        </Slider>
        </div>
        </div>
    );
  }
}