import React from 'react';
import { Row, Col,Grid } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import  '../../../public/styles/static-pages/kitchens.scss'

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
                <img className="types-kitchens" src='https://203.110.85.50/imagestore/images/godrejInterio/store-bg-2x.png' alt="rectangle" />
                <h4 className="heading">Steel Chef</h4>
                <div className="subText">Visit the store closest to you & Get a free design consultation for your dream
                  kitchen from our expert designers</div>    
                  <Link to='/kitchen2'>
                  <button className="buttonExp">Explore</button>
                  </Link>          
                
              </div>
            </div>

            <div className="col-md-6">
            <div className="steelchefmodal">

              <img className="types-kitchens" src='https://203.110.85.50/imagestore/images/godrejInterio/store-bg-2x.png' alt="rectangle" />
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
