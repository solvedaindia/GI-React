import React from 'react';

import  '../../../public/styles/static-pages/aboutUs.scss';
import  '../../../public/styles/staticPages/staticPages.scss';
import GreenInitiatives from '../../components/aboutUs/greenInitiatives';
import OurProcess from '../../components/aboutUs/ourProcess';
import ContentEspot from '../../components/Primitives/staticContent';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Pixels from '../../components/Primitives/pixels';
import { AboutUsES } from '../../utils/EspotConstant';

export class AboutUs extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount()
  {
     this.hash = this.props.location.hash;
  }

  onSuccessLoadWithScroll()
  {

    if(this.hash && this.hash.length>1)
    {
      const element=document.getElementById(this.hash.substring(1,this.hash.length));
      window.scrollTo(0, element.offsetTop)
    }
    
    
  }


render() {
    return (
    <div className='staticpage about-us'>
      <Pixels espotName={AboutUsES.aboutMeta} />
      <Breadcrumb {...this.props.match.params} staticName = {'About Us'}/>
      <ContentEspot espotName={ AboutUsES.top } />
      <ContentEspot espotName={ AboutUsES.aboutUs2 }   />
      <div id='ourProcess'>
      <OurProcess   />
      </div>
      <ContentEspot espotName={ AboutUsES.aboutUs4 }   />
      <div id='greenInitiatives'>
      <GreenInitiatives />
      </div>
      <ContentEspot espotName={ AboutUsES.aboutUs6 }   />
      <div id='careers' >
      <ContentEspot espotName={ AboutUsES.careers }  />
      </div>
      <ContentEspot espotName={ AboutUsES.aboutUs8 } />
      <div id='mediaPress'>
      <ContentEspot espotName={ AboutUsES.mediaPress }  handler={(hash)=>this.onSuccessLoadWithScroll(hash)} />	
      </div>
      <ContentEspot espotName={ AboutUsES.aboutUs10 }   />
    </div>
    );
    }
    }

export default AboutUs;