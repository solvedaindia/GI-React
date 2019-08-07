import React from 'react';
import { Row, Col,Grid } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';

import {
    AlwaysRememberApi,
    imagePrefix,
    storeId,
    accessToken,
  } from '../../../public/constants/constants';
  
import  '../../../public/styles/static-pages/kitchens.scss'

class AlwaysRemember extends React.Component {
    constructor(props){
        super(props);
        const scatchImg1 =  require('../../../public/images/scatch1.png')
        const scatchImg2 =  require('../../../public/images/btnsch2.jpg')
        const scatchImg3 =  require('../../../public/images/btnsch3.jpg') 

        this.state = {
            imageFirstSrc: '',
            imageSecondSrc:'',
            imagethirdSrc: '',
            img_url: '',
            buttonFirst: true,
            buttonSecond: true,
            buttonThird: true
        }
    }
  

        
        
    onHandleClick = event => {
        if(event.target.name == 1) {
            console.log('img1 is clicked')
            this.setState({
                img_url:this.state.imageFirstSrc,
                buttonFirst:!this.state.buttonFirst,
                buttonThird:this.state.buttonFirst,
                buttonSecond:this.state.buttonFirst
            })
        }
       else if(event.target.name == 2) {
        console.log('img2 is clicked')

        this.setState({
          img_url: this.state.imageSecondSrc,
          buttonSecond:!this.state.buttonSecond,
          buttonThird:this.state.buttonSecond,
          buttonFirst:this.state.buttonSecond
      })
    }
    else if(event.target.name == 3) {
      console.log('img3 is clicked')
      this.setState({
          img_url: this.state.imageThirdSrc,
          buttonThird:!this.state.buttonThird,
          buttonFirst:this.state.buttonThird,
          buttonSecond:this.state.buttonThird
      })
    }
}
      
    getAlwaysRememberData() {
    apiManager
      .get(AlwaysRememberApi)
      .then(response => {
        console.log('response of remember', response)
        const {data} = response || {}
        this.setState({
          imageFirstSrc: data && data.data.KitchenImg.imageSrc,
          imageSecondSrc: data &&  data.data.gkitchenImg.imageSrc,
          imageThirdSrc: data &&  data.data.parallelKitchenImg.imageSrc,
          type: data && data.data.type,
          isLoading: false,
          imageHeading:  data && data.data.imgHeading,
          img_url: data && data.data.KitchenImg.imageSrc
        });
        console.log('remeber Data',  data.data.KitchenImg.imageSrc);
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
        console.log('SLider Data Error');
      });
    console.log('SLider Data Error');
  }
  

  componentWillMount() {
    this.getAlwaysRememberData();
    
  }

  

  render() {
   
    return (
        <div className="remembersection clear fix">
          <div className="row">
            <div className="RectanglularText col-md-5">
              <h1 className="Image-gallery2">When planning your kitchen, always remember..</h1>
              <h3 className="The-Work-Triangle">The Work Triangle</h3>
              <p className="ParagraphSmall">This consists of 3 fundamental and basic workstations i.e. the sink,
                refrigerator and the cooking hob/range. The triangle is measured from the center of the sink to the top
                of the refrigerator to the center of the cooking range.</p>
              <h3 className="The-Work-Triangle ">The 26 Feet Rule</h3>
              <p className="ParagraphSmall">To ensure maximum efficiency, the work triangle perimeter should be at least
                12 feet but must not exceed 26 feet.</p>
            </div>
            <div className="col-md-7">
              <div className="rememberImgbox">
                <div className="imgCenterbox">
                  <img className="imgcenter" src={imagePrefix + this.state.img_url} alt="" />
                </div>
                <div className="btnwrapper">
                  <button type="button" name='1' onClick={this.onHandleClick} className={this.state.buttonFirst
                    ? "buttonTrue" : "buttonFalse" }>G Kitchen</button>
                  <button type="button" name='2' onClick={this.onHandleClick} className={this.state.buttonSecond
                    ? "buttonTrue" : "buttonFalse" }>Parallel Kitchen</button>
                  <button type="button" name='3' onClick={this.onHandleClick} className={this.state.buttonThird
                    ? "buttonTrue" : "buttonFalse" }>L Kitchen</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
  }
}

export default AlwaysRemember;
