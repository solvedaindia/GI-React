import React from 'react';
import MediaPress from '../../components/aboutUs/mediaPress';
import { Link } from 'react-router-dom';
import { Col, Form, FormControl, Button } from 'react-bootstrap';
import WidgetList from '../../components/HomePageStatic/widgetList';
import  '../../../public/styles/static-pages/aboutUs.scss'
import OurProcess from '../../components/aboutUs/ourProcess';
import apiManager from '../../utils/apiManager';
import {
  espotAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import AboutTopMost from '../../components/aboutUs/aboutUsTop';
import img from '../../../public/images/ourprocessimg.jpg'
import pic from '../../../public/images/teach.jpg'
import image from '../../../public/images/ourprocessimg.jpg'
import pics from '../../../public/images/teach.jpg'
import images from '../../../public/images/ourprocessimg.jpg'
import picture from '../../../public/images/teach.jpg'
import photo from '../../../public/images/ourprocessimg.jpg'
import GreenInitiatives from '../../components/aboutUs/greenInitiatives';
const paraFirst = `Lottie has graduated from hyderabad dolor sit amet, consecuter adipisicing elit,sed
do eiusmod tempor incididunt ut labour el dolore magna eliqua.Ut enim ad minim
veniam,qois nostrud exercitation ullacamo laboris nisi ut aliqion commodf`
const paraSecond = `Lottie has graduated from hyderabad dolor sit amet, consecuter adipisicing elit,sed
do eiusmod tempor incididunt ut labour el dolore magna eliqua.Ut enim ad minim
veniam,qois nostrud exercitation ullacamo laboris nisi ut aliqion commodf
conseqya.Lorem ipsum dolor sit amet, consecutetur adipisicing elit, sed do eiumsod tempor
incididunt ul labore et dolore magna eliqua.ut enim ad minim veniam,quis nostrud
exercitation ullacamo laboris nisi aliqion ex ea commodo conseqya.`
export class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img_url: img,
      content: paraFirst
    };
  }
handleclick = event => {
    if(event.target.name == 1) {
        this.setState({
            img_url: img,
            content: paraFirst
        })
    }
   else if(event.target.name == 2) {
    this.setState({
      img_url: pics,
      content: paraSecond
  })
}
else if(event.target.name == 3) {
  this.setState({
      img_url:image,
      content: paraFirst
  })
}
else if(event.target.name == 4) {
  this.setState({
      img_url:pic,
      content: paraSecond
  })
}
else if(event.target.name == 5) {
  this.setState({
      img_url:images,
      content: paraFirst
  })
}
else if(event.target.name == 6) {
  this.setState({
      img_url:picture,
      content: paraSecond
  })
}
else if(event.target.name == 7) {
  this.setState({
      img_url:photo,
      content: paraFirst
  })
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
              <button name="1" className="ProcessNumber active" onClick={this.handleclick}>1</button>
              <button name="2" className="ProcessNumber" onClick={this.handleclick}>2</button>
              <button name="3" className="ProcessNumber" onClick={this.handleclick}>3</button>
              <button name="4" className="ProcessNumber" onClick={this.handleclick}>4</button>
              <button name="5" className="ProcessNumber" onClick={this.handleclick}>5</button>
              <button name="6" className="ProcessNumber" onClick={this.handleclick}>6</button>
              <button name="7" className="ProcessNumber" onClick={this.handleclick}>7</button>
              
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
        <GreenInitiatives/>
      
      </div>

      <div className="CareerContainer">
        <div className="container">
          <div className='row'>
          <div className="col-md-12">
          <div container>
            <div id="cat">
              <h1 className="careerHeading">Careers</h1>
              <p className="paragraphCareer">your information is secure and encrypted, consectetur<br/>
                adipisicing elit,sed do eiumsod tempor incididunt ut<br/>
                labore et dalore magna aliqion anim ad minim.
              </p>
              <button className="CareerButton">See More</button>
            </div>
          </div>
        </div>
          </div>
        </div>
        
      </div>
      <div className="mediaPressSection">
      <div className="container">
        <h3 className='MediaTopHead'>Media/Press</h3>
        <h5>Latest News</h5>
        <hr />
        <div className="row">
          <div className="col-md-6 MotivationBorder">
            <img className="extrinsiveBigImg" src={pic} />
            <p><b>Impact of Extrinsic Motivation on Intrinsic Motivation</b></p>
            <div>
              <span className="ColorDate">22 oct 2018</span>
              <span> | by john jacobs</span>
            </div>
          </div>
          <div className="col-md-6">
          <a href='https://mediatech914.wordpress.com/2019/01/04/%EF%BB%BFindias-millennials-driving-home-furnishing-democracy/'>
          <div className="row">
              <div className="col-md-4 paddingBottom"><img className="extrinsiveSmallImgs" src={pic} /></div>
              <div className="col-md-8">
                <p className="Paragraphfont"><b>﻿India’s Millennials Driving ‘Home Furnishing Democracy’</b></p>
                <div>
                  <span className="ColorDate">22 oct 2018</span>
                  <span> | by john jacobs</span></div>
              </div>
            </div>
            </a>
           <a href='https://indiannewz.wordpress.com/2019/01/04/indias-millennials-driving-home-furnishing-democracy-according-to-interio-index-survey-from-godrej-interio/'>
            <div className="row">
              <div className="col-md-4 paddingBottom"><img className="extrinsiveSmallImgs" src={image} /></div>
              <div className="col-md-8">
                <p className="Paragraphfont"><b>India’s Millennials Driving ‘Home Furnishing Democracy’</b></p>
                <div>
                  <span className="ColorDate">22 oct 2018</span>
                  <span> | by john jacobs</span>
                </div>
              </div>
            </div>
            </a>
            <a href='https://www.deccanchronicle.com/lifestyle/books-and-art/070119/millennial-couples-become-torchbearers-to-spur-societal-transformation.html'>
            <div className="row">
              <div className="col-md-4 paddingBottom">
                <img className="extrinsiveSmallImgs" src={pics} /></div>
              <div className="col-md-8">
                <p className="Paragraphfont">
                  <b>Millennial couples become torchbearers to spur societal transformation  </b></p>
                <div>
                  <span className="ColorDate">22 oct 2018</span>
                  <span> | by john jacobs</span>
                </div>
              </div>
            </div>
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
    );
    }
    }

export default AboutUs;