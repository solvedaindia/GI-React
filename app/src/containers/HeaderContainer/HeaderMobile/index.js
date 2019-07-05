import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import WishListCount from '../../../components/Wishlist/wishlist';
import CartCount from '../../../components/Cart/cart';
import '../../../../public/styles/RWDStyle/mobileHeader.scss';
//import '../../../../public/styles/headerContainer/headerRight.scss';
import SideNavigation from './sideNavigation';
import HeaderSearch from './headerSearch';
import '../../../../public/styles/RWDStyle/sideNavigation.scss';
import { Row, Col,Grid } from 'react-bootstrap';
export class HeaderMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerRenderItem: this.defaultRender()
    };
    this.headerCallback = this.headerCallback.bind(this)
    this.pageNavigationRender = this.pageNavigationRender.bind(this)
  }

  defaultRender() {
    return (
      <Row>
      <Col xs={12} md={12} className='leftAnim'>
        <div className='mobSideNav'>
          <SideNavigation pageNavigationRenderPro={this.pageNavigationRender} />
          </div>
          <div className='mob-logo'>
          <Link to="/">
          <img className='logoImg' src={require('../../../../public/images/plpAssests/lazyloadingIndicator.svg')} alt="my image" onClick={this.myfunction} />
          </Link>
          </div>
          
          <ul className='mob-mini-nav'>
            <WishListCount />
            <CartCount />
            <li className='searchIcon'><button onClick={this.onSearchClick.bind(this)} className='searchBtn' ><img src={require('../../../../public/images/RWD Assets/search.svg')} alt="my image" onClick={this.myfunction} /></button></li>
          </ul>
      </Col>
      </Row>
    )
  }

  pageNavigationRender = (pageName) => {
    console.log('Page Render ---- ',pageName);
    var item = (
      <Row>
      <Col xs={12} md={12} className='backToCategory'>
        <div className='backToCatBtn'>
          <button onClick={this.headerCallback.bind(this)} className='menuBtn'><img className='logoImg' src={require('../../../../public/images/LeftArrow.svg')} /></button>
          </div>
          <div className='back-mob-logo'>
          <Link to="/">
          <img className='logoImg' src={require('../../../../public/images/plpAssests/lazyloadingIndicator.svg')} alt="my image" onClick={this.myfunction} />
          </Link>
          </div>
          <ul className='mob-mini-profile-nav'>
            <li>
                 <span className='navigationTitle'>{pageName}</span>
            </li>
            </ul>
        </Col>
        </Row>
    )
    this.setState({
      headerRenderItem: item
    })
  }

  onSearchClick() {
    this.setState({
      headerRenderItem: <HeaderSearch headerCallbackPro={this.headerCallback.bind(this)} />
    })
  }

  headerCallback = () => {
    this.setState({
      headerRenderItem: this.defaultRender()
    })
    console.log('miii --- ',this.props)
    if (!this.props.match.isExact) {
      this.props.history.goBack();
    }
    
  }


  render() {
    return (
      <header className='mobileHeader'>
        {this.state.headerRenderItem}
      </header>
    );
  }
}

// export default HeaderMobile;
export default withRouter(HeaderMobile);