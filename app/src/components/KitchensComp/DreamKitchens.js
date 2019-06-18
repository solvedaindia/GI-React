import React from 'react';
import { Row, Col,Grid } from 'react-bootstrap';


import  '../../../public/styles/kitchens/kitchens.scss'

class DreamKitchens extends React.Component {
  constructor() {
    super();
    this.state = {
      skuData: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
        <div className="container">

        <div className="row">
            <div className="col-md-3">
            <i>
            <img
                      className="Delivery-Installation"
                      src={require('../../../public/images/dm1.png')}
                      alt="rectangle"
                    />
             </i>         
            </div>
            <div className="col-md-3">
            <img
                      className="Delivery-Installation"
                      src={require('../../../public/images/dm2.png')}
                      alt="rectangle"
                    /> 
                </div>
                <div className="col-md-3">
                    <i>
                    <img
                      className="Delivery-Installation"
                      src={require('../../../public/images/dm3.png')}
                      alt="rectangle"
                    /> 
                    </i>
           

                </div>
                <div className="col-md-3">
                    <i>
            <img
                      className="Delivery-Installation"
                      src={require('../../../public/images/dm4.png')}
                      alt="rectangle"
                    /> 
                   </i>

                </div>
                <div className="stepwizard col-md-offset-3">
    <div className="stepwizard-row setup-panel">
      <div className="stepwizard-step">
        <a href="#step-1" type="button" className="btn btn-primary btn-circle">1</a>
        <p>Step 1</p>
        <p1 className="Paragraph">Visit the store closest to you  & Get a free design consultation for your dream kitchen from our expert designers <br /> tempor incididunt ut labore et dolore magna aliqua.</p1>

      </div>
      <div className="stepwizard-step">
        <a href="#step-2" type="button" className="btn btn-primary btn-circle" disabled="disabled">2</a>
        <p>Step 2</p>
        <p1 className="Paragraph">Visit the store closest to you  & Get a free design consultation for your dream kitchen from our expert designers <br /> tempor incididunt ut labore et dolore magna aliqua.</p1>

      </div>
      <div className="stepwizard-step">
        <a href="#step-3" type="button" className="btn btn-primary btn-circle" disabled="disabled">3</a>
        <p>Step 3</p>
        <p1 className="Paragraph">Visit the store closest to you  & Get a free design consultation for your dream kitchen from our expert designers <br /> tempor incididunt ut labore et dolore magna aliqua.</p1>

      </div>
      <div className="stepwizard-step">
        <a href="#step-4" type="button" className="btn btn-primary btn-circle" disabled="disabled">4</a>
        <p>Step 4</p>
        <p1 className="Paragraph">Visit the store closest to you  & Get a free design consultation for your dream kitchen from our expert designers <br /> tempor incididunt ut labore et dolore magna aliqua.</p1>

      </div>
    </div>
  </div>
        </div>
        </div>
    );
  }
}

export default DreamKitchens;
