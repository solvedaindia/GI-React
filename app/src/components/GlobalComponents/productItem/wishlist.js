import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updatetWishListCount } from '../../../actions/app/actions';
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
      isWelcomeBack: false
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
      //alert('Please Login');
      this.setState({ isWelcomeBack: true});
    }
  }

  addToWishlistAPI() {
    const data = {
      sku_id: this.props.uniqueId,
    };
    axios
      .post(addToWishlist, data, {
        headers: { store_id: storeId, access_token: accessToken },
      })
      .then(response => {
        this.setState({
          wishlistCurrentImage: wishlistAddedImg,
          wishlistPopup: this.wishlistPopupItem()
        });
        getUpdatedWishlist(this);
      })
      .catch(error => {
        console.log('newsError---', error);
      });
  }

  removeFromWishlistAPI() {
    const data = {
      wishlist_id: getCookie(wishlistIdCookie),
      giftlistitem_id: getCorrespondingGiftlistId(this.props.uniqueId),
    };
    axios
      .post(removeFromWishlist, data, {
        headers: { store_id: storeId, access_token: accessToken },
      })
      .then(response => {
        console.log('Add wishlit --- ', response.data);
        this.setState({ wishlistCurrentImage: wishListRemovedImg });
        getUpdatedWishlist(this);
        //this.props.updatetWishListCount(6);
      })
      .catch(error => {
        console.log('newsError---', error);
      });
  }

  componentWillReceiveProps() {
    this.setState({ isWelcomeBack: false });
  }

  componentDidMount() {
    this.setState({
      wishlistCurrentImage: this.props.isInWishlistPro
        ? wishlistAddedImg
        : wishListRemovedImg,
    });
  }

  wishlistPopupItem() {
    setTimeout(()=>{
      this.setState({
        wishlistPopup: null
      });
    }, 4000);
    return (
      <div className='addedToWishlist'>
        <span className='textStyle'>Product Added to Wishlist</span>
        <button className='viewTextStyle'>View</button>
      </div>
    )
    
  }

  render() {
    return (
      <>
        {this.state.wishlistPopup}
        <button
          onClick={this.onWishlistClick.bind(this)}
          className="wishlistBtn"
        >
          {this.state.wishlistCurrentImage}
        </button>
        {this.state.isWelcomeBack ? <UserAccInfo fromWishlistPro={true} /> : null}
      </>
    );
  }
}

function mapStateToProps(state) {

  return {
    //default: state.default
  };
}

export default connect(mapStateToProps, { updatetWishListCount })(Wishlist);
//export default Wishlist;
