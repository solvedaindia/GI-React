
import React from 'react';
import  '../../../public/styles/static-pages/cookie.scss'
import Cookies from '../../components/cookiePolicyComp/CookieComponent';


export class CookiePolicy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		// clpData: {},
		// isLoading: false,
		// error: null,
    };
  }

  render() {
    return (
<>
<Cookies/>
</>
    );
  }
}

export default CookiePolicy;
