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
  componentDidMount()
  {
     this.hash = this.props.location.hash;
  }

  onSuccessLoadWithScroll()
  {
    if(this.hash && this.hash.length>1)
    {
      const element=document.getElementById(this.hash.substring(1,this.hash.length));
      window.scrollTo(0, element.offsetTop)
    }
    
    
  }
  render() {
    return (
      <div className='staticpage serviceSupport'>
		<Breadcrumb {...this.props.match.params} staticName = {'Service & Support'}/>
        <ContentEspot espotName={ 'GI_SUPPORT_FAQ_MENU' } />
        <ContentEspot espotName={ 'GI_SUPPORT_FAQ' } />
        <a id='customerCare'>
			<ContentEspot espotName={ 'GI_CONTACT_US_CUSTOMER_CARE' } handler={(hash)=>this.onSuccessLoadWithScroll(hash)}/>
        </a>
        <ContentEspot espotName={ 'GI_SUPPORT_3' } />
         <ContentEspot espotName={ 'GI_SUPPORT_4' } />
      </div>
    );
  }
}

