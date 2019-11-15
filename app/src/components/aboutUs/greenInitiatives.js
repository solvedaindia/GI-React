import React, { Component } from "react";
import Slider from "react-slick";
import  '../../../public/styles/static-pages/aboutUs.scss'
import {
 imagePrefix,espotAPI} from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';

export default class GreenInitiatives extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      espotName:'GI_GREEN_INITIATIVES',
     title:'',
     slides: []
    };
    this.click = this.click.bind(this);
  }
  click() {
    
  }

  componentDidMount(){
    this.getGreenUnititaiveData()
  }
  getGreenImage=(source)=>{
    return(<img className="greenImage" src={imagePrefix+source} alt="Green Initiatives"/>);
  }
  getGreenUnititaiveData(){
    apiManager
    .get(espotAPI + this.state.espotName)
    .then(response => {
        const {data} = response || {}
         this.setState({
              title:data.data.title,
              slides:data.data.bannerList,
         });
         this.props.handler()
      })
      .catch(error => {
        this.setState({
        });
      });
  }


  render() {
    const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
    return (
        <div className='container'>
          <h2 className='greenTitle'>{this.state.title}</h2>
			<Slider {...settings}>
			  {this.state.slides.map(function(slide) {
				return (
				  <div key={slide}>               
					  <div className='col-md-2'>
						<a href={slide.onClickUrl} >
						  <img className="greenImage" src={imagePrefix + slide.imageSrc} alt="Green"/>
						</a>
					  </div>
					  <div className='col-md-8'>
						<h5 className='ULcontent'>{slide.content_title}</h5>
					  <p className='ULparagraph'>{slide.desc}</p>
					  </div>
					</div>
				);
			  })}
			</Slider>
      </div>
    );
  }
}