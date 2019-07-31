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

class HeaderMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnHome: false,
      headerRenderItem: null,
      showSocialShare: false,
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

  }

  componentDidMount() {
    this.state.isOnHome = this.props.match.isExact ? true : false;
    this.setState({
      headerRenderItem: this.defaultRender()
    })
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
            <Link to="/">
              <img className='logoImg' src={require('../../../../public/images/plpAssests/lazyloadingIndicator.svg')} alt="my image" onClick={this.myfunction} />
            </Link>
          </div>

          <ul className="mob-mini-nav">
            <WishListCount pageNavigationRenderPro={this.pageNavigationRender} />
            <CartCount />
            {!this.state.isOnHome ? <li className="searchIcon">
              <button
                onClick={this.onSearchClick.bind(this)}
                className="searchBtn"
              >
                <img
                  src={require('../../../../public/images/RWD Assets/search.svg')}
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
    // this.setState({
    //   showSocialShare: !this.state.showSocialShare,
    // });
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
          {pageName === 'My Wishlist' ? <button className='shareBtn' onClick={this.onShareClick.bind(this)}>
            <ShareLogo />
            {/* {this.state.showSocialShare ? (
              <SocialMedia
                fromWislistPro
                sharingURLPro={'https:dksf'}
              />
            ) : null} */}
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
    console.log('miii --- ', this.props);
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
  console.log('Mobile Header Subscription --- ', defalutHeaderFlag);

  return {
    isHeaderReset: defalutHeaderFlag,
  };
}


// export default connect(
//   mapStateToProps,
// )(HeaderMobile);
export default withRouter(connect(mapStateToProps, { resetRWDHeaderFlag })(HeaderMobile))
// export default withRouter(HeaderMobile);
