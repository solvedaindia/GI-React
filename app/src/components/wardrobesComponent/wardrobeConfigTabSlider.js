import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/kitchen.scss'
import '../../../public/styles/static-pages/chefkitchen.scss';
import {espotAPI,imagePrefix} from '../../../public/constants/constants';


class WardrobeConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     espotName: 'GI_WARDROBE_CONFIGURATOR',
     title: "",
     configurationTabing: [],
     currentIndex: -1,
     currentTabData: null,
    };
  }

 

  configurationData() {
    apiManager
    .get(espotAPI + this.state.espotName)
      .then(response => {
        const {data} = response || {}
        // for(let i = 0; i<data.data.tablist.length; i++){
        //   data.data.tablist[i]["index"]= i;
        // }
        
        this.setState({
          title: data && data.data.title,
         
          configurationTabing: data && data.data.tablist,
          currentIndex: 0
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
    this.configurationData();
  }


  onHandleClick = (index) =>{
    
     this.setState({currentIndex: index});
  }

  render() {
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
	  autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 1,
      slidesToScroll:2,
    };
   const{ configurationTabing, currentIndex } =this.state;
    return (
     <div className='container'>
         <h1>{this.state.title}</h1>
          <div className='configurationTab'>
            {!!configurationTabing &&
            configurationTabing.map((tabData, index) => (
              <a onClick={this.onHandleClick.bind(this, index)}   key={index} className='link' >
              {tabData.title}
               </a>

            ))}
             
      </div>
<div className='clearfix'></div>
<Slider {...settings}>
          {currentIndex !== -1 && !!configurationTabing && configurationTabing[currentIndex].bannerList &&
            configurationTabing[currentIndex].bannerList.map((sliderData, index) => (
              <a href={sliderData.onClickUrl} key={index} className='slides'>
                <img className='img' src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
               </a>

            ))}
        </Slider>

      
      </div>
    );
  }
}

export default WardrobeConfiguration;



