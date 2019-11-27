import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/kitchen.scss'
import '../../../public/styles/static-pages/chefkitchen.scss';
import {espotAPI,imagePrefix} from '../../../public/constants/constants';
import {isMobile} from '../../utils/utilityManager';


class KitchenConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.activeClass = 'active';
    this.state = {
     espotName: 'GI_CHEF_KITCHEN_CONFIGURATION',
     title: "",
     configurationTabing: [],
     currentIndex: -1,
     currentTabData: null,
    //  tabIndex: 0
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
    
     this.setState({currentIndex: index})
  }

  render() {
        const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll:1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
              arrows: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              centerMode: false,
              infinite: true,
              arrows: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow:1,
              slidesToScroll: 1,
              dots: false,
              centerMode: false,
              infinite: true,
              arrows: false
            }
          }
        ]
      };

      const kitchenTabSlide = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: '30px',
        variableWidth: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: false,
              dots: true,
              arrows: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              centerMode: false,
              infinite: false,
              arrows: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow:1,
              slidesToScroll: 1,
              dots: false,
              centerMode: false,
              infinite: false,
              // variableWidth: true,
              arrows: false
            }
          }
        ]
      };

   const{ configurationTabing, currentIndex } =this.state;


  const tabs =!!configurationTabing && configurationTabing.map((tabData,index)=>{
      return(
        <>
        {!isMobile() ? 
        <li >
        <a style ={index==this.state.currentIndex? {color:'#000000'} :{} } onClick={this.onHandleClick.bind(this, index)}   key={index} className={index==this.state.currentIndex?'active':''} >
        {tabData.title}
          
         </a>
        </li>
        
        :<a style ={index==this.state.currentIndex? {color:'#000000'} :{} } onClick={this.onHandleClick.bind(this, index)}   key={index} className={index==this.state.currentIndex?'active':''} >
        {tabData.title}
          
         </a>
        }
       </>
     )
  })
    return (
     <div className='container'>
         <h1>{this.state.title}</h1>
          <div className='configurationTab'>
          {!isMobile() ? 
            <ul className='configuration-tab'>
                {tabs}
            </ul>
            :
            <div className='configureTabs'><Slider {...kitchenTabSlide}>{tabs}</Slider></div>
          }
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

export default KitchenConfiguration;



