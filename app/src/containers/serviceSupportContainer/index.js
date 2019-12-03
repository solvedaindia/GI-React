import React from 'react';
import  '../../../public/styles/static-pages/aboutUs.scss'
import  '../../../public/styles/static-pages/HelpSupport.scss'
import ContentEspot from '../../components/Primitives/staticContent';
import  '../../../public/styles/staticPages/staticPages.scss';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Pixels from '../../components/Primitives/pixels';
import { ServicySupportES } from '../../utils/EspotConstant';
export default class HelpSupport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className='staticpage serviceSupport'>
        <Pixels espotName={ServicySupportES.contactMeta} />
		<Breadcrumb {...this.props.match.params} staticName = {'Service & Support'}/>
    <div className='service-support'>
        <div className='container'>
          <h1 className="heading">Service & Support</h1>
          <h3 className="subHeading">How can we help you?</h3>  
        </div>
      </div>
        <ContentEspot espotName={ ServicySupportES.supportFAQMenu } />
        <ContentEspot espotName={ ServicySupportES.supportFAQ } />
        <a id='customerCare'>
			<ContentEspot espotName={ ServicySupportES.contactCare } />
        </a>
        <ContentEspot espotName={ ServicySupportES.supprot3 } />
         <ContentEspot espotName={ ServicySupportES.support4 } />
      </div>
    );
  }
}

