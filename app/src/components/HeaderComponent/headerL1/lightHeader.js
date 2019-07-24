import React from 'react';
import WhiteLogo from '../../SVGs/whiteLogo';
import { isMobile } from '../../../utils/utilityManager';
import '../../../../public/styles/headerContainer/headerLight.scss';
import MWebLogo from '../../SVGs/mWebLogo';

const LightHeader = () => (
  <div className="lighHeader">
    {isMobile() && <a href="/" className="backBtn"><img src={require('../../../../public/images/LeftArrowWhite.svg')} /></a>}
    <figure className="logo">
      <a href="/">
        {!isMobile() ? <WhiteLogo width="171" height="33" /> : <MWebLogo width="24" height="24" /> }
      </a>
    </figure>
  </div>
);

export default LightHeader;
