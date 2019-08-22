import React from 'react';
import  '../../../public/styles/static-pages/aboutUs.scss'
import SearchLogo from '../../components/SVGs/search.js';
import FaqAnswers from '../../components/HelpSupportComp/FaqAnswers'
import  '../../../public/styles/static-pages/HelpSupport.scss'
import {isMobile} from '../../utils/utilityManager'

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
      <div className='service-support'>
        <div className='container'>
        <h1 className="heading">Service & Support</h1>
        <h3 className="subHeading">What can we help you with today?</h3>      
        
        <div className="row innerContent">
          <div className="col-md-3 faq-wrapper">
            <h2 className="faq-heading">Frequently Asked Questions (FAQ)</h2>
            <ul className='faqList'>
            <a href='/support'><li className='faqItem active'>My Orders</li></a>
              <a href='/support'><li className='faqItem'>Before I Buy</li></a>
              <a href='/support'><li className='faqItem'>Payments</li></a>
              <a href='/support'><li className='faqItem'>Warranty and Post Delivery Services</li></a>
              <a href='/support'><li className='faqItem'>My Order Queries</li></a>
              <a href='/support'><li className='faqItem'>Cancellations and Returns</li></a>
              <a href='/support'><li className='faqItem'>Gift Cards</li></a>
              <a href='/support'><li className='faqItem'>Request Service</li></a>
            </ul>
          </div>
          <div className="col-md-9 faq-my-Order">            
            <h2 className="heading">My Orders</h2>
            <FaqAnswers />
          </div> 
        </div>
        </div>

        <div className='customer-care'>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
              <h2 className="heading">Contact Customer Care</h2>
              </div>

              <div className="col-md-6 borderRight">
                <h2 className="enquiry">Enquiries</h2>
                <div className="row">
                  <div className='col-sm-6 email-box'>
                    <span className='img-icon'><img className="icon" src={require('../../../public/images/email.svg')}  alt="email" /></span>
                    <div className='email-box-desc'><h4 className="sub-heading">Email</h4>
                    <h4 className="emailto">talktous@godrej.com</h4></div>
                  </div>

                  <div className='col-sm-6  contact-box'>
                    <span className='img-icon'><img className="icon" src={require('../../../public/images/contact.svg')}  alt="contact" /></span>
                    <div className='email-box-desc'><h4 className="sub-heading">Contact-Us</h4>
                    <h4 className="emailto">+91 8654123547 <br/>+91 6325415873</h4></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h2 className="enquiry">After Sales Services</h2>
                <div className="row">
                  <div className='col-sm-6 email-box'>
                    <span className='img-icon'><img className="icon" src={require('../../../public/images/email.svg')}  alt="email" /></span>
                    <div className='email-box-desc'><h4 className="sub-heading">Email</h4>
                    <h4 className="emailto">talktous@godrej.com</h4></div>
                  </div>

                  <div className='col-sm-6 contact-box'>
                    <span className='img-icon'><img className="icon" src={require('../../../public/images/contact.svg')}  alt="contact" /></span>
                    <div className='email-box-desc'><h4 className="sub-heading">Contact-Us</h4>
                    <h4 className="emailto">+91 8654123547<br/>+91 6325415873</h4></div>
                  </div>
                </div>
              
              </div>
            </div>
        </div>
        </div>
       
        
        {/* <button className="Livechat">
        <span className="text">Live Chat </span>
        <span className='iconChat'><img className="chatIcon" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="Rectangle" /></span>
            
       </button> */}
      </div>
    );
  }
}

