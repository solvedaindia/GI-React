import React from 'react';
import MediaPress from '../../components/aboutUs/mediaPress';

import { Col, Form, FormControl, Button } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import WidgetList from '../../components/HomePageStatic/widgetList';
import  '../../../public/styles/about-us/aboutUs.scss'


export class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    const img1 = require('../../../public/images/Bailbrook-House.jpg')
    const img2 = require('../../../public/images/interior.jpg')
    const img3 = require('../../../public/images/product1.jpg')
    const img4 = require('../../../public/images/cellphone.jpg')
    const img5 = require('../../../public/images/teach.jpg')


    this.state = {
      index: 0,
      imgList: [img1, img2, img3, img4, img5]
      // homepageLayout: null,
      // isLoading: false,
      // error: null,
      // ipData: null,
    };
  }

  componentDidMount() {}

  onHandleClickFirst= () => {
    if (this.state.index === 0 || this.state.index === 2 || this.state.index === 3 || this.state.index === 4){
      this.setState({index:1})
    } 
  };
  onHandleClickSecond(){
    if (this.state.index === 0 || this.state.index === 1 || this.state.index === 3 || this.state.index === 4){
      this.setState({index:2})
    } 
  }
  onHandleClickThird(){
    if (this.state.index === 0 || this.state.index === 1 || this.state.index === 2 || this.state.index === 4){
      this.setState({index:3})
    }
  }
  onHandleClickFourth(){
    if (this.state.index === 1 || this.state.index === 2 || this.state.index === 3 || this.state.index === 4){
      this.setState({index:0})
    }
  }
  onHandleClickFifth(){
    if (this.state.index === 1 || this.state.index === 2 || this.state.index === 0){
      this.setState({index:4})
    }
  }

  


  render() {
    return (
      <div className="container">
        <div className="About-Us">
          <h1 className="abouts-Us">About-Us</h1>
          <div className="row">
            <div className="col-md-4">
              <p className="Godrej-Interio-is-In">
                Godrej Interio is India’s largest furniture brand. From
                manufacturing the humble Storwel cupboard 80 years back to being
                a vibrant, innovative brand with a diverse portfolio – it’s been
                a brilliant, exciting journey for us. We love bringing alive
                your dream space. We emphasize comfort and aesthetics while
                delivering well designed, fun and functional furniture solutions
                to you. True to the Godrej mission to conserve the environment,
                we design products, set up processes and use raw materials that
                are eco-friendly to do our bit to preserve natural resources. We
                offer our customers home and office furniture, along with
                solutions for laboratories, hospitals and healthcare
                establishments, education and training institutes, shipyards and
                navy, auditoriums and stadiums. We are present across India
                through our 50 exclusive showrooms in 18 cities and through 800
                dealer outlets. Godrej Interio is a business unit of Godrej &
                Boyce Mfg. Co. Ltd. - part of the Godrej Group, one of India’s
                largest engineering and consumer product groups.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h1 className="Header-Copy-5">Our Process</h1>
              <img
                className="rawpixel-983726-unsplash"
                src={this.state.imgList[this.state.index]}
                alt="Initial Ideation"
              />
            </div>
            <div className="col-md-6">
              <h2 className="Name">Initial Ideation</h2>
              <h3 className="Position">Brainstorming to the final product</h3>
              <p className="Biography">
                Lottie has graduated from Hardvard dolor sit amet, consectetur
                adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div>
            <button className="Position-Copy" onClick={this.onHandleClickFifth.bind(this)}>1</button>

            <button onClick={this.onHandleClickSecond.bind(this)} className="Position-Copy-2">2</button>
            <button onClick={this.onHandleClickThird.bind(this)} className="Position-Copy-2">3</button>
            <button onClick={this.onHandleClickFourth.bind(this)} className="Position-Copy-2">4</button>
            <button onClick={this.onHandleClickFirst.bind(this)} className="Position-Copy-2">5</button>
          </div>
          <h1 className="Header-Copy-4">Green Initiatives</h1>
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <div className="Rectangle-Copy-3" />
              </div>
              <div className="col-md-10">
                <div className="Rectangle">
                  <div className="col-md-6">
                    <img
                      className="greenguard-certification"
                      src={require('../../../public/images/rectimg.jpg')}
                      alt="rectangle"
                    />
                  </div>
                  <div className="col-md-6">
                    <h1 className="title">UL Greenguard</h1>
                    <p1 className="Paragraph">
                      The GREENGUARD Certification Program (formerly known as
                      GREENGUARD Indoor Air Quality Certification) gives
                      assurance that products designed for use in indoor spaces
                      meet strict chemical emissions limits, which contribute to
                      the creation of healthier interiors.
                    </p1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container">
              <div className="Mask">
                <h1 className="headerIn">Careers</h1>
                <p1 className="Your-information-is" >
                  Your information is secure and encrypted, consectetur
                  <br /> adipisicing elit, sed do eiusmod tempor incididunt ut{' '}
                  <br />
                  labore et dolore magna aliquat enim ad minim.
                  <br />
                </p1>
                <button className="Rectangle1">See More</button>
              </div>
            </div>
          </div>
           
           {/*--media/press section--*/} 
            <MediaPress/>

         
        </div>
      </div>
    );
  }
}

export default AboutUs;