import React from 'react';
import  '../../../public/styles/static-pages/aboutUs.scss'
import  '../../../public/styles/static-pages/HelpSupport.scss'
import ContentEspot from '../../components/Primitives/staticContent';
import  '../../../public/styles/staticpages/staticPages.scss';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
export default class HelpSupport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className='staticpage serviceSupport'>
        
		<Breadcrumb {...this.props.match.params} staticName = {'Service & Support'}/>
    <div className='service-support'>
        <div className='container'>
          <h1 className="heading">Service & Support</h1>
          <h3 className="subHeading">How can we help you?</h3>  
        </div>
      </div>
        <ContentEspot espotName={ 'GI_SUPPORT_FAQ_MENU' } />
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

