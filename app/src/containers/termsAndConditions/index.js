
import React from 'react';
import  '../../../public/styles/static-pages/termsconditions.scss';
import GeneralProvision from '../../components/termsConditionsComp/tcGeneralPro';
import Amendments from '../../components/termsConditionsComp/tcAmendments';
import Communication from '../../components/termsConditionsComp/tcCommunication';
import Coupans from '../../components/termsConditionsComp/tcCoupans';
import Disclaimer from '../../components/termsConditionsComp/tcDisclaimer';
import Materials from '../../components/termsConditionsComp/tcMaterial';
import Payments from '../../components/termsConditionsComp/tcPayment';
import PropertyRights from '../../components/termsConditionsComp/tcPropertyRights';
import Selling from '../../components/termsConditionsComp/tcSelling';
import USerAccount from '../../components/termsConditionsComp/tcUSerAccount';
import Grievance from '../../components/termsConditionsComp/tcGrievance';
import Membership from '../../components/termsConditionsComp/tcMembership';
import WebsiteUSe from '../../components/termsConditionsComp/tcWebsiteUSe';
import Violations from '../../components/termsConditionsComp/tcViolations';
import WarrantyRight from '../../components/termsConditionsComp/tcWarrantyRight';


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
          <Disclaimer />
          <Membership />
          <Communication />
          <WebsiteUSe />
          <Payments />
          <Selling />
          <Coupans />
          <Amendments />
          <USerAccount />
          <Materials />
          <PropertyRights />
          <WarrantyRight />
          <Violations />
          <GeneralProvision />
          <Grievance />
        </div>
      </div>
    )
  }
}

export default TermsConditions;
