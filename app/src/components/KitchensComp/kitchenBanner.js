// import React, { Component } from "react";
// import Slider from "react-slick";
// import  '../../../public/styles/static-pages/kitchens.scss'

// export default class KitchenBanner extends Component {
//   constructor(props) {
//     super(props);
//     const img1 = <img className="bann" src="http://www.metrointeriordecorators.in/img/kitchen/kitchen-banner.jpg" alt="rectangle"/>
//     const img2 = <img className="bann" src="http://www.metrointeriordecorators.in/img/kitchen/kitchen-banner.jpg" alt="rectangle"/>
//     const img3 = <img className="bann" src="http://www.metrointeriordecorators.in/img/kitchen/kitchen-banner.jpg" alt="rectangle"/>
    

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
//         <div>
//  <Slider {...settings}>
//           {this.state.slides.map(function(slide) {
//             return (
//               <div key={slide}>
//                 <h3>{slide}</h3>
//               </div>
//             );
//           })}
//         </Slider>

//         </div>
//     );
//   }
// }


import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/kitchens.scss'

import {
  kitchenBannerAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';

class WardrobeBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kitchenSlider: null,
      isLoading: false,
      error: null,
      title: '',
      description: '',
      type: ''

    };
  }

  getKitchensBannerData() {
    apiManager
      .get(kitchenBannerAPI)
      .then(response => {
        console.log('response of wardrobes banner', response)
        const {data} = response || {}
        this.setState({
          kitchenSlider: data && data.data.bannerList,
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
    this.getKitchensBannerData();
  }

  render() {
    const { kitchenSlider } = this.state;
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
          {!!kitchenSlider &&
            kitchenSlider.map((sliderData, index) => (
              <a href={sliderData.onClickUrl} key={index}>
                <img src={sliderData.imageSrc} alt='kitchen' />
              </a>
            ))}
        </Slider>
      </div>
    );
  }
}

export default WardrobeBanner;
