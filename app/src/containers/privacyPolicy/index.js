
import React from 'react';
import  '../../../public/styles/static-pages/privacyPolicy.scss';
import ContentEspot from '../../components/Primitives/staticContent';


export class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);}

  render() {
    return (
      <div className='privacyPolicy'>
        <div className='container'>
          <ContentEspot espotName={ 'GI_Privacy_Policy_Information' } />
          <ContentEspot espotName={ 'GI_Privacy_Policy_Security' } />
          <ContentEspot espotName={ 'GI_Terms_and_Conditions_MaterialsAndUsage' } />
          <ContentEspot espotName={ 'GI_Privacy_Policy_ThirdParty_Information' } />
          <ContentEspot espotName={ 'GI_Privacy_Policy_DataProtectionAndFishing' } />
        </div>
      </div>
    );
  }
}

export default PrivacyPolicy;;
