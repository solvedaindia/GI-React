// import React, { Component } from "react";
// import Slider from "react-slick";
// import  '../../../public/styles/static-pages/kitchenChef.scss'

// export default class WardrobeBanner extends Component {
//   constructor(props) {
//     super(props);
//     const img1 = <img className="bannerkitchenss" src='http://www.komandorstoragesolutions.co.uk/media/2858/21.png?mode=pad&rnd=131126291440000000'  alt="wardrobes banner"/>
//     const img2 = <img className="bannerkitchenss" src='http://www.komandorstoragesolutions.co.uk/media/2858/21.png?mode=pad&rnd=131126291440000000' alt="wardrobes banner"/>
//     const img3 = <img className="bannerkitchenss" src='http://www.komandorstoragesolutions.co.uk/media/2858/21.png?mode=pad&rnd=131126291440000000' alt="wardrobes banner"/>
  

//     this.state = {
//       slides: [img1, img2, img3]
//     };
//     this.click = this.click.bind(this);
//   }
//   click() {
//     const { slides } = this.state;
//     this.setState({
//       slides:
//         slides.length === 6 ? [img1, img2, img3, img4, img5, img6, "", "", ""] : [img1, img2, img3, img4, img5, img6]
//     });
//   }


//   render() {
//     const settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 2,
      
//     };
//     return (
//         <>
//  <Slider {...settings}>
//           {this.state.slides.map(function(slide) {
//             return (
//               <div key={slide}>
//                 <h3>{slide}</h3>
//               </div>
//             );
//           })}
//         </Slider>

//         </>
//     );
//   }
// }


import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/warobes.scss'

import {
  wardrobesBannerAPI,
  imagePrefix,
  storeId,
  accessToken,
} from '../../../public/constants/constants';

class WardrobeBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wardrobeSlider: null,
      isLoading: false,
      error: null,
      title: '',
      description: '',
      type: ''

    };
  }

  getWardrobesBannerData() {
    apiManager
      .get(wardrobesBannerAPI)
      .then(response => {
        console.log('response of wardrobes banner', response)
        const {data} = response || {}
        this.setState({
          wardrobeSlider: data && data.data.bannerList,
          title: data && data.data.title,
          description: data && data.data.desc,
          type: data && data.data.type,
          isLoading: false,
        });
        console.log('banner Data', data.data.title);
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
    this.getWardrobesBannerData();
  }

  render() {
    const { wardrobeSlider } = this.state;
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
          {!!wardrobeSlider &&
            wardrobeSlider.map((sliderData, index) => (
              <a href={sliderData.onClickUrl} key={index}>
                <img src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
              </a>
            ))}
        </Slider>
      </div>
    );
  }
}

export default WardrobeBanner;
