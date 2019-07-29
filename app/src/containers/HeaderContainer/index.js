/**
 *
 * HeaderContainer
 *
 */

import React from 'react';
// import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import HeaderL1 from '../../components/HeaderComponent/headerL1/headerL1';
import HeaderL2 from '../../components/HeaderComponent/headerL2/headerL2';
import Logo from '../../components/SVGs/logo';
import HeaderMobile from './HeaderMobile/index';
import {isMobile} from '../../utils/utilityManager'
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
    if (isMobile()) {
      return (
        <HeaderMobile />
      );
    }

    return (
      <header className="appheader" id='header'>
        <div className="logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="navigation">
          <HeaderL1 />
          <HeaderL2 />
        </div>
      </header>
    );
  }
}

export default HeaderContainer;
