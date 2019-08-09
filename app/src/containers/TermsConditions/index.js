
import React from 'react';
import  '../../../public/styles/static-pages/TermsConditions.scss';
import Terms from '../../components/TermsConditionComp/termCond';


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
