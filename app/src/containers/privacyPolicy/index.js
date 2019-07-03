
import React from 'react';
import  '../../../public/styles/about-us/aboutUs.scss'



export class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		clpData: {},
		isLoading: false,
		error: null,
    };
  }

  render() {
    return (
      <div className="container">
   <h1 className="Privacy">Privacy Policy</h1>
      </div>
    );
  }
}

export default PrivacyPolicy;;
