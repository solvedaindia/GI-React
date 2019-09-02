
import React from 'react';
import  '../../../public/styles/static-pages/privacyPolicy.scss';
import ContentEspot from '../../components/Primitives/staticContent';
import  '../../../public/styles/staticpages/staticPages.scss';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';

export class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);}

  render() {
    return (
      <div className='staticpages privacy-Policy'>
		  <Breadcrumb {...this.props.match.params} staticName = {'Privacy Policy'}/>
          <ContentEspot espotName={ 'GI_Privacy_Policy_Information' } />
          <ContentEspot espotName={ 'GI_Privacy_Policy_ThirdParty_Information' } />

          <ContentEspot espotName={ 'GI_Privacy_Policy_Security' } />
          <ContentEspot espotName={ 'GI_Privacy_Policy_DataProtectionAndFishing' } />
          <ContentEspot espotName={ 'GI_Privacy_Policy_AnonymousAndDisclosure' } />

          <ContentEspot espotName={ 'GI_Privacy_Policy_6' } />
          <ContentEspot espotName={ 'GI_Privacy_Policy_7' } />
          <ContentEspot espotName={ 'GI_Privacy_Policy_8' } />
          <ContentEspot espotName={ 'GI_Privacy_Policy_9' } />

      </div>
    );
  }
}

export default PrivacyPolicy;;
