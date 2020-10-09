/**
 *
 * HeaderContainer
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';
import HeaderL1 from '../../components/HeaderComponent/headerL1/headerL1';
import HeaderL2 from '../../components/HeaderComponent/headerL2/headerL2';
import Logo from '../../components/SVGs/logo';
import HeaderMobile from './HeaderMobile/index';
import {isMobile} from '../../utils/utilityManager'
import '../../../public/styles/headerContainer/headerContainer.scss';
import ContentEspot from '../../components/Primitives/staticContent';
import { webUrl } from '../../../public/constants/constants';
import { scrollPage } from '../../utils/utilityManager';



export class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerData: {},
      isLoading: false,
      error: null
    };
  }

  componentWillReceiveProps(nextProps) {
	  if(this.props.location.pathname != nextProps.location.pathname)
	  {
		scrollPage(this.props.location.pathname, nextProps.location.pathname);
	  }
  }

  render() {
    
    let searchStr = '';
	let dataVal = '';
    if (document.getElementById('searchInput')) {
       searchStr = document.getElementById('searchInput').value;
	}
	if (searchStr != '') {
	    dataVal = <Helmet>
          <script data-react-helmet="true" type="application/ld+json">
            {`[{
              "@context": "http://schema.org",
              "@type": "WebSite",
              "url": "${webUrl}",
              "potentialAction": {
              "@type": "SearchAction",
              "target": "/search/?keyword={${searchStr}}",
                "query-input": "required name=${searchStr}"
              }
			  }]
            `}
          </script>
		  
       </Helmet>
    }
	else{
		dataVal = <Helmet>
		 <script data-react-helmet="true" type="application/ld+json">
            {`[{
              "@context": "http://schema.org",
              "@type": "WebSite",
              "url": "${webUrl}"
			  }]
            `}
		   </script>
       </Helmet>
	}
   
    if (isMobile()) {
      return (
        <>
        {dataVal}
        <HeaderMobile />
        </>
      );
    }
    return (
      <>
      {dataVal}
      <ContentEspot espotName = { 'GI_PIXEL_HEADER_TOP' } />
      <header className="appheader" id='header'>
        <div className="logo">
          {window.location.pathname === '/' ? (<a href="/"><Logo /></a>):(<Link to="/"><Logo /></Link>)}
        </div>
        <div className="navigation">
          <HeaderL1/>
          <HeaderL2 />
        </div>
      </header>
      </>
    );
  }
}
export default withLastLocation(HeaderContainer);
