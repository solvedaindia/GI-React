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

export class AboutUs extends React.Component {
  constructor(props) {
    super(props);
   


    this.state = {
      index: 0,
      espotName: ""
    };
  }

  getEspotData() {
    console.log('test=', espotAPI + this.state.espotName);
    apiManager
      .get(espotAPI + "TestApi")
      .then(response => {
        console.log("our response", response.data.data)
        const {data} = response || {};
        this.setState({
          pageLayoutEspot: data && data.data,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
        console.log('about-us ERROR');
      });
  }

  componentDidMount() {
    this.getEspotData();
  }


  


  render() {
    return (
     
        <div className="About-Us">
          <h1 className="abouts-Us">About-Us</h1>
          <div className="row">
            <div className="col-md-4">
              <p className="GodrejInterio">
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
              <OurProcess/>
            
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
            {/* <div className="container"> */}
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
              {/* </div> */}
            </div>
          </div>
           
           {/*--media/press section--*/} 
           <div className="row">
             <div className="col-md-6">            <MediaPress/>
</div>
             <div className="col-md-6"></div>

           </div>

         
      </div>
    );
  }
}

export default AboutUs;