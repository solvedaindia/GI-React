import React from 'react';
import  '../../../public/styles/static-pages/aboutUs.scss'
import  '../../../public/styles/static-pages/HelpSupport.scss'
import ContentEspot from '../../components/Primitives/staticContent';
import  '../../../public/styles/staticpages/staticPages.scss';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
export default class HelpSupport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		
    };
  }

  render() {
    return (
      <div className='staticpage serviceSupport'>
		<Breadcrumb {...this.props.match.params} staticName = {'Service & Support'}/>
    <div className='container'>
    <ul>
      <li style={{color: '#eef8fe'}}><a href='/support'>My Orders</a></li>
      <li><a href='/support'>Before I Buy</a></li>
      <li><a href='/support'>Payments</a></li>
      <li><a href='/support'>Warranty and Post Delivery Services</a></li>
      <li><a href='/support'>My Order Queries</a></li>
      <li><a href='/support'>Cancellations and Returns</a></li>
      <li><a href='/support'>Gift Cards</a></li>
      <li><a href='/support'>Request Service</a></li>
    </ul>
    </div>
   
        <ContentEspot espotName={ 'GI_SUPPORT_FAQ' } />
        <a id='customerCare'>
       <ContentEspot espotName={ 'GI_CONTACT_US_CUSTOMER_CARE' } />
        </a>
        <ContentEspot espotName={ 'GI_SUPPORT_3' } />
         <ContentEspot espotName={ 'GI_SUPPORT_4' } />
      </div>
    );
  }
}

