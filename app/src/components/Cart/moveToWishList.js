import React from 'react';
import { connect } from 'react-redux';
import { updatetWishListCount, resetRemoveFromWishlistFlag } from '../../actions/app/actions';
import {
  addToWishlist,
  cartDeleteItemAPI,
} from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import { getCookie } from '../../utils/utilityManager';
import MoveToWishListLogo from '../SVGs/moveToWishlistIcon';
import UserAccInfo from '../UserAccInfo/userAccInfo';
import appCookie from '../../utils/cookie';
import { triggerRemoveFromCartGTEvent } from '../../utils/gtm';

class MoveToWishList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginScreen : false 
    }
    this.handleMoveToWishList = this.handleMoveToWishList.bind(this);
    this.resetCallbackPro = this.resetCallbackPro.bind(this);
  }

  removeFromCart() {
    const data = {
      orderItemId: this.props.orderItemId,
    };
    apiManager
      .post(cartDeleteItemAPI, data)
      .then(() => {
        this.props.getCartDetails();
        triggerRemoveFromCartGTEvent(this.props.itemData, this.props.itemData.quantity);
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }
  
  handleMoveToWishList(e) {
    if (getCookie('isLoggedIn') !== 'true') {
      appCookie.set('saveForLaterClicked', true, 365 * 24 * 60 * 60 * 1000);
      appCookie.set('orderItemId', this.props.orderItemId, 365 * 24 * 60 * 60 * 1000);
      appCookie.set('wishListUniqueId', this.props.uniqueID, 365 * 24 * 60 * 60 * 1000);
      return this.setState({
        loginScreen : true
      })
    }
    const data = {
      sku_id: this.props.uniqueID,
    };
    apiManager
      .post(addToWishlist, data)
      .then(response => {
        this.removeFromCart();
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }
  resetCallbackPro() {
    this.setState ({
      loginScreen : false
    })
  }
  render() {
    return (
      <>
      <div className="moveItem" onClick={this.handleMoveToWishList}>
        <MoveToWishListLogo width={19} height={16} />
      </div>
      {this.state.loginScreen ? <UserAccInfo fromWishlistPro resetCallbackPro={this.resetCallbackPro} /> : null}
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
)(MoveToWishList);
