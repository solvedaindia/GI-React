
import React from 'react';
import  '../../../public/styles/static-pages/privacyPolicy.scss';
import PPInformation from '../../components/PrivacyPolicy/information';
import PPSecurity from '../../components/PrivacyPolicy/security';
import PPDisclosure from '../../components/PrivacyPolicy/anonymousAndDisclosure';
import PPthirdParty from '../../components/PrivacyPolicy/thirdPartyInfo';
import PPDataProtection from '../../components/PrivacyPolicy/dataProtectionAndFishing';


export class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);}

  render() {
    return (
      <div className='privacyPolicy'>
        <div className='container'>
      <PPInformation/> 
      <PPSecurity/> 
      <PPDisclosure/> 
      <PPthirdParty/> 
      <PPDataProtection/> 
      </div>
      </div>
    );
  }
}

export default PrivacyPolicy;;
