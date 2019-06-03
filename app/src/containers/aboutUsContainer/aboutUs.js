import React from 'react';
import { Col, Form, FormControl, Button } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import WidgetList from '../../components/HomePageStatic/widgetList';
// import '../../../public/styles/footerContainer/footerContainer.scss';

import '../../../public/styles/about-us/aboutUs.scss';
export class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homepageLayout: null,
      isLoading: false,
      error: null,
      ipData: null,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <h1 className="About-Us">About-Us</h1>
        <p1 className="Godrej-Interio-is-In">
          Godrej Interio is India’s largest furniture brand. From manufacturing
          the humble Storwel cupboard 80 years back to being a vibrant,
          innovative brand with a diverse portfolio – it’s been a brilliant,
          exciting journey for us. We love bringing alive your dream space. We
          emphasize comfort and aesthetics while delivering well designed, fun
          and functional furniture solutions to you. True to the Godrej mission
          to conserve the environment, we design products, set up processes and
          use raw materials that are eco-friendly to do our bit to preserve
          natural resources. We offer our customers home and office furniture,
          along with solutions for laboratories, hospitals and healthcare
          establishments, education and training institutes, shipyards and navy,
          auditoriums and stadiums. We are present across India through our 50
          exclusive showrooms in 18 cities and through 800 dealer outlets.
          Godrej Interio is a business unit of Godrej & Boyce Mfg. Co. Ltd. -
          part of the Godrej Group, one of India’s largest engineering and
          consumer product groups.
        </p1>
        <h1 className="Header-Copy-5">Our Process</h1>
      </div>
    );
  }
}

export default AboutUs;
