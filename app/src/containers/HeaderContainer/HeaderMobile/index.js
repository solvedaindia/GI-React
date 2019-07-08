import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import WishListCount from '../../../components/Wishlist/wishlist';
import CartCount from '../../../components/Cart/cart';
import '../../../../public/styles/RWDStyle/mobileHeader.scss';
// import '../../../../public/styles/headerContainer/headerRight.scss';
import SideNavigation from './sideNavigation';
import HeaderSearch from './headerSearch';
import '../../../../public/styles/RWDStyle/sideNavigation.scss';
export class HeaderMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerRenderItem: this.defaultRender(),
    };
    this.headerCallback = this.headerCallback.bind(this);
    this.pageNavigationRender = this.pageNavigationRender.bind(this);
  }

  defaultRender() {
    return (
      <div className="leftAnim">
        <SideNavigation pageNavigationRenderPro={this.pageNavigationRender} />
        <button className="menuBtn" />
        <Link to="/">
          <button>
            <img
              className="logoImg"
              src={require('../../../../public/images/plpAssests/lazyloadingIndicator.svg')}
              alt="my image"
              onClick={this.myfunction}
            />
          </button>
        </Link>

        <ul className="rightSideMobile">
          <WishListCount />
          <CartCount />
          <button onClick={this.onSearchClick.bind(this)} className="searchBtn">
            <img
              src={require('../../../../public/images/RWD Assets/search.svg')}
              alt="my image"
              onClick={this.myfunction}
            />
          </button>
        </ul>
      </div>
    );
  }

  pageNavigationRender = pageName => {
    let item = (
      <div className="leftAnim">
        <button onClick={this.headerCallback.bind(this)} className="menuBtn">
          <img
            className="logoImg"
            src={require('../../../../public/images/LeftArrow.svg')}
          />
        </button>
        <Link to="/">
          <button>
            <img
              className="logoImg"
              src={require('../../../../public/images/plpAssests/lazyloadingIndicator.svg')}
              alt="my image"
              onClick={this.myfunction}
            />
          </button>
        </Link>
        <label className="navigationTitle">{pageName}</label>
      </div>
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

// export default HeaderMobile;
export default withRouter(HeaderMobile);
