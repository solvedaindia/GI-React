
import React from 'react';
import  '../../../public/styles/static-pages/TermsConditions.scss'
import Terms from '../../components/TermsConditionComp/termCond';


export class TermsConditions extends React.Component {
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
      // 
      <>
      <Terms/>
      </>
    );
  }
}

export default TermsConditions;;
