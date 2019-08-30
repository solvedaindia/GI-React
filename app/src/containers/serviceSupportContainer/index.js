import React from 'react';
import  '../../../public/styles/static-pages/aboutUs.scss'
import  '../../../public/styles/static-pages/HelpSupport.scss'
import ContentEspot from '../../components/Primitives/staticContent';
import  '../../../public/styles/staticpages/staticPages.scss';

export default class HelpSupport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		
    };
  }

  render() {
    return (
      <div className='staticpage serviceSupport'>
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

