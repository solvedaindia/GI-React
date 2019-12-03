
import React from 'react';
import  '../../../public/styles/static-pages/privacyPolicy.scss';
import ContentEspot from '../../components/Primitives/staticContent';
import  '../../../public/styles/staticPages/staticPages.scss';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Pixels from '../../components/Primitives/pixels';
import { PrivacyPolicyES } from '../../utils/EspotConstant';

export class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);}

  render() {
    return (
      <div className='staticpages privacy-Policy'>
      <Pixels espotName={ PrivacyPolicyES.policyMeta} />
		  <Breadcrumb {...this.props.match.params} staticName = {'Privacy Policy'}/>
          <ContentEspot espotName={ PrivacyPolicyES.policyInfo } />
          <ContentEspot espotName={ PrivacyPolicyES.policyThirdInfo } />

          <ContentEspot espotName={ PrivacyPolicyES.policySecurity } />
          <ContentEspot espotName={ PrivacyPolicyES.policyDataProtection } />
          <ContentEspot espotName={ PrivacyPolicyES.policyDiscloure } />

          <ContentEspot espotName={ PrivacyPolicyES.policy6 } />
          <ContentEspot espotName={ PrivacyPolicyES.policy7 } />
          <ContentEspot espotName={ PrivacyPolicyES.policy8 } />
          <ContentEspot espotName={ PrivacyPolicyES.policy9 } />

      </div>
    );
  }
}

export default PrivacyPolicy;;
