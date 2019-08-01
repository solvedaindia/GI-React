// import React, { Component } from "react";
// import Slider from "react-slick";
// import  '../../../public/styles/static-pages/warobes.scss'
// const prevArrowImg = (
//   <img clasName="leftArrow" src={require('../SVGs/carousel__arrowLeft.svg')} />
// );
// const nextArrowImg = (
//   <img src={require('../SVGs/carousel__arrowRight.svg')} />
// );
// export default class wardrobesHAll extends Component {
//   constructor(props) {
//     super(props);
//     const img1 = <img className="wardrobehallsize" src={require('../../../public/images/cr1.jpg')} alt="rectangle"/>
//     const img2 = <img className="wardrobehallsize" src={require('../../../public/images/cr2.jpg')} alt="rectangle"/>
//     const img3 = <img className="wardrobehallsize" src={require('../../../public/images/cr3.jpg')} alt="rectangle"/>
//     const img4 = <img className="wardrobehallsize" src={require('../../../public/images/cr4.jpg')} alt="rectangle"/>
//     const img5 = <img className="wardrobehallsize" src={require('../../../public/images/cr6.jpg')} alt="rectangle"/>
//     const img6 = <img className="wardrobehallsize" src={require('../../../public/images/cr0.jpg')} alt="rectangle"/>

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
//       slidesToShow: 3,
//       slidesToScroll: 2,
     
//     };
//     return (
//         <div>
//       <div className="container">
//         <h2 className="Kitchen-Hall-Of-Fame">Wardrobes Hall of Fame</h2>
//         <p className="Paragraphhall">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br /> tempor incididunt ut labore et dolore magna aliquat enim ad minim.</p>
//         </div>

//         <Slider {...settings}>
//           {this.state.slides.map(function(slide) {
//             return (
//               <div key={slide}>
//                 <h3>{slide} <div className="crousdiv"><p className="Paragraph-Copy-13">Chennai</p></div></h3>
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
// import  '../../../public/styles/static-pages/warobes.scss'

import {
  wardrobesHallAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';

class wardrobesHAll extends React.Component {
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
    // console.log('test data', description)
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
                <img className='wardrobehallsize' src={sliderData.imageSrc} alt={sliderData.alt} />
               </a>
            ))}
        </Slider>
      </div>
    );
  }
}

export default wardrobesHAll;
