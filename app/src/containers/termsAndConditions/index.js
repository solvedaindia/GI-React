
import React from 'react';
import  '../../../public/styles/static-pages/termsconditions.scss';

import ContentEspot from '../../components/Primitives/staticContent';


export class TermsConditions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		
    };
  }

  render() {
    return (    
      <div className='termsContainer'>
        <div className='container'>
       
      
           <ContentEspot espotName={ 'GI_Terms_and_Conditions_Disclaimer' } />
          <ContentEspot espotName={ 'GI_Terms_and_Conditions_Membership' } />
          <ContentEspot espotName={ 'GI_Terms_and_Conditions_WebsiteUse' } />

          <ContentEspot espotName={ 'GI_Terms_and_Conditions_PlatformForCommunication' } />

          <ContentEspot espotName={ 'GI_Terms_and_Conditions_PaymentFacility' } />

          <ContentEspot espotName={ 'GI_Terms_and_Conditions_BreachAndSelling' } />

          <ContentEspot espotName={ 'GI_Terms_and_Conditions_Coupons' } />

         <ContentEspot espotName={ 'GI_Terms_and_Conditions_Amendments' } />

            <ContentEspot espotName={ 'GI_Terms_and_Conditions_UserAccount' } />

           <ContentEspot espotName={ 'GI_Terms_and_Conditions_MaterialsAndUsage' } />

          <ContentEspot espotName={ 'GI_Terms_and_Conditions_PropertyRights' } />

          <ContentEspot espotName={ 'GI_Terms_and_Conditions_WarrantiesAndLiliabilites' } />

       <ContentEspot espotName={ 'GI_Terms_and_Conditions_ViolationToNewsletter' } />

          <ContentEspot espotName={ 'GI_Terms_and_Conditions_GeneralProvisions' } />

           <ContentEspot espotName={ 'GI_Terms_and_Conditions_GrievanceOfficer' } />

        </div>
      </div>
    )
  }
}

export default TermsConditions;
