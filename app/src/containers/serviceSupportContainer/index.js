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
          <div className="col-md-9 faq-my-Order">            
            <h2 className="heading">My Orders</h2>
            <FaqAnswers />
          </div> 
        </div>
        </div>

        <div className='customer-care' id='contact-us'>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
              <h2 className="heading">Contact Customer Care</h2>
              </div>

              <div className="col-md-6 separator">
                <h2 className="title-text">Enquiries</h2>
                <div className="row">
                  <div className='col-sm-6 email-box'>
                    <span className='img-icon'><img className="icon" src={require('../../../public/images/email.svg')}  alt="email" /></span>
                    <div className='email-box-desc'><h4 className="sub-heading">Email</h4>
                    <p className="emailto">talktous@godrej.com</p></div>
                  </div>

                  <div className='col-sm-6  contact-box'>
                    <span className='img-icon'><img className="icon" src={require('../../../public/images/contact.svg')}  alt="contact" /></span>
                    <div className='email-box-desc'><h4 className="sub-heading">Contact-Us</h4>
                    <p className="mob-text">+91 8654123547 <br/>+91 6325415873</p></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h2 className="title-text">After Sales Services</h2>
                <div className="row">
                  <div className='col-sm-6 email-box'>
                    <span className='img-icon'><img className="icon" src={require('../../../public/images/email.svg')}  alt="email" /></span>
                    <div className='email-box-desc'><h4 className="sub-heading">Email</h4>
                    <p className="emailto">talktous@godrej.com</p></div>
                  </div>

                  <div className='col-sm-6 contact-box'>
                    <span className='img-icon'><img className="icon" src={require('../../../public/images/contact.svg')}  alt="contact" /></span>
                    <div className='email-box-desc'><h4 className="sub-heading">Contact-Us</h4>
                    <p className="mob-text">+91 8654123547<br/>+91 6325415873</p></div>
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

