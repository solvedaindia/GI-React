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

const wishlistAddedImg = (
  <img
    src={require('../../../../public/images/plpAssests/wishlist_added.svg')}
  />
);
const wishListRemovedImg = (
  <img
    src={require('../../../../public/images/plpAssests/wishlist_blank.svg')}
  />
);
class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistCurrentImage: wishListRemovedImg,
      wishlistPopup: null,
      isWelcomeBack: false,
    };
  }

  onWishlistClick() {
    const wishlistArr = getOnlyWishlistUniqueIds();

    console.log('isWishlist Added --- ', this.props.isInWishlistPro);
    if (getCookie('isLoggedIn') === 'true') {
      if (wishlistArr.includes(this.props.uniqueId)) {
        this.removeFromWishlistAPI();
      } else {
        this.addToWishlistAPI();
      }
    } else {
      // Show login Pop up
      // alert('Please Login');
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
        const data = getUpdatedWishlist(this);
      if(data) {
        this.setState({
          wishlistCurrentImage: wishlistAddedImg,
          wishlistPopup: this.wishlistPopupItem(),
        });
      }
      })
      .catch(error => {
        console.log('newsError---', error);
      });
  }

  removeFromWishlistAPI() {
    // console.log('isFromWishlistDDDD --- ',this.props.isFromWishlistPro);
    // return;
    const data = {
      wishlist_id: getCookie(wishlistIdCookie),
      giftlistitem_id: getCorrespondingGiftlistId(this.props.uniqueId),
    };
    apiManager
      .post(removeFromWishlist, data)
      .then(response => {
        console.log('Add wishlit --- ', this.props);
        this.setState({ wishlistCurrentImage: wishListRemovedImg });
        getUpdatedWishlist(this);
        
        if (this.props.isFromWishlistPro === true) {
          this.props.resetRemoveFromWishlistFlag(true)
        }
        
        // this.props.updatetWishListCount(6);
      })
      .catch(error => {
        console.log('newsError---', error);
      });
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   isWelcomeBack: false,
    //   wishlistCurrentImage: this.props.isInWishlistPro
    //     ? wishlistAddedImg
    //     : wishListRemovedImg,
    // });
    this.setState({
      isWelcomeBack: false,
      wishlistCurrentImage: nextProps.isInWishlistPro
        ? wishlistAddedImg
        : wishListRemovedImg,
    });
  }

  componentDidMount() {
    this.setState({
      wishlistCurrentImage: this.props.isInWishlistPro
        ? wishlistAddedImg
        : wishListRemovedImg,
    });
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
        >
          View
        </button>
      </div>
    );
  }

  redirectToWishlistPage = () => {
    console.log('its view veiw view veiw');
    this.props.history.push('/wishlist');
  };

  render() {
    return (
      <>
        { !this.props.isPDP &&
          this.state.wishlistPopup
        }
        
        <button
          onClick={this.onWishlistClick.bind(this)}
          className="wishlistBtn"
        >
          {this.state.wishlistCurrentImage}
          { this.props.isPDP &&
            this.state.wishlistPopup
          }
        </button>
        {this.state.isWelcomeBack ? <UserAccInfo fromWishlistPro /> : null}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    // default: state.default
  };
}

export default connect(
  mapStateToProps,
  { updatetWishListCount, resetRemoveFromWishlistFlag},
)(Wishlist);
// export default Wishlist;
