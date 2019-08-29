
import React from 'react';
import  '../../../public/styles/static-pages/cookie.scss'
import ContentEspot from '../../components/Primitives/staticContent';
import  '../../../public/styles/staticpages/staticpages.scss';


export class CookiePolicy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		
    };
  }

  render() {
    return (
      <div className='staticpages cookiepolicy'>
      <ContentEspot espotName={ 'GI_Cookie_Policy_Static_Data' } />
      <ContentEspot espotName={ 'GI_Cookie_Policy_2' } />
      <ContentEspot espotName={ 'GI_Cookie_Policy_3' } />
      <ContentEspot espotName={ 'GI_Cookie_Policy_4' } />
      <ContentEspot espotName={ 'GI_Cookie_Policy_5' } />
      
    </div>

    );
  }
}

export default CookiePolicy;
