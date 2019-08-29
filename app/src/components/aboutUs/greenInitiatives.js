import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/static-pages/aboutUs.scss'
import {
 imagePrefix,aboutUsGreenInitiativesApi
} from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';

export default class GreenInitiatives extends Component {
  constructor(props) {
    super(props);
    const img1 = <img className="greenImage" src={`${imagePrefix}/staticImages/aboutUs/greenguard.jpg`} alt=""/>
    const img2 = <img className="greenImage" src={`${imagePrefix}/staticImages/aboutUs/greenguard.jpg`} alt=""/>
    const img3 = <img className="greenImage" src={`${imagePrefix}/staticImages/aboutUs/greenguard.jpg`} alt=""/>
    

    this.state = {
     // slides: [img1, img2, img3]
     title:'',
     slides: []
    };
    this.click = this.click.bind(this);
  }
  click() {
    // const { slides } = this.state;
    // this.setState({
    //   slides:
    //     slides.length === 6 ? [img1, img2, img3, img4, img5, img6, "", "", ""] : [img1, img2, img3, img4, img5, img6]
    // });
  }

  componentDidMount(){
    this.getGreenUnititaiveData()
  }
  getGreenImage=(source)=>{
    return(<img className="greenImage" src={imagePrefix+source} alt=""/>);
  }
  getGreenUnititaiveData(){
    apiManager
      .get(aboutUsGreenInitiativesApi)
      .then(response => {
        console.log('aboutUsGreenInitiativesApi', response)
        const {data} = response || {}
        console.log('aboutUsGreenInitiativesApi Title', data.data.bannerList);
         this.setState({
              title:data.data.title,
              slides:data.data.bannerList,
         });
      })
      .catch(error => {
        this.setState({
        });
        console.log('getOurProcessData',error);
      });
  }


  render() {
    const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };
    return (
        <div>
           <div className='container'>
          <h1 className='greenTitle'>Green Initiatives</h1>
        </div>
 <Slider {...settings}>
          {this.state.slides.map(function(slide) {
            return (
              <div key={slide}>               
                <div className='row'>
                  <div className='col-md-4'>
                    {console.log("ali ahmad",slide)}
                    <a href={slide.onClickUrl} >
                      <img className="greenImage" src={imagePrefix + slide.imageSrc} alt=""/>
                    </a>
                  </div>
                  <div className='col-md-8'>
                    <h2 className='ULcontent'>{slide.content_title}</h2>
                  <p className='ULparagraph'>{slide.desc}</p>
                  </div>

                </div>
                
               
              </div>
            );
          })}
        </Slider>

        </div>
    );
  }
}