import React from 'react';
import WishListCount from '../../../components/Wishlist/wishlist';
import CartCount from '../../../components/Cart/cart';
import '../../../../public/styles/RWDStyle/mobileHeader.scss';
//import '../../../../public/styles/headerContainer/headerRight.scss';
import SideNavigation from './sideNavigation';
import '../../../../public/styles/RWDStyle/sideNavigation.scss';
export class HeaderMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <header className='mobileHeader'>
        <SideNavigation/>
        
        <button className='menuBtn'></button>
        <button ><img className='logoImg' src={require('../../../../public/images/plpAssests/lazyloadingIndicator.svg')} alt="my image" onClick={this.myfunction} /></button>
        <ul className='rightSideMobile'>
          <WishListCount />
          <CartCount />
          <button className='searchBtn' ><img src={require('../../../../public/images/RWD Assets/search.svg')} alt="my image" onClick={this.myfunction} /></button>
        </ul>

      </header>
    );
  }
}

export default HeaderMobile;
