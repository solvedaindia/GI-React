
import React from 'react';
import  '../../../public/styles/static-pages/privacyPolicy.scss';
import PrivacyPolicies from '../../components/PrivacyPolicy/privpol';
import PrivacyPolicyInfo from '../../components/PrivacyPolicyEspot/privacyPolicyEspotOne';
import PrivacyPoliciesThirdPartyInfo from '../../components/PrivacyPolicyEspot/privacyPolicyEspotTwo';
import PrivacyPolicySecurity from '../../components/PrivacyPolicyEspot/privacyPolicyEspotThree';
import PrivacyPolicyDataProtection from '../../components/PrivacyPolicyEspot/privacyPolicyEspotFour';
import PrivacyPolicyDisclosure from '../../components/PrivacyPolicyEspot/privacyPolicyEspotFive';


export class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);}

  render() {
    return (
      <>
      <div className='privacyPolicy'>
        <div className='container'>
          <PrivacyPolicyInfo />
          <PrivacyPoliciesThirdPartyInfo />
          <PrivacyPolicySecurity />
          <PrivacyPolicyDataProtection />
          <PrivacyPolicyDisclosure />
        </div>
      </div>
      </>
    );
  }
}

export default PrivacyPolicy;;
