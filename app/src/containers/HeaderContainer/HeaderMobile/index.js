import React from 'react';
import { connect } from 'react-redux';
import { getReleventReduxState } from '../../../utils/utilityManager';
import { Link, withRouter } from 'react-router-dom';
import WishListCount from '../../../components/Wishlist/wishlist';
import CartCount from '../../../components/Cart/cart';
import '../../../../public/styles/RWDStyle/mobileHeader.scss';
import SideNavigation from './sideNavigation';
import HeaderSearch from './headerSearch';
import '../../../../public/styles/RWDStyle/sideNavigation.scss';
import { Row, Col } from 'react-bootstrap';
import { resetRWDHeaderFlag } from '../../../actions/app/actions';
import SocialMediaRWD from '../../../utils/mobileUtils/socialMedia';
import '../../../../public/styles/pdpComponent/pdpComponent.scss';
const shareImg = <img src={require('../../../../public/images/share.svg')} alt='shareImg'/>;
import { updateTheRWDHeader } from '../../../actions/app/actions';

class HeaderMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnHome: false,
      headerRenderItem: null,
      showSocialShare: false,
      wishlistURL: null,
    };
    this.headerCallback = this.headerCallback.bind(this);
    this.pageNavigationRender = this.pageNavigationRender.bind(this);
    this.defaultRender = this.defaultRender.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== "/myAccount" && nextProps.location.pathname !== "/wishlist") {
      this.state.isOnHome = nextProps.match.isExact ? true : false;
      this.setState({
        headerRenderItem: this.defaultRender()
      })
    }

    if (nextProps.isHeaderReset !== this.props.isHeaderReset) {
      if (nextProps.isHeaderReset) {
        this.headerCallback();
        this.props.resetRWDHeaderFlag();
      }
    }

    if (nextProps.updatedHeaderVal !== this.props.updatedHeaderVal) {
      if (nextProps.updatedHeaderVal === 'Track Order') {
        this.pageNavigationRender('Track Order');
      }
      if (nextProps.updatedHeaderVal === 'My Order Redirect') {
        this.pageNavigationRender('My Order');
      }
    }

    
    if (nextProps.shareWishlistURL !== this.props.shareWishlistURL) {
      this.state.wishlistURL = nextProps.shareWishlistURL
      this.pageNavigationRender('My Wishlist');
    }
    if(window.location.pathname === "/wishlist"){
      this.pageNavigationRender('My Wishlist');
    } else if(this.props.history.location.state && this.props.history.location.state.from === 'myprofile'){
      this.pageNavigationRender('My Profile');
    } else if(this.props.history.location.state && this.props.history.location.state.from === 'myorder'){
      this.pageNavigationRender('My Orders');
    } else if(this.props.history.location.state && this.props.history.location.state.from === 'password'){
      this.pageNavigationRender('Change Password');
    } else if(this.props.history.location.state && this.props.history.location.state.from === 'address'){
      this.pageNavigationRender('Manage Address');
    }
    else if(this.props.history.location.state && this.props.history.location.state.from === 'serviceRequest'){
      this.pageNavigationRender('My Service Request');
    }

  }

  componentDidMount() {
    this.state.isOnHome = this.props.match.isExact ? true : false;
    if(window.location.pathname === "/wishlist"){
      this.pageNavigationRender('My Wishlist');
    } else if(this.props.history.location.state && this.props.history.location.state.from === 'myprofile'){
      this.pageNavigationRender('My Profile');
    } else if(this.props.history.location.state && this.props.history.location.state.from === 'myorder'){
      this.pageNavigationRender('My Orders');
    } else if(this.props.history.location.state && this.props.history.location.state.from === 'password'){
      this.pageNavigationRender('Change Password');
    } else if(this.props.history.location.state && this.props.history.location.state.from === 'address'){
      this.pageNavigationRender('Manage Address');
    }
    else if(this.props.history.location.state && this.props.history.location.state.from === 'serviceRequest'){
      this.pageNavigationRender('My Service Request');
    }
    else {
      this.setState({
        headerRenderItem: this.defaultRender()
      })
    }
  }

  wishlsitShareURLCallback(shareURL) {
  }

  defaultRender() {
    return (
      <Row>
        <Col xs={12} md={12} className='leftAnim'>
          <div className='mobSideNav'>
            <SideNavigation pageNavigationRenderPro={this.pageNavigationRender} />
          </div>
      
          <div className="mob-logo">
          
              {this.state.isOnHome ? <a href="/"><img className='mob-logo-Img' src={require('../../../../public/images/rwd-assets/mob-logo.svg')} alt="logo" onClick={this.myfunction} /></a>: <Link to="/"><img className='logoImg' src={require('../../../../public/images/plpAssests/lazyloadingIndicator.svg')} alt="logo" onClick={this.myfunction} /></Link>}
            
          </div>

          <ul className="mob-mini-nav">
            <WishListCount pageNavigationRenderPro={this.pageNavigationRender} shareURLCallbackPro={this.wishlsitShareURLCallback.bind(this)} />
            <CartCount />
            {!this.state.isOnHome ? <li className="searchIcon">
              <button
                onClick={this.onSearchClick.bind(this)}
                className="searchBtn"
              >
                <img
                  src={require('../../../../public/images/rwd-assets/search.svg')}
                  alt="search"
                  onClick={this.myfunction}
                />
              </button>
            </li>
              :
              null}

          </ul>

          {this.state.isOnHome ? <div className='mob-home-search'>
            <HeaderSearch headerCallbackPro={this.headerCallback.bind(this)} />
          </div>
            :
            null}

        </Col>
      </Row>
    );
  }

  onShareClick() {
    this.setState({
      showSocialShare: !this.state.showSocialShare,
    });
    this.state.showSocialShare = !this.state.showSocialShare;
    this.pageNavigationRender('My Wishlist');
  }

  pageNavigationRender = (pageName) => {  
    let item = (
      <Row>
        <Col xs={12} md={12} className='backToCategory'>
          <div className='backToCatBtn'>
            <button onClick={this.headerCallback.bind(this)} className='menuBtn'><img className='logoImg' src={require('../../../../public/images/LeftArrow.svg')} /></button>
          </div>
          <div className="back-mob-logo">
            <Link to="/">
              <img className='logoImg' src={require('../../../../public/images/plpAssests/lazyloadingIndicator.svg')} alt="Loader" onClick={this.myfunction} />
            </Link>
          </div>
          <ul className="mob-mini-profile-nav">
            <li key={pageName}>
              <span className='navigationTitle'><b>{pageName}</b></span>
            </li>
          </ul>
          {this.state.wishlistURL !== null ? <button className='shareBtn' onClick={this.onShareClick.bind(this)}>
            <SocialMediaRWD fromWislistPro
              sharingURLPro={this.props.shareWishlistURL}
              shareImage={shareImg} />
          </button> : null}

        </Col>
      </Row>
    );
    this.setState({
      headerRenderItem: item,
    });
  };


  onSearchClick() {
    this.setState({
      headerRenderItem: (
        <HeaderSearch headerCallbackPro={this.headerCallback.bind(this)} />
      ),
    });
  }


  headerCallback = () => {
 
    this.setState({
      headerRenderItem: this.defaultRender(),
      showSocialShare: false,
    });
    if (this.props.updatedHeaderVal === 'Track Order' || this.props.updatedHeaderVal === 'My Order Redirect') {
      this.pageNavigationRender('My Order');
      this.props.updateTheRWDHeader('MyOrder Return');
      return;
    }
    if( this.props.updatedHeaderVal === 'show return')
    {
      this.props.updateTheRWDHeader('Track Order');
    }
    if(window.location.pathname !== "/myAccount" && window.location.pathname !== "/wishlist"){
      return;
    }
    if (!this.props.match.isExact) {
      this.props.history.goBack();
    }
  };

  render() {
    return (
      <header className="mobileHeader" id='mob-header'>{this.state.headerRenderItem}</header>
    );
  }
}

function mapStateToProps(state) {
  const stateObj = getReleventReduxState(state, 'global');
  const defalutHeaderFlag = getReleventReduxState(stateObj, 'resetRWDFlag');
  const wishlistURL = getReleventReduxState(stateObj, 'rwdWishlistShareURL');
  const updatedHeader = getReleventReduxState(stateObj, 'updatedRWDHeader');

  return {
    isHeaderReset: defalutHeaderFlag,
    shareWishlistURL: wishlistURL,
    updatedHeaderVal: updatedHeader
  };
}

export default withRouter(connect(mapStateToProps, { resetRWDHeaderFlag, updateTheRWDHeader })(HeaderMobile))
