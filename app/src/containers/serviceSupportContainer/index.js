
import React from 'react';
import  '../../../public/styles/about-us/aboutUs.scss'
import SearchLogo from '../../components/SVGs/search.js';
import FaqAnswers from '../../components/HelpSupportComp/FaqAnswers'

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
        <div className="row">
          <div className="col-md-2">
            <h3 className="faqhead">Frequently Asked Questions (FAQ)</h3>
            <ul>
              <li>
                <button className="uldiv">My Orders</button>
              </li>
              <li>
                <button className="uldivlight">Before I Buy</button>

              </li>
              <li>
                <button className="uldivlight">Payments</button>

              </li>
              <li>
                <button className="uldivlight">Warranty and Post Delivery Services</button>

              </li>
              <li>
                <button className="uldivlight">My Order Queries</button>
              </li>
              <li>
                <button className="uldivlight">Cancellations and Returns</button>

              </li>
              <li>
                <button className="uldivlight">Gift Cards</button>

              </li>
              <li>
                <button className="uldivlight">Request Service</button>

              </li>
            </ul>
          </div>
          <div className="col-md-10">
            <FaqAnswers />

          </div>

        </div>
      </div>
    );
  }
}

