import React from 'react';

import  '../../../public/styles/static-pages/aboutUs.scss';
import  '../../../public/styles/staticpages/staticPages.scss';
import GreenInitiatives from '../../components/aboutUs/greenInitiatives';
import OurProcess from '../../components/aboutUs/ourProcess';
import ContentEspot from '../../components/Primitives/staticContent';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';

export class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     

    };
  }

  componentDidMount()
  {
     this.hash = this.props.location.hash;
    console.log('this.hash',this.hash)
  }

  onSuccessLoadWithScroll()
  {
    console.log("this.props.location id",this.hash.length)
    if(this.hash && this.hash.length>1)
    {
      console.log("this.props.location id",this.hash.substring(1,this.hash.length));
      const element=document.getElementById(this.hash.substring(1,this.hash.length));
      window.scrollTo(0, element.offsetTop)
    }
    
    
  }


render() {
    return (
    <div className='staticpage about-us'>
      <Breadcrumb {...this.props.match.params} staticName = {'About Us'}/>
      <ContentEspot espotName={ 'GI_ABOUT_US_TOP' } />
      <ContentEspot espotName={ 'GI_ABOUT_US_2' }   />
      <div id='ourProcess'>
      <OurProcess   />
      </div>
      <ContentEspot espotName={ 'GI_ABOUT_US_4' }   />
      <div id='greenInitiatives'>
      <GreenInitiatives />
      </div>
      <ContentEspot espotName={ 'GI_ABOUT_US_6' }   />
      <div id='careers' >
      <ContentEspot espotName={ 'GI_CAREERS' }  />
      </div>
      <ContentEspot espotName={ 'GI_ABOUT_US_8' } />
      <div id='mediaPress'>
      <ContentEspot espotName={ 'GI_MEDIA_PRESS' }  handler={(hash)=>this.onSuccessLoadWithScroll(hash)} />	
      </div>
      <ContentEspot espotName={ 'GI_ABOUT_US_10' }   />
    </div>
    );
    }
    }

export default AboutUs;