
import React from 'react';
import '../../../public/styles/static-pages/termsconditions.scss';
import '../../../public/styles/staticPages/staticPages.scss';
import ContentEspot from '../../components/Primitives/staticContent';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Pixels from '../../components/Primitives/pixels';
import { TermsConditionES } from '../../utils/EspotConstant';

export class TermsConditions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='staticpage termsContainer'>
        <Pixels espotName={TermsConditionES.policyMeta} />
        <Breadcrumb {...this.props.match.params} staticName={'Terms & Conditions'} />
        <ContentEspot espotName={TermsConditionES.tcDisclaimer} />
        <ContentEspot espotName={TermsConditionES.tcWarranties} />
        <ContentEspot espotName={TermsConditionES.tcUserAccount} />
        <ContentEspot espotName={TermsConditionES.tc4} />
        <ContentEspot espotName={TermsConditionES.tc5} />
        <ContentEspot espotName={TermsConditionES.tc6} />

      </div>
    )
  }
}

export default TermsConditions;
