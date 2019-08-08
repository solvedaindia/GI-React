import React from 'react';
import MediaPress from '../../components/aboutUs/mediaPress';
import { Link } from 'react-router-dom';
import { Col, Form, FormControl, Button } from 'react-bootstrap';
import WidgetList from '../../components/HomePageStatic/widgetList';
import  '../../../public/styles/static-pages/aboutUs.scss';
import apiManager from '../../utils/apiManager';
import {
  espotAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import AboutTopMost from '../../components/aboutUs/aboutUsTop';
import GreenInitiatives from '../../components/aboutUs/greenInitiatives';
const paraFirst = `Lottie has graduated from hyderabad dolor sit amet, consecuter adipisicing elit,sed
do eiusmod tempor incididunt ut labour el dolore magna eliqua.Ut enim ad minim
veniam,qois nostrud exercitation ullacamo laboris nisi ut aliqion commodf`
const paraSecond = `Lottie has graduated from hyderabad dolor sit amet, consecuter adipisicing elit,sed
do eiusmod tempor incididunt ut labour el dolore magna eliqua.Ut enim ad minim
veniam,qois nostrud exercitation ullacamo laboris nisi ut aliqion commodf
conseqya.Lorem ipsum dolor sit amet, consecutetur adipisicing elit, sed do eiumsod tempor
incididunt ul labore et dolore magna eliqua.ut enim ad minim veniam,quis nostrud
exercitation ullacamo laboris nisi aliqion ex ea commodo conseqya.`;
const img = 'https://192.168.0.57/imagestore/staticImages/aboutUs/teach.jpg';
const images = 'https://192.168.0.57/imagestore/staticImages/aboutUs/ourprocessimg.jpg';

export class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img_url: img,
      content: paraFirst,
      button1: false,
      button2: false,
      button3: false,
      button4: false,
      button5: false,
      button6: false,
      button7: false

    };
  }
handleclick = event => {
    if(event.target.name == 1) {
        this.setState({
            img_url: img,
            content: paraFirst,
            button1: 'active',
            button2: false,
            button3: false,
            button4: false,
            button5: false,
            button6: false,
            button7: false,
        })
    }
   else if(event.target.name == 2) {
    this.setState({
      img_url: images,
      content: paraSecond,
      button2: 'active',
      button1: false,
      button3: false,
      button4: false,
      button5: false,
      button6: false,
      button7: false,
  })
}
else if(event.target.name == 3) {
  this.setState({
      img_url:img,
      content: paraFirst,
      button3: 'active',
      button1: false,
      button2: false,
      button4: false,
      button5: false,
      button6: false,
      button7: false,

  })
}
else if(event.target.name == 4) {
  this.setState({
      img_url:images,
      content: paraSecond,
      button4: 'active',
      button1: false,
      button3: false,
      button2: false,
      button5: false,
      button6: false,
      button7: false,
  })
}
else if(event.target.name == 5) {
  this.setState({
      img_url:img,
      content: paraFirst,
      button5: 'active',
      button1: false,
      button3: false,
      button4: false,
      button2: false,
      button6: false,
      button7: false,
  })
}
else if(event.target.name == 6) {
  this.setState({
      img_url:images,
      content: paraSecond,
      button6: 'active',
      button1: false,
      button3: false,
      button4: false,
      button5: false,
      button2: false,
      button7: false,
  })
}
else if(event.target.name == 7) {
  this.setState({
      img_url:img,
      content: paraFirst,
      button7: 'active',
      button1: false,
      button3: false,
      button4: false,
      button5: false,
      button6: false,
      button2: false,

  })
}
}

getImageOnArrowClick = (e) =>{
  if (e.target.name == 'arrowClick'){
  if (this.state.img_url == images) {
    this.setState({
      img_url: img
      })
  }
  else if (this.state.img_url == img) {
    this.setState({
      img_url: images
      })
  }
  
  
}
}


render() {
    return (
    <div className="About-Us">
      <div className="container">
        <AboutTopMost />
      </div>
      <div className='OurProcessContainer'>
        <div className="container">
          <div className='row'>
            <div className='col-md-12'>
              <h1 className="headingtitle">Our Process</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img className='processBigImg' src={this.state.img_url} alt="image" />
              <div>
                <button name="1" className={`ProcessNumber ${this.state.button1}`} onClick={this.handleclick}>1</button>
                <button name="2" className={`ProcessNumber ${this.state.button2}`} onClick={this.handleclick}>2</button>
                <button name="3" className={`ProcessNumber ${this.state.button3}`} onClick={this.handleclick}>3</button>
                <button name="4" className={`ProcessNumber ${this.state.button4}`} onClick={this.handleclick}>4</button>
                <button name="5" className={`ProcessNumber ${this.state.button5}`} onClick={this.handleclick}>5</button>
                <button name="6" className={`ProcessNumber ${this.state.button6}`} onClick={this.handleclick}>6</button>
                <button name="7" className={`ProcessNumber ${this.state.button7}`} onClick={this.handleclick}>7</button>
                <button name="arrowClick" className='arrowNumber' onClick={this.getImageOnArrowClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="25" viewBox="0 0 29 25">
                    <g fill="none" fill-rule="evenodd" stroke="#ffffff">
                      <path strokeWidth="1.892" d="M27 12.7H.2 27z" />
                      <path strokeWidth="1.89" d="M16.7 1.4l10.6 11.3L16.7 24" />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-md-6 InitialIdea">
              <h4><b>initial Ideation</b></h4>
              <p className="h4">Brainstorming to the final product</p>
 <p className="Paragraphfont">{this.state.content}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='greenContainer'>
        <div className='container'>
          <h1 className='greenTitle'>Green Initiatives</h1>
        </div>
        <GreenInitiatives />
      </div>
      <div className="CareerContainer">
        <div className="container">
          <div className='row'>
            <div className="col-md-12">
              <div container>
                <div id="cat">
                  <h1 className="careerHeading">Careers</h1>
                  <p className="paragraphCareer">your information is secure and encrypted, consectetur<br />
                    adipisicing elit,sed do eiumsod tempor incididunt ut<br />
                    labore et dalore magna aliqion anim ad minim.
                  </p>
                  <button className="CareerButton">See More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MediaPress />
    </div>
    );
    }
    }

export default AboutUs;