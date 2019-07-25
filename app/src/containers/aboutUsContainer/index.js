import React from 'react';
import MediaPress from '../../components/aboutUs/mediaPress';

import { Col, Form, FormControl, Button } from 'react-bootstrap';
import WidgetList from '../../components/HomePageStatic/widgetList';
import  '../../../public/styles/about-us/aboutUs.scss'
import OurProcess from '../../components/aboutUs/ourProcess';
import apiManager from '../../utils/apiManager';
import {
  espotAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import AboutTopMost from '../../components/aboutUs/aboutUsTop';
import img from '../../../public/images/96134077-rawpixel-983726-unsplash.jpg'
import pic from '../../../public/images/96134077-rawpixel-983726-unsplash.jpg'
import image from '../../../public/images/96134077-rawpixel-983726-unsplash.jpg'
import pics from '../../../public/images/96134077-rawpixel-983726-unsplash.jpg'
import images from '../../../public/images/96134077-rawpixel-983726-unsplash.jpg'
import picture from '../../../public/images/96134077-rawpixel-983726-unsplash.jpg'
import photo from '../../../public/images/96134077-rawpixel-983726-unsplash.jpg'

export class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img_url: img
    };
  }
handleclick = event => {
    if(event.target.name == 1) {
        this.setState({
            img_url: img
        })
    }
   else if(event.target.name == 2) {
    this.setState({
      img_url: pics
  })
}
else if(event.target.name == 3) {
  this.setState({
      img_url:image
  })
}
else if(event.target.name == 4) {
  this.setState({
      img_url:pic
  })
}
else if(event.target.name == 5) {
  this.setState({
      img_url:images
  })
}
else if(event.target.name == 6) {
  this.setState({
      img_url:picture
  })
}
else if(event.target.name == 7) {
  this.setState({
      img_url:photo
  })
}
}
render() {
    return (
    <div className="About-Us">
      <div className="container">
        <AboutTopMost />
      </div>
      <div className="row para">
        <div className="container">
          <div className="col-md-6">
            <h1 className="headingtitle">Our Process</h1>
            <img className="background" src={this.state.img_url} alt="image" />
            <div>
              <button name="1" className="button" onClick={this.handleclick}>1</button>
              <button name="2" className="button" onClick={this.handleclick}>2</button>
              <button name="3" className="button" onClick={this.handleclick}>3</button>
              <button name="4" className="button" onClick={this.handleclick}>4</button>
              <button name="5" className="button" onClick={this.handleclick}>5</button>
              <button name="6" className="button" onClick={this.handleclick}>6</button>
              <button name="7" className="button" onClick={this.handleclick}>7</button>

            </div>
          </div>
          <div className="col-md-6 anas">
            <h4><b>initial Ideation</b></h4>
            <p className="h4">Brainstorming to the final product</p>
            <p className="paragraph">Lottie has graduated from hyderabad dolor sit amet, consecuter adipisicing elit,sed
              do eiusmod tempor incididunt ut labour el dolore magna eliqua.Ut enim ad minim
              veniam,qois nostrud exercitation ullacamo laboris nisi ut aliqion commodf
              conseqya.
            </p>
            <p className="paragraph">Lorem ipsum dolor sit amet, consecutetur adipisicing elit, sed do eiumsod tempor
              incididunt ul labore et dolore magna eliqua.ut enim ad minim veniam,quis nostrud
              exercitation ullacamo laboris nisi aliqion ex ea commodo conseqya.
            </p>
          </div>

        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div container>
            <div id="cat">
              <h1 className="link">Careers</h1>
              <p className="p">your information is secure and encrypted, consectetur
                adipisicing elit,sed do eiumsod tempor incididunt ut
                labore et dalore magna aliqion anim ad minim.
              </p>
              <button className="btn btn-default btn-lg">Click Here</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h3>Media/Press</h3>
        <h5>Latest News</h5>
        <hr />
        <div className="row">
          <div className="col-md-6 border">
            <img className="main" src={pic} />
            <p><b>Impact of Extrinsic Motivation on Intrinsic Motivation</b></p>
            <div>
              <span className="color">22 oct 2018</span>
              <span> | by john jacobs</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-4 padding"><img className="imgs" src={pic} /></div>
              <div className="col-md-8">
                <p className="paragraph"><b>Impact of Extrinsic Motivation on Intrinsic Motivation</b></p>
                <div>
                  <span className="color">22 oct 2018</span>
                  <span> | by john jacobs</span></div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 padding"><img className="imgs" src={image} /></div>
              <div className="col-md-8">
                <p className="paragraph"><b>Impact of Extrinsic Motivation on Intrinsic Motivation</b></p>
                <div>
                  <span className="color">22 oct 2018</span>
                  <span> | by john jacobs</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 padding">
                <img className="imgs" src={pics} /></div>
              <div className="col-md-8">
                <p className="paragraph">
                  <b>Impact of Extrinsic Motivation on Intrinsic Motivation</b></p>
                <div>
                  <span className="color">22 oct 2018</span>
                  <span> | by john jacobs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
    }
    }

export default AboutUs;