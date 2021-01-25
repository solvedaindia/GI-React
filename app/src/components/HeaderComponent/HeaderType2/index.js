import React from 'react';
import WhiteLogo from '../../SVGs/whiteLogo';
import MWebLogo from '../../SVGs/mWebLogo';
import '../../../../public/styles/headerContainer/headerType2.scss';

const HeaderType2 = () => (
  <div className="headerType2">
    <figure className="logo">
      <a href="/">
        <WhiteLogo width="171" height="40" />
      </a>
    </figure>
    <figure className="logoRight">
      <MWebLogo width="40" height="40" />
    </figure>
  </div>
);

export default HeaderType2;
