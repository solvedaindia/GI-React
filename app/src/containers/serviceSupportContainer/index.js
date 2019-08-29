import React from 'react';
import  '../../../public/styles/static-pages/aboutUs.scss'
import SearchLogo from '../../components/SVGs/search.js';
import FaqAnswers from '../../components/HelpSupportComp/FaqAnswers'
import  '../../../public/styles/static-pages/HelpSupport.scss'
import {isMobile} from '../../utils/utilityManager'
import ContentEspot from '../../components/Primitives/staticContent';

export default class HelpSupport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		
    };
  }

  render() {
    return (
      <div className='staticpages serviceSupport'>
        <ContentEspot espotName={ 'GI_SUPPORT_FAQ' } />
        <a id='customerCare'>
       <ContentEspot espotName={ 'GI_CONTACT_US_CUSTOMER_CARE' } />
        </a>
        <ContentEspot espotName={ 'GI_SUPPORT_3' } />
         <ContentEspot espotName={ 'GI_SUPPORT_4' } />
      </div>
    );
  }
}

