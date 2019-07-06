
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
            <FaqAnswers /><br/><br/><br/>
            <hr className="hr" />
            <h1 className="Header-Copy-4">Contact Customer Care</h1>
            <div className="row">
              <div className="col-md-6">
<h4 className="enquiry">Enquiries</h4>
<div className="row">
  <div className="col-sm-4">
  <img
                  className="emailus"
                  src={require('../../../public/images/emailus.png')}
                  alt="Rectangle"
                />
                <h4 className="contactus">Email</h4>
                <h4 className="emailsmall">talktous@godrej.com</h4>

  </div>
  <div className="col-sm-4"></div>
  <img
                  className="emailus"
                  src={require('../../../public/images/1034131.svg')}
                  alt="Rectangle"
                />
                                <h4 className="contactus">Contact-Us</h4>
                                <h4 className="emailsmall">+91 8654123547<br/>+91 6325415873</h4>


</div>
              </div>
              <div className="col-md-6">
              <h4 className="enquiry">After Sales Services</h4>
<div className="row">
  <div className="col-sm-4">
  <img
                  className="emailus"
                  src={require('../../../public/images/emailus.png')}
                  alt="Rectangle"
                />
                <h4 className="contactus">Email</h4>
                <h4 className="emailsmall">talktous@godrej.com</h4>

  </div>
  <div className="col-sm-4"></div>
  <img
                  className="emailus"
                  src={require('../../../public/images/1034131.svg')}
                  alt="Rectangle"
                />
                                <h4 className="contactus">Contact-Us</h4>
                                <h4 className="emailsmall">+91 8654123547<br/>+91 6325415873</h4>


</div>
<div className="chat"><br/>
<div className="row">
  <div className="col-md-6">  <h4 className="chattext">Live Chat </h4>
</div>
  <div className="col-md-6">
  <img
                  className="chatIcon"
                  src={require('../../../public/images/chat.png')}
                  alt="Rectangle"
                />
  </div>

</div>
  
  </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }
}

