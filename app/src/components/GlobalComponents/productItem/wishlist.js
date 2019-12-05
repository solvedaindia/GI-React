import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import apiManager from '../../../utils/apiManager';
import { updatetWishListCount, resetRemoveFromWishlistFlag } from '../../../actions/app/actions';
import {
  getCookie,
  getCorrespondingGiftlistId,
  getOnlyWishlistUniqueIds,
} from '../../../utils/utilityManager';
import { getUpdatedWishlist } from '../../../utils/initialManager';
import WelcomeBack from '../../WelcomeBack/index';
import {
  storeId,
  accessToken,
  addToWishlist,
  removeFromWishlist,
  wishlistIdCookie,
} from '../../../../public/constants/constants';
import UserAccInfo from '../../UserAccInfo/userAccInfo';
import appCookie from '../../../utils/cookie';

class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.wishlistAddedImg = (
      <img
        src={require('../../../../public/images/plpAssests/wishlist_added.svg')}
       alt="Added"
       // onClick={this.onWishlistClick.bind(this)}
      />
    );
    this.wishListRemovedImg = (
      <img
        src={require('../../../../public/images/plpAssests/wishlist_blank.svg')}
       alt="Add to Wishlist"
       // onClick={this.onWishlistClick.bind(this)}
      />
    );
    this.state = {
      wishlistCurrentImage: this.wishListRemovedImg,
      wishlistPopup: null,
      isWelcomeBack: false,
    };
  }

  onWishlistClick(e) {
    if(e.target.nodeName==='SPAN' || e.target.nodeName==='DIV'){
      return;
    }
    const wishlistArr = getOnlyWishlistUniqueIds();
    if (getCookie('isLoggedIn') === 'true') {
      if (e.target && e.target.name === 'viewWishListButton') {
        return;
      }
      if (wishlistArr.includes(this.props.uniqueId)) {
        this.removeFromWishlistAPI();
      } else {
        this.addToWishlistAPI();
      }
    } else {
      appCookie.set('wishListUniqueId', this.props.uniqueId , 365 * 24 * 60 * 60 * 1000);
      this.setState({ isWelcomeBack: true });
    }
  }

  addToWishlistAPI() { 
    const data = {
      sku_id: this.props.uniqueId,
    };
    apiManager
      .post(addToWishlist, data)
      .then(response => {
        
      getUpdatedWishlist(this);
        this.setState({
          wishlistCurrentImage: this.wishlistAddedImg,
          wishlistPopup: this.wishlistPopupItem(),
        });
      })
      .catch(error => {
      });
  }

  removeFromWishlistAPI() {
    const data = {
      wishlist_id: getCookie(wishlistIdCookie),
      giftlistitem_id: getCorrespondingGiftlistId(this.props.uniqueId),
    };
    apiManager
      .post(removeFromWishlist, data)
      .then(response => {
        this.setState({ wishlistCurrentImage: this.wishListRemovedImg });
        getUpdatedWishlist(this);
        
        if (this.props.isFromWishlistPro === true) {
          this.props.resetRemoveFromWishlistFlag(true)
        }
        
      })
      .catch(error => {
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isWelcomeBack: false,
      wishlistCurrentImage: nextProps.isInWishlistPro
        ? this.wishlistAddedImg
        : this.wishListRemovedImg,
    });
  }

  componentDidMount() {
    this.setState({
      wishlistCurrentImage: this.props.isInWishlistPro
        ? this.wishlistAddedImg
        : this.wishListRemovedImg,
    });
    
    if (appCookie.get('wishListUniqueId') !== "" && appCookie.get('isLoggedIn') === 'true') {
          const cookieData = appCookie.get('wishListUniqueId');
          if (document.getElementById("wishlistBtnId_"+cookieData)) {
            appCookie.set('wishListUniqueId', '' , 365 * 24 * 60 * 60 * 1000);
            document.getElementById("wishlistBtnId_"+cookieData).click();
          }
    }
  }

  wishlistPopupItem() {
    setTimeout(() => {
      this.setState({
        wishlistPopup: null,
      });
    }, 3000);
    let pdpWishlist = '';
    if (this.props.isPDP) {
      pdpWishlist = 'pdpWishlist';
    }
    return (
      <div className={`addedToWishlist clearfix ${pdpWishlist}`}>
        <span className="wishlist-text">Product Added to Wishlist</span>
        <button
          onClick={() => this.redirectToWishlistPage()}
          className="view-btn"
          name="viewWishListButton"
        >
          View
        </button>
      </div>
    );
  }

  redirectToWishlistPage = () => {
    this.props.history.push('/wishlist');
  };

  
  resetLoginValues() {
    this.setState({
      isWelcomeBack: false,
    });
  }

  render() {
    const wishListId = 'wishlistBtnId_'+this.props.uniqueId;
    return (
      <>
        { !this.props.isPDP &&
          this.state.wishlistPopup
        }
        
        <button
          onClick={this.onWishlistClick.bind(this)}
          className="wishlistBtn"
          id={wishListId}
        >
          {this.state.wishlistCurrentImage}
          { this.props.isPDP &&
            this.state.wishlistPopup
          }
        </button>

        {this.state.isWelcomeBack ? <UserAccInfo fromWishlistPro resetCallbackPro={this.resetLoginValues.bind(this)}/> : null}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps,
  { updatetWishListCount, resetRemoveFromWishlistFlag},
)(Wishlist);
