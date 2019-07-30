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
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  handleMoveToWishList() {
    if (getCookie('isLoggedIn') !== 'true') {
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
        console.log('@@@@ Cart Wishlist @@@', response.data.data);
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
      <div className="moveItem" onClick={this.handleMoveToWishList}>
        <MoveToWishListLogo width={19} height={16} />
        {this.state.loginScreen ? <UserAccInfo fromWishlistPro resetCallbackPro = {this.resetCallbackPro}/>
        : null }
      </div>
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
)(MoveToWishList);
