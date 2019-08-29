
import React from 'react';
import  '../../../public/styles/static-pages/termsconditions.scss';
import  '../../../public/styles/staticpages/staticpages.scss';

import ContentEspot from '../../components/Primitives/staticContent';


export class TermsConditions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		
    };
  }

  render() {
    return (    
      <div className='staticpages termsContainer'>
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
