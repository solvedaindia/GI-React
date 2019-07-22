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
    // this.getEspotData();
  }


  


  render() {
    return (
    <div className="About-Us">
         <div className="aboutUstextContainer">
           <div className="row">
             <div className="col-md-8">
             <h1 className="heading">About Us</h1>
             <p className="paragraph">
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
                largest engineering and consumer product groups.</p> 
             </div>
             <div className="col-md-4">
<div className="AboutUsContent row">
  <div className=" col-md-6">
    <div className=" container">
<div className="iconsBackground">
<img className="abouticonimg" src={require('../../../public/images/abouticon.png')} alt="rectangle" />
</div>
  </div>
  
  </div>
  <div className="col-md-6">
    <h2>Vision</h2>
    <p>The choice for home and work space solutions.</p>

</div>
<div className="AboutUsContent row">
  <div className=" col-md-6">
    <div className=" container">
<div className="iconsBackground">
<img className="abouticonimg" src={require('../../../public/images/abouticon.png')} alt="rectangle" />
</div>
  </div>
  
  </div>
  <div className="col-md-6">
    <h2>Vision</h2>
    <p>The choice for home and work space solutions.</p>
</div>
</div>
<div className="AboutUsContent row">
  <div className=" col-md-6">
    <div className=" container">
<div className="iconsBackground">
<img className="abouticonimg" src={require('../../../public/images/abouticon.png')} alt="rectangle" />
</div>
  </div>
  
  </div>
  <div className="col-md-6">
    <h2>Vision</h2>
    <p>The choice for home and work space solutions.</p>
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