import React from 'react';
import  '../../../public/styles/static-pages/aboutUs.scss'
import SearchLogo from '../../components/SVGs/search.js';
import FaqAnswers from '../../components/HelpSupportComp/FaqAnswers'
import  '../../../public/styles/static-pages/HelpSupport.scss'

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
      <div className='serviceSupport'>
        <div className='container'>
        <h1 className="headingServicesupport">Service & Support</h1>
        <h3 className="subHeading">How can we help you?</h3>      
        
        <div className="row innerContent">
          <div className="col-md-3 faqArea">
            <h2 className="faqhead">Frequently Asked Questions (FAQ)</h2>
            <ul className='faqList'>
              <li className='faqItem active'>My Orders</li>
              <li className='faqItem'>Before I Buy</li>
              <li className='faqItem'>Payments</li>
              <li className='faqItem'>Warranty and Post Delivery Services</li>
              <li className='faqItem'>My Order Queries</li>
              <li className='faqItem'>Cancellations and Returns</li>
              <li className='faqItem'>Gift Cards</li>
              <li className='faqItem'>Request Service</li>
            </ul>
          </div>
          <div className="col-md-9 myOrder">            
          <h2 className="myOrders">My Orders</h2>
            <FaqAnswers />
            </div>
            
            
            <div className='clearfix'></div>
        </div>
        
        <div className='clearfix'></div>
       

        </div>
        <div className='customerCare'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            <h1 className="headingCustomercare">Contact Customer Care</h1>
            </div>

            <div className="col-md-6 borderRight">
              <h2 className="enquiry">Enquiries</h2>
              <div className="row">
                <div className="col-sm-6 text-center">
                  <img className="icon" src='https://203.110.85.50/imagestore/images/godrejInterio/LivingRoomHover.svg' alt="Rectangle" />
                  <h4 className="contactus">Email</h4>
                  <h4 className="emailsmall">talktous@godrej.com</h4>

                </div>
                <div className="col-sm-6 text-center">
                <img className="icon" src='https://203.110.85.50/imagestore/images/godrejInterio/LivingRoomHover.svg' alt="Rectangle" />
                <h4 className="contactus">Contact-Us</h4>
                <h4 className="emailsmall">+91 8654123547 <br/>+91 6325415873</h4>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="enquiry">After Sales Services</h2>
              <div className="row">
                <div className="col-sm-6 text-center">
                  <img className="icon" src='https://203.110.85.50/imagestore/images/godrejInterio/LivingRoomHover.svg' alt="Rectangle" />
                  <h4 className="contactus">Email</h4>
                  <h4 className="emailsmall">talktous@godrej.com</h4>
                </div>
                <div className="col-sm-6 text-center">
                <img className="icon" src='https://203.110.85.50/imagestore/images/godrejInterio/LivingRoomHover.svg' alt="Rectangle" />
                <h4 className="contactus">Contact-Us</h4>
                <h4 className="emailsmall">+91 8654123547<br/>+91 6325415873</h4>
                </div>
              </div>
            
            </div>
          </div>
       </div>
        </div>
       
        
        <button className="Livechat">
        <span className="text">Live Chat </span>
        <span className='iconChat'><img className="chatIcon" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="Rectangle" /></span>
            
       </button>
      </div>
    );
  }
}

