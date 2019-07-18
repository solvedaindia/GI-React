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
              <div className="steelchefmodal">
                <img className="types-kitchens" src={require('../../../public/images/cup.png')} alt="rectangle" />
                <h4 className="heading">Steel Chef</h4>
                <div className="subText">Visit the store closest to you & Get a free design consultation for your dream
                  kitchen from our expert designers</div>              
                <div><button className="buttonExp">Explore</button></div>
              </div>
            </div>

            <div className="col-md-6">
            <div className="steelchefmodal">

              <img className="types-kitchens" src={require('../../../public/images/cup2.jpg')} alt="rectangle" />
              <h4 className="heading">Willow</h4>
              <p className="subText">Visit the store closest to you & Get a free design consultation for
                your dream kitchen from our expert designers</p>
              
              <div><button className="buttonExp">Explore</button></div>
            </div>
            </div>

          </div>
        </div>
    );
  }
}

export default TypesOFkitchens;
