
import React from 'react';
import  '../../../public/styles/static-pages/PrivacyPolicy.scss'
import PrivacyPolicies from '../../components/PrivacyPolicy/privpol';


export class PrivacyPolicy extends React.Component {
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
      <PrivacyPolicies/>
      </>
    );
  }
}

export default PrivacyPolicy;;
