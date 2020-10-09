/**
 *
 * TopHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
import Logo from 'components/Logo';
import HeaderSearch from 'containers/HeaderSearch';
import { Row, Col, OverlayTrigger, Popover, MenuItem, Modal } from 'react-bootstrap';
import SignInform from '../../containers/SignInForm/index';
import SignUpForm from '../../containers/SignUpForm/index';
// import { Link } from 'react-router-dom';
import '../../../public/styles/topHeader/topHeader.css';

class TopHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // API vars
      topHeaderData: {},
      wishListCountData: {},
      miniCartCountData: {},

      // Local vars 
      textImage: null,
      logoImage: null,
      searchTxt: null,
      profile: null,
      wishlist: null,
      minicart: null,
      wishlistCount: null,
      miniCartCount: null,
      isTriggerSignIn: null,
      isTriggerSignUp: null,

    };

  }

  componentDidMount() {
    this.fetchTopHeaderData()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.wishListCountData) {
      this.setState({
        wishlistCount: nextProps.wishListCountData.wishlist_total_item,
        miniCartCount: nextProps.miniCartCountData.cart_total_item,
      })
    }
  }

  fetchTopHeaderData() {
    if (this.props.topHeaderData) {
      const data = this.props.topHeaderData

      this.setState({
        textImage: data.logo.imagepath1,
        logoImage: data.logo.imagepath2,
        searchTxt: data.search_bar.label,
        profile: data.profile.imagepath,
        wishlist: data.wishlist.imagepath,
        minicart: data.minicart.imagepath,
      })
    }
  }

  biggg() {

  }

  onPopoverSelect(eventKey) {

    if (eventKey === 1) {
      {
        this.setState({
          isTriggerSignIn: true,
        });
      }
    }
    else {
      {
        this.setState({
          isTriggerSignUp: true,
        });
      }
    }
  }

  changeSignInVisibility(hide) {
    this.setState({
      isTriggerSignIn: hide,
    });
  }

  changeSignUpVisibility(hide) {
    this.setState({
      isTriggerSignUp: hide,
    });
  }


  render() {
    const { textImage, logoImage, searchTxt, profile, wishlist, minicart, wishlistCount, miniCartCount, isTriggerSignIn, isTriggerSignUp } = this.state;

    const userPopover = (
      <Popover id="popover-positioned-bottom">
        <MenuItem eventKey={1} onSelect={this.onPopoverSelect.bind(this)}>Log In</MenuItem>
        <MenuItem eventKey={2} onSelect={this.onPopoverSelect.bind(this)}>Sign Up</MenuItem>
      </Popover>
    );

    let signInItem;
    if (isTriggerSignIn) {
      signInItem = <SignInform handleSignInVisibility={this.changeSignInVisibility.bind(this)} />;
    } else {
      signInItem = <></>
    }

    let signUpItem;
    if (isTriggerSignUp) {
      signUpItem = <SignUpForm handleSignUpVisibility={this.changeSignUpVisibility.bind(this)} />;
    } else {
      signUpItem = <></>
    }

    return (
      <section>
        {signInItem}
        {signUpItem}
        < div className="headertopBar" >
          <div className="headertopBar-content">
            <div className="container">
              <Row>
                <Col sm={3} md={2} >
                  <div className="logo">
                    <Logo textImage={textImage} logoImage={logoImage} />
                  </div>
                </Col>
                <Col md={8} sm={5} xs={5}>
                  <HeaderSearch searchPlaceholder={searchTxt} />
                </Col>
                <Col md={2} sm={3} xs={4}>
                  <ul className="header__topBarIconList">
                    <li className="header__topBarIconList_profile-icon">
                      <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="bottom"
                        overlay={userPopover}
                        delayShow={200}
                        delayHide={1000}
                      >
                        <span className="header-icon-link user-profile-icon">
                          <img src={profile}  alt='My profile'/>
                        </span>
                      </OverlayTrigger>
                    </li>
                    <li> <a title="Wishlist" className="header-icon-link" href="/wishlist?src=header">
                      <div id="shortlist-badge"> <span className="header-icon">
                        <img src={wishlist}  alt="My Wishlist"/>
                      </span> <span className="badge-count">{wishlistCount}</span></div>
                    </a></li>
                    <li> <a title="Cart" className="header-icon-link" href="/cart?src=header">
                      <div id="cart-badge"> <span className="header-icon">
                        <img src={minicart}  alt='My Cart'/>
                      </span> <span className="badge-count bg-color">{miniCartCount}</span></div>
                    </a></li>
                  </ul>
                </Col>
              </Row>
            </div>
          </div>
          <div className="clearfix" />
        </div >
      </section >
    );
  }
}



TopHeader.propTypes = {
  isMobile: PropTypes.bool,
};

export default TopHeader;





