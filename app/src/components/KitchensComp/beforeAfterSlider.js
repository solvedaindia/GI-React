import React, { Component } from 'react'
import ReactCompareImage from 'react-compare-image'; 
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/kitchens.scss'

import {espotAPI,imagePrefix} from '../../../public/constants/constants';
class BeforeAfter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName:'GI_BEFORE_AFTER_SLIDER',
      beforeImage: '',
      afterImage: '',
      isLoading: false,
      error: null,
      title: '',
      imageDescription: '',
      type: '',
		imageHeading: ""
    };
  }

  beforeAfterDataCall() {
    apiManager
    .get(espotAPI + this.state.espotName)
      .then(response => {
        const {data} = response || {}
        this.setState({
          beforeImage: data && data.data.BeforeImg.imageSrc,
          afterImage: data && data.data.AfterImg.imageSrc,
          imageDescription: data && data.data.imgDesc,
          type: data && data.data.type,
          isLoading: false,
          imageHeading:  data && data.data.imgHeading
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }
  

  componentDidMount() {
    this.beforeAfterDataCall();
  }

beforeSlide = () => {
  if (!error){
    }
}


  render () {
    const beforeImg = imagePrefix + this.state.beforeImage
    const afterImg = imagePrefix + this.state.afterImage
    const before = {beforeImg}
    const after = {afterImg}
 
    return (
      <div className='beforeAfter'>
		<ReactCompareImage leftImage={imagePrefix + '/staticImages/kitchens/typekitchfirst.png'} rightImage={imagePrefix + '/staticImages/kitchens/typekitchsecond.png'} />
      </div>
     
    )
  }
}

export default BeforeAfter;