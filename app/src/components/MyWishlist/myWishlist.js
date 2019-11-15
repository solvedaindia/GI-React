import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EmptyWishlist from './emptyWishlist';
import '../../../public/styles/myWishlist/myWishlist.scss';
import '../../../public/styles/plpContainer/plpContainer.scss';
import PlpComponent from '../PlpComponent/index';
import {
  plpAPI,
  myWishlistAPI,
  shareWishlistAPI,
} from '../../../public/constants/constants';
import { getReleventReduxState, getCookie } from '../../utils/utilityManager';
import apiManager from '../../utils/apiManager';
import { resetRemoveFromWishlistFlag, rwdShareWishlistURL } from '../../actions/app/actions';
import BestSeller from '../BestSelling/bestSelling';
import ShareLogo from '../SVGs/shareIcon';
import SocialMedia from '../../utils/socialMedia';
import {isMobile} from '../../utils/utilityManager';
import CryptoJS from 'crypto-js';
import { PRODUCT_REMOVED} from '../../constants/app/myWishListConstants';

const encryptKey = 'GIk';
const seperateStr = '~~';
class MyWishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      wishlistData: [],
      wishlistPopup: null,
      moveToCartPOPup: null,
      showSocialShare: false,
      wishlistAPIURL: myWishlistAPI,
      // Sharing
      guestAccessKey: null,
      externalIdentifier: null,
      sharingURL: null,
      userNameS: null,
      isShareWishlist: false,
    };
  }

  componentDidMount() {
    if (getCookie('isLoggedIn') !== 'true' && this.props.location.search === '') {
      this.props.history.push('/')
      return;
    }

    if (this.props.location.search !== '') {
      this.decryptSharingURL(this.props.location.search);
    } else {
      this.fetchMyWishlistData(myWishlistAPI);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (getCookie('isLoggedIn') !== 'true') {
      this.props.history.push('/')
      return;
    }
   
    if (nextProps.wishlistUpdatedCount !== this.props.wishlistUpdatedCount) {
      this.fetchMyWishlistData(myWishlistAPI);
    }
    if (nextProps.removeWishlistFlag) {
   
      this.setState({
        wishlistPopup: this.wishlistPopupItem(),
      });
      this.props.resetRemoveFromWishlistFlag(false);
    }
  }

  wishlistPopupItem() {
    setTimeout(() => {
      this.setState({
        wishlistPopup: null,
      });
    }, 2000);
    return (
      <div className="removeFromWishlist clearfix">
        <span className="wishlist-text">{PRODUCT_REMOVED}</span>
      </div>
    );
  }

  MoveToCartPopUpItem() {
    setTimeout(() => {
      this.setState({
        moveToCartPOPup: null,
      });
    }, 2000);
    this.setState({
      moveToCartPOPup: <div className="removeFromWishlist clearfix">
        <span className="wishlist-text">Product added to cart</span>
        <Link to='/cart'>
        <button className="view-btn" >
          View
        </button>
        </Link>
      </div>
    })

  }

  fetchMyWishlistData(APIURL) {
    apiManager
      .get(APIURL, {})
      .then(response => {
        this.setState({
          wishlistData: [],
        });
        this.setState({
          wishlistData: response.data.data.wishlistData,
          guestAccessKey: response.data.data.guestAccessKey,
          externalIdentifier: response.data.data.externalIdentifier,
          isLoading: true,
        });
        this.shareURLFormation(response.data.data.wishlistData.length);
      })
      .catch(error => {
        this.setState({
          error: error.message,
          isLoading: false,
        });
      });
  }

  shareURLFormation(wishlistCount) {
    const shareURL = `${window.location.href}?`;
    const parmaURL = `${getCookie('name')}${seperateStr}${
      this.state.guestAccessKey
      }${seperateStr}${this.state.externalIdentifier}`;

    // Encrypt
    const ciphertext = CryptoJS.AES.encrypt(parmaURL, encryptKey).toString();
    this.props.rwdShareWishlistURL(wishlistCount === 0 ? null : shareURL + ciphertext);
    this.setState({
      sharingURL: shareURL + ciphertext,
    });
  }

  decryptSharingURL(urlStr) {
    let finalStr = String(urlStr);
    finalStr = finalStr.substring(1);
    const bytes = CryptoJS.AES.decrypt(finalStr, encryptKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    const dataArr = originalText.split(seperateStr);

    const finalURl = `${shareWishlistAPI}${dataArr[2]}?accesskey=${dataArr[1]}`;
    this.setState({
      isShareWishlist: true,
      userNameS: dataArr[0],
      wishlistAPIURL: finalURl,
    });
    this.fetchMyWishlistData(finalURl);
  }

  onShareClick() {
    this.setState({
      showSocialShare: !this.state.showSocialShare,
    });
  }

  render() {
    const wishlistItem = (
      <>
        <div className="container">
          
          {!isMobile() ? <div className="shaire-headerwrp">
            <h3 className="heading">
              {this.state.isShareWishlist
                ? `${this.state.userNameS}'s wishlist`
                : `My Wishlist`}
            </h3>
            {this.state.isShareWishlist ? null : (
              <button
                className="shire-btn"
                onClick={this.onShareClick.bind(this)}
              >
                <ShareLogo />
                {this.state.showSocialShare ? (
                  <SocialMedia
                    fromWislistPro
                    sharingURLPro={this.state.sharingURL}
                  />
                ) : null}
              </button>
            )}
          </div>: '' }

          <section className="plpCategories">
            <PlpComponent
              plpDataPro={this.state.wishlistData}
              isSearchPathPro={this.props.location.pathname}
              isFromWishlistPro
              showSkuPro
              isShareWishlistPro={this.state.isShareWishlist}
              moveToCartPopUpPro={this.MoveToCartPopUpItem.bind(this)}
            />
          </section>
        </div>
      </>
    );

    const loadingIndicator = (
      <div className="lazyloading-Indicator">
        <img
          id="me"
          className="loadingImg"
          src={require('../../../public/images/plpAssests/lazyloadingIndicator.svg')}
		  alt="Loading"
        />
      </div>
    );

    return (
      <div className="myWishlist">
        {this.state.wishlistPopup}
        {this.state.moveToCartPOPup}
        {!this.state.isLoading ? (
          loadingIndicator
        ) : (
            <div className="myWishlist">
              {this.state.wishlistData.length != 0 ? (
                wishlistItem
              ) : (
                  <>
                    <EmptyWishlist />
                    <BestSeller />
                  </>
                )}
            </div>
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const stateObj = getReleventReduxState(state, 'global');
  const wishlistCount = getReleventReduxState(stateObj, 'wishlistCount');
  const removeFlag = getReleventReduxState(stateObj, 'removeWishlistFlag');
  return {
    wishlistUpdatedCount: wishlistCount,
    removeWishlistFlag: removeFlag,
  };
}

export default connect(
  mapStateToProps,
  { resetRemoveFromWishlistFlag, rwdShareWishlistURL },
)(MyWishlist);
