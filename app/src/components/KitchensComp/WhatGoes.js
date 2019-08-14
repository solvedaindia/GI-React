// import React, { Component } from "react";
// import Slider from "react-slick";

// export default class WhatGoes extends Component {
//   constructor(props) {
//     super(props);
//     const img1 = <img className="goesOnKitchen" src={require('../../../public/images/cr1.jpg')} alt="rectangle"/>
//     const img2 = <img className="goesOnKitchen" src={require('../../../public/images/cr2.jpg')} alt="rectangle"/>
//     const img3 = <img className="goesOnKitchen" src={require('../../../public/images/cr3.jpg')} alt="rectangle"/>
//     const img4 = <img className="goesOnKitchen" src={require('../../../public/images/cr4.jpg')} alt="rectangle"/>
//     const img5 = <img className="goesOnKitchen" src={require('../../../public/images/cr6.jpg')} alt="rectangle"/>
//     const img6 = <img className="goesOnKitchen" src={require('../../../public/images/cr0.jpg')} alt="rectangle"/>

//     this.state = {
//       slides: [img1, img2, img3, img4, img5, img6]
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
//       dots: false,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1
//     };
//     return (
//       <div>
//         <h1 className="What-goes-into-a-Godr">What goes into a Godrej Kitchen</h1>

//         <Slider {...settings}>
//           {this.state.slides.map(function(slide) {
//           return (
//           <div key={slide}>
//             <h3>{slide}</h3>
//           </div>
//           );
//           })}
//         </Slider>
//       </div>
//     );
//   }
// }

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
import  '../../../public/styles/static-pages/kitchens.scss'

import {
  whatGoesKitchenAPI,
  imagePrefix,
  storeId,
  accessToken,
} from '../../../public/constants/constants';

class WhatGoes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whatGoesSlider: [],
      isLoading: false,
      error: null,
      title: '',
      imageDescription: '',
      type: '',
imageHeading: ""
    };
  }

  getWardrobesBannerData() {
    apiManager
      .get(whatGoesKitchenAPI)
      .then(response => {
        console.log('response of whatgoes banner', response)
        const {data} = response || {}
        this.setState({
          whatGoesSlider: data && data.data.bannerList,
          title: data && data.data.title,
          imageDescription: data && data.data.imgDesc,
          type: data && data.data.type,
          isLoading: false,
          imageHeading:  data && data.data.imgHeading
        });
        console.log('whatgoes Data',  data.data.bannerList[0].imgDesc);
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
    const { whatGoesSlider } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="goesOnKitchen">
            <h1 className="What-goes-into-a-Godr">{this.state.title}</h1>
			<Slider {...settings}>
			{!!whatGoesSlider &&
				whatGoesSlider.map((sliderData, index) => (
				<a href={sliderData.onClickUrl} key={index}>
					<img  src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
				</a>
				))}
			</Slider>
      
            
           
        
      </div>
    );
  }
}

export default WhatGoes;
