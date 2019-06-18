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
        <h1 className="Types-of-Modular-Kit">Types of Modular Kitchens</h1>

        <div className="row">
            <div className="col-md-6">
            <img
                      className="types-kitchens"
                      src={require('../../../public/images/cup.png')}
                      alt="rectangle"
                    />
                      <h4 className="Steel-Chef">Steel Chef</h4>
                    <p1 className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod <br /> tempor incididunt ut labore et dolore magna aliqua.</p1>
                   <br /><div><button className="buttonExp">Explore</button></div>
            </div>
            <div className="col-md-6">
            <img
                      className="types-kitchens"
                      src={require('../../../public/images/cup2.jpg')}
                      alt="rectangle"
                    /> <h4 className="Steel-Chef">Willow</h4>
                    <p1 className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod <br /> tempor incididunt ut labore et dolore magna aliqua.</p1>
                    <br /><div><button className="buttonExp">Explore</button></div>

                </div>
        </div>
        </div>
    );
  }
}

export default TypesOFkitchens;
