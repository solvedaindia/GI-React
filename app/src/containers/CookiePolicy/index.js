
import React from 'react';
import  '../../../public/styles/static-pages/cookie.scss'
import ContentEspot from '../../components/Primitives/staticContent';


export class CookiePolicy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		
    };
  }

  render() {
    return (
<>
<ContentEspot espotName={ 'GI_Cookie_Policy_Static_Data' } />
</>
    );
  }
}

export default CookiePolicy;
