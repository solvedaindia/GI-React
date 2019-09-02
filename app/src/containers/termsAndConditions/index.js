
import React from 'react';
import  '../../../public/styles/static-pages/termsconditions.scss';
import  '../../../public/styles/staticpages/staticPages.scss';

import ContentEspot from '../../components/Primitives/staticContent';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';

export class TermsConditions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		
    };
  }

  render() {
    return (    
      <div className='staticpage termsContainer'>
		  <Breadcrumb {...this.props.match.params} staticName = {'Terms & Conditions'}/>
          <ContentEspot espotName={ 'GI_TERMS_AND_CONDITIONS_DISCLAIMER' } />
          <ContentEspot espotName={ 'GI_TERMS_AND_CONDITIONS_WARRANTIESANDLILIABILITES' } />
          <ContentEspot espotName={ 'GI_TERMS_AND_CONDITIONS_USERACCOUNT' } />
          <ContentEspot espotName={ 'GI_TERMS_AND_CONDITIONS_4' } />
          <ContentEspot espotName={ 'GI_TERMS_AND_CONDITIONS_5' } />
          <ContentEspot espotName={ 'GI_TERMS_AND_CONDITIONS_6' } />

        </div>
    )
  }
}

export default TermsConditions;
