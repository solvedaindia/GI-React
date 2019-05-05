/**
 *
 * HeaderContainer
 *
 */

import React from 'react';
// import { Helmet } from 'react-helmet';
import HeaderL1 from '../../components/HeaderComponent/headerL1/headerL1';
import HeaderL2 from '../../components/HeaderComponent/headerL2/headerL2';
import Logo from '../../components/SVGs/logo';
import '../../../public/styles/headerContainer/headerContainer.scss';

export class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerData: {},
      isLoading: false,
      error: null,
    };
  }

  render() {
    return (
      <header className="appheader">
        <div className="logo">
          <Logo />
        </div>
        <div className="navigation">
          <HeaderL1 />
          <HeaderL2 />
        </div>
        <div className='subCatImage'>
            <img src='https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/solution-banner.png' className='subCatImg' alt='Sub Cat Img' />
        </div>
      </header>
    );
  }
}

export default HeaderContainer;
