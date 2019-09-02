import React from 'react';

import  '../../../public/styles/static-pages/aboutUs.scss';
import  '../../../public/styles/staticpages/staticPages.scss';


import GreenInitiatives from '../../components/aboutUs/greenInitiatives';
import OurProcess from '../../components/aboutUs/ourProcess';
import ContentEspot from '../../components/Primitives/staticContent';

export class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     

    };
  }



render() {
    return (
    <div className='staticpage about-us'>

      <ContentEspot espotName={ 'GI_ABOUT_US_TOP' } />
      <ContentEspot espotName={ 'GI_ABOUT_US_2' } />
      <a id='ourProcess'>
      <OurProcess />
      </a>
      <ContentEspot espotName={ 'GI_ABOUT_US_4' } />
      <a id='greenInitiatives'>
      <GreenInitiatives />
      </a>
      <ContentEspot espotName={ 'GI_ABOUT_US_6' } />
      <a id='careers' >
      <ContentEspot espotName={ 'GI_CAREERS' } />
      </a>
      <ContentEspot espotName={ 'GI_ABOUT_US_8' } />
      <a id='mediaPress'>
      <ContentEspot espotName={ 'GI_MEDIA_PRESS' } />
      </a>
      <ContentEspot espotName={ 'GI_ABOUT_US_10' } />
    </div>
    );
    }
    }

export default AboutUs;