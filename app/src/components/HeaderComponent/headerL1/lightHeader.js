import React from 'react';
import WhiteLogo from '../../SVGs/whiteLogo';
import { isMobile } from '../../../utils/utilityManager';
import '../../../../public/styles/headerContainer/headerLight.scss';
import MWebLogo from '../../SVGs/mWebLogo';

const LightHeader = () => (
  <div className="lighHeader">
    <figure className="logo">
      <a href="/">
      {!isMobile() ? <WhiteLogo width="171" height="33" /> : 
          // <img className='logoImg' src={require('../../../../public/images/plpAssests/lazyloadingIndicatorWhite.svg')} alt="logo" />
          null }
      </a>
    </figure>
  </div>
);

export default LightHeader;
