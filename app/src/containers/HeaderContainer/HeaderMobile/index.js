import React from 'react';
import { connect } from 'react-redux';
import { getReleventReduxState } from '../../../utils/utilityManager';
import { Link, withRouter } from 'react-router-dom';
import WishListCount from '../../../components/Wishlist/wishlist';
import CartCount from '../../../components/Cart/cart';
import '../../../../public/styles/RWDStyle/mobileHeader.scss';
// import '../../../../public/styles/headerContainer/headerRight.scss';
import SideNavigation from './sideNavigation';
import HeaderSearch from './headerSearch';
import '../../../../public/styles/RWDStyle/sideNavigation.scss';
import { Row, Col, Grid } from 'react-bootstrap';
import { resetRWDHeaderFlag } from '../../../actions/app/actions';
import ShareLogo from '../../../components/SVGs/shareIcon';
import SocialMedia from '../../../utils/socialMedia';
import SocialMediaRWD from '../../../utils/mobileUtils/socialMedia';
import '../../../../public/styles/pdpComponent/pdpComponent.scss';
const shareImg = <img src={require('../../../../public/images/share.svg')} />;
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
    console.log('mixxx -- ', nextProps, this.props)

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
      console.log('idid --- ',nextProps.shareWishlistURL, this.props.shareWishlistURL);
      this.pageNavigationRender('My Wishlist');
    }

  }

  componentDidMount() {
    this.state.isOnHome = this.props.match.isExact ? true : false;
    this.setState({
      headerRenderItem: this.defaultRender()
    })
  }

  wishlsitShareURLCallback(shareURL) {
    console.log('Share URL --- ', shareURL);
  }

  defaultRender() {
    console.log('msmsms -- ', this.state.isOnHome);
    return (
      <Row>
        <Col xs={12} md={12} className='leftAnim'>
          <div className='mobSideNav'>
            <SideNavigation pageNavigationRenderPro={this.pageNavigationRender} />
          </div>
      
          <div className="mob-logo">
          
              {this.state.isOnHome ? <a href="/"><img className='mob-logo-Img' src={require('../../../../public/images/rwd-assets/mob-logo.svg')} alt="my image" onClick={this.myfunction} /></a>: <Link to="/"><img className='logoImg' src={require('../../../../public/images/plpAssests/lazyloadingIndicator.svg')} alt="my image" onClick={this.myfunction} /></Link>}
            
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
                  alt="my image"
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
              <img className='logoImg' src={require('../../../../public/images/plpAssests/lazyloadingIndicator.svg')} alt="my image" onClick={this.myfunction} />
            </Link>
          </div>
          <ul className="mob-mini-profile-nav">
            <li>
              <span className='navigationTitle'>{pageName}</span>
            </li>
          </ul>
          {/* pageName === 'My Wishlist' */this.state.wishlistURL !== null ? <button className='shareBtn' onClick={this.onShareClick.bind(this)}>
            {/* <ShareLogo /> */}
            {/* {this.state.showSocialShare ? ( */}

            <SocialMediaRWD fromWislistPro
              sharingURLPro={this.props.shareWishlistURL}
              shareImage={shareImg} />
            {/* ) : null} */}
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
    console.log(' --miii- ', this.props);
    if (this.props.updatedHeaderVal === 'Track Order' || this.props.updatedHeaderVal === 'My Order Redirect') {
      this.pageNavigationRender('My Order');
      this.props.updateTheRWDHeader('MyOrder Return');
      return;
    }

    if (!this.props.match.isExact) {
      this.props.history.goBack();
    }
  };

  render() {
    return (
      <header className="mobileHeader">{this.state.headerRenderItem}</header>
    );
  }
}

function mapStateToProps(state) {
  const stateObj = getReleventReduxState(state, 'global');
  const defalutHeaderFlag = getReleventReduxState(stateObj, 'resetRWDFlag');
  const wishlistURL = getReleventReduxState(stateObj, 'rwdWishlistShareURL');
  const updatedHeader = getReleventReduxState(stateObj, 'updatedRWDHeader');
  console.log('Mobile Header Subscription --- ', wishlistURL);

  return {
    isHeaderReset: defalutHeaderFlag,
    shareWishlistURL: wishlistURL,
    updatedHeaderVal: updatedHeader
  };
}


// export default connect(
//   mapStateToProps,
// )(HeaderMobile);
export default withRouter(connect(mapStateToProps, { resetRWDHeaderFlag, updateTheRWDHeader })(HeaderMobile))
// export default withRouter(HeaderMobile);
