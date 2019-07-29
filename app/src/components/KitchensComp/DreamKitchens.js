import React from 'react';
import { Row, Col,Grid } from 'react-bootstrap';


import  '../../../public/styles/static-pages/kitchens.scss'

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

        <div className="row progressBar">
            <div className="col-md-3 imgBox">           
              <img className="Delivery-Installation" src={require('../../../public/images/dm1.png')}
              alt="rectangle"/>                
            </div>
            <div className="col-md-3 imgBox">
            <img className="Delivery-Installation"  src={require('../../../public/images/dm2.png')}
              alt="rectangle"
                    /> 
                </div>
                <div className="col-md-3 imgBox">
                    <i>
                    <img
                      className="Delivery-Installation"
                      src={require('../../../public/images/dm3.png')}
                      alt="rectangle"
                    /> 
                    </i>
           

                </div>
                <div className="col-md-3 imgBox">
                    <i>
            <img
                      className="Delivery-Installation"
                      src={require('../../../public/images/dm4.png')}
                      alt="rectangle"
                    /> 
                   </i>

                </div>
                <div className="stepwizard">
    <div className="stepwizard-row setup-panel">
      <div className="stepwizard-step">
        <a href="#step-1" type="button" className="stepCircle">1</a>
       
        <p className="ParagraphStepper">Visit the store closest to you & Get a<br/>kitchen from our expert designers <br /></p>

      </div>
      <div className="stepwizard-step">
        <a href="#step-2" type="button" className="stepCircle" disabled="disabled">2</a>
       
        <p className="ParagraphStepper">Visit the store closest to you & Get a<br/>free design consultation for your dream<br/>kitchen from our expert designers <br /></p>

      </div>
      <div className="stepwizard-step">
        <a href="#step-3" type="button" className="stepCircle" disabled="disabled">3</a>
       
        <p className="ParagraphStepper">Visit the store closest to you & Get a<br/> kitchen from our expert designers <br /></p>

      </div>
      <div className="stepwizard-step">
        <a href="#step-4" type="button" className="stepCircle" disabled="disabled">4</a>
        
        <p className="ParagraphStepper">Visit the store closest to you & Get a<br/> kitchen from our expert designers <br /></p>

      </div>
    </div>
  </div>
        </div>
        </div>
    );
  }
}

export default DreamKitchens;
