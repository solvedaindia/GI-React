
import React from 'react';
import  '../../../public/styles/about-us/aboutUs.scss'
import SearchLogo from '../../components/SVGs/search.js';


export default class HelpSupport extends React.Component {
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
      <div className="serviceSupport">
       <h1 className="Header-Copy-h1">Service & Support</h1>
       <h3 className="Header-Copy-h3">How can we help you?</h3>
       <div className='searchBars'>
            <SearchLogo />                
            <input className='searchInput' id='searchInput' autoComplete='off' placeholder='Search our support library' />
            <a className='clearField' id='clearField' role='button'>X</a>
            
        </div>
      </div>
    );
  }
}

