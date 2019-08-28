
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
           <ContentEspot espotName={ 'GI_TERMS_AND_CONDITIONS_DISCLAIMER' } />
          <ContentEspot espotName={ 'GI_TERMS_AND_CONDITIONS_WARRANTIESANDLILIABILITES' } />
          <ContentEspot espotName={ 'GI_TERMS_AND_CONDITIONS_USERACCOUNT' } />

        </div>
      </div>
    )
  }
}

export default TermsConditions;
