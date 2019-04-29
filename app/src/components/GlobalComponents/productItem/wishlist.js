import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../../../utils/utilityManager';
import WelcomeBack from '../../WelcomeBack/index'

const wishlistAddedImg = (
  <img src={require('../../../../public/images/plpAssests/wishlist_added.svg')} />
);
const wishListRemovedImg = (
  <img src={require('../../../../public/images/plpAssests/wishlist_blank.svg')} />
);
class Wishlist extends React.Component {


  onWishlistClick() {
    //const token = appCookie.get('isLoggedIn');
    console.log('Wishlist -- ', getCookie('isLoggedIn'));
    if (getCookie('isLoggedIn') === true) {
      
    }
    else {
      //Show login Pop up
      alert('Please Login');
    }
  }

  render() {
    // var imageItem;
    // if (this.props.data === '') {
    //   imageItem = <ImageLoader className="imgfullwidth" src={require('../../../../public/images/plpAssests/placeholder-image.png')} alt="sofa" />
    // }
    // else {
    //   imageItem = <ImageLoader className="imgfullwidth" src={'https://192.168.0.36:8443' + this.props.data} alt="sofa" />
    // }

    return (
      <>
        <button onClick={this.onWishlistClick.bind(this)} className='wishlistBtn'>{wishListRemovedImg}</button>
      </>
    )
  }
}

export default Wishlist;
