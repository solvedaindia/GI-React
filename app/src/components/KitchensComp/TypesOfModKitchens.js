import React from 'react';
import { Row, Col,Grid } from 'react-bootstrap';


import  '../../../public/styles/kitchens/kitchens.scss'

class TypesOFkitchens extends React.Component {
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
            <div className="col-md-6">
            <img
                      className="types-kitchens"
                      src={require('../../../public/images/cup.png')}
                      alt="rectangle"
                    />
                      <h4 className="Steel-Chef">Steel Chef</h4>
                    <p className="Paragraph">Visit the store closest to you  & Get a<br/> free design consultation for your dream<br/> kitchen from our expert designers</p>
                   <br /><div><button className="buttonExp">Explore</button></div>
            </div>
            <div className="col-md-6">
            <img
                      className="types-kitchens"
                      src={require('../../../public/images/cup2.jpg')}
                      alt="rectangle"
                    /> <h4 className="Steel-Chef">Willow</h4>
                    <p className="ParagraphStepper">Visit the store closest to you  & Get a<br/> free design consultation for your dream<br/> kitchen from our expert designers</p>
                    <br /><div><button className="buttonExp">Explore</button></div>

                </div>
        </div>
        </div>
    );
  }
}

export default TypesOFkitchens;
