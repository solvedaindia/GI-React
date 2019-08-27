
import React from 'react';
import  '../../../public/styles/static-pages/termsconditions.scss';
import Terms from '../../components/termsConditionsComp/termConditions';


export class TermsConditions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		
    };
  }

  render() {
    return (    
      <>     
      <Terms/> 
      </>
    )
  }
}

export default TermsConditions;
