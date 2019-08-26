
import React from 'react';
import  '../../../public/styles/static-pages/termsconditions.scss';
import TcDisclaimer from '../../components/TermsConditionEspots/TCEspotOne';
import TcMemebership from '../../components/TermsConditionEspots/TCEspotTwo';
import TcPlatform from '../../components/TermsConditionEspots/TCEspotThree';
import TcWebsite from '../../components/TermsConditionEspots/TCEspotFour';
import TcpaymentFacility from '../../components/TermsConditionEspots/TCEspotFive';
import TcbreachHandling from '../../components/TermsConditionEspots/TCEspotSix';
import TcCoupans from '../../components/TermsConditionEspots/TCEspotSeven';
import TcAmendments from '../../components/TermsConditionEspots/TCEspotEight';
import TcUserAccount from '../../components/TermsConditionEspots/TCEspotNine';
import TcMaterialSandUsage from '../../components/TermsConditionEspots/TCEspotTen';
import TcPropertyRights from '../../components/TermsConditionEspots/TCEspotEleven';
import TcWarantees from '../../components/TermsConditionEspots/TCEspotTwelve';
import TcNewsLetter from '../../components/TermsConditionEspots/TCEspotThirteen';
import TcGeberalProvision from '../../components/TermsConditionEspots/TCEspotFourteen';
import TcGrievanceOfficer from '../../components/TermsConditionEspots/TCEspotFifteen';

export class TermsConditions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		
    };
  }

  render() {
    return (    
      <>      
      <div className='termsContainer'>
        <div className='container'>
          <TcDisclaimer />
          <TcMemebership />
          <TcPlatform />
          <TcWebsite />
          <TcpaymentFacility />
          <TcbreachHandling />
          <TcCoupans />
          <TcAmendments />
          <TcUserAccount />
          <TcMaterialSandUsage />
          <TcPropertyRights />
          <TcWarantees />
          <TcNewsLetter />
          <TcGeberalProvision />
          <TcGrievanceOfficer />
        </div>
      </div>
      </>
    )
  }
}

export default TermsConditions;
