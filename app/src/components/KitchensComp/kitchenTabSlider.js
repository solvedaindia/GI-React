import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/kitchen.scss'
import '../../../public/styles/static-pages/chefKitchen.scss';

import {espotAPI,imagePrefix,} from '../../../public/constants/constants';

class KitchenHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      
    };
  }

 

  componentDidMount() {
  }

  render() {
   
    return (
     <div className='container'>
         <h1>configuration</h1>
          <div className='configurationTab'>
            <a className="link">L Shaped Kitchens</a>
            <a className="link">U Shaped Kitchen</a>
            <a className="link">Parallel Kitchen</a>
            <a className="link">Single Wall Kitchen</a>
      </div>
      {/* <div className='clearfix'></div> */}
      </div>
    );
  }
}

export default KitchenHall;



