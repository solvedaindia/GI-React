import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import apiManager from '../../utils/apiManager';
import { getUpdatedMinicartCount } from '../../utils/initialManager';
import {
  addToCart,
  findinventoryAPI,
} from '../../../public/constants/constants';
import {
  updatetMinicart,
  updatetWishListCount,
  resetRemoveFromWishlistFlag,
} from '../../actions/app/actions';
import appCookie from '../../utils/cookie';

class addToCartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addToCartPopup: null,
      loading: true,
      pincodeVal: appCookie.get('pincode'),
    };
    this.quantity = 1;
    this.quantityErrorMessage = false;
    this.deliveryTime = '';
  }

  componentWillReceiveProps() {
    this.quantity = 1;
    this.quantityErrorMessage = false;
    this.deliveryTime = '';
  }

  /* render delivery message */
  renderdeliveryMessage(props) {
    if (!props.pincodeServiceable) {
      let errorMsg = 'Pincode is not serviceable';
      if (props.error) {
        errorMsg = props.error;
      }
      return <div className="pincodeNotServiceable">{errorMsg}</div>;
    }
    if (this.deliveryTime === '') {
      if (props.deliveryDateAndTime) {
        this.deliveryTime = props.deliveryDateAndTime;
      } else {
        this.deliveryTime = 'Delivery between 6th Jan to 10 Jan';
      }
    }
    return <div className="soldbyDealers">{this.deliveryTime}</div>;
  }

  /* find inventory of the product */
  findInventory = () => {
    console.log('this.propsthis.props=>>', this.props);
    const pincode = appCookie.get('pincode');
    let quantity = 1;
    if (document.getElementById('quantity')) {
      quantity = document.getElementById('quantity').value;
    }

    const data = {
      params: {
        partNumber: this.props.skuData.partNumber,
        quantity,
      },
    };

    apiManager
      .get(findinventoryAPI + pincode, data)
      .then(response => {
        this.moveToCartClicked(response.data);
      })
      .catch(error => {
        console.log('findInventory API Error =>', error);
      });
  };

  /* move to cart */
  moveToCartClicked = inventory => {
    if (inventory.data.inventoryStatus === 'unavailable') {
      this.quantityErrorMessage = true;
      this.quantity = document.getElementById('quantity').value;
      this.setState({
        loading: false,
      });
    } else {
      const isPDPAddToCart = appCookie.get('isPDPAddToCart');
      let quantity = '1';
      if (!this.props.sticky) {
        quantity = document.getElementById('quantity').value;
      }

      const data = {
        orderItem: [
          {
            sku_id: this.props.skuData.uniqueID,
            quantity,
          },
        ],
      };

      apiManager
        .post(addToCart, data)
        .then(() => {
          getUpdatedMinicartCount(this);
          this.deliveryTime = inventory.data.deliveryDate;
          this.setState({
            addToCartPopup: this.addToCartPopupItem(),
            loading: false,
          });

          if (isPDPAddToCart === 'false') {
            appCookie.set('isPDPAddToCart', true, 365 * 24 * 60 * 60 * 1000);
            this.props.handleAddtocart(false);
          }
        })
        .catch(error => {
          console.log('AddToCart Error---', error);
        });
    }
  };

  /* add to cart pop */
  addToCartPopupItem() {
    setTimeout(() => {
      this.setState({
        addToCartPopup: null,
      });
    }, 2000);
    return (
      <div className="addedToWishlist clearfix">
        <span className="wishlist-text">Product Added to Cart</span>
      </div>
    );
  }

  /* product quantity increase and decrease */
  productQuantity = type => {
    const quantity = document.getElementById('quantity').value;
    if (type === false && quantity > 1) {
      document.getElementById('quantity').value = Number(quantity) - Number(1);
    } else if (type === true) {
      document.getElementById('quantity').value = Number(quantity) + Number(1);
    }
  };

  notifyMe() {
    alert('Notify me api call');
  }

  updatePincode(props) {
    const pincode = document.getElementById('pincodeVal').value;
    appCookie.set('pincode', pincode, 365 * 24 * 60 * 60 * 1000);
    this.quantity = 1;
    props.handleAddtocart(true);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /* render buttons */
  renderButton(props, quantity) {
    if (!props.pincodeServiceable) {
      return (
        <Button className="btn addcartbtn" disabled>
          Add to Cart
        </Button>
      );
    }
    if (props.inventoryStatus === 'unavailable' && quantity === 1) {
      return (
        <Button className="btn addcartbtn" onClick={this.notifyMe}>
          Notify Me
        </Button>
      );
    }
    return (
      <Button
        className="btn addcartbtn"
        onClick={this.findInventory}
        disabled={false}
      >
        Add to Cart
      </Button>
    );
  }

  render() {
    return (
      <>
        {!this.props.sticky && (
          <>
            <div className="pincode">
              <div className="PincodeTextdata clearfix">
                <input
                  className="pincodeVal"
                  name="pincodeVal"
                  id="pincodeVal"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.pincodeVal}
                />
                <a
                  className="pincodeEdit"
                  id="edit"
                  role="button"
                  onClick={this.updatePincode.bind(this, this.props)}
                >
                  Edit
                </a>
              </div>
              {this.renderdeliveryMessage(this.props.pinCodeData)}
            </div>
            <div className="clearfix" />
            <div className="ExperienceProduct">
              Experience this product at{' '}
              <a className="bold" role="button">
                Vikroli Store (1.5 K.M away)
              </a>
            </div>
          </>
        )}
        {this.state.addToCartPopup}
        <div className="addCart">
          {!this.props.sticky && (
            <>
              <Button
                className="btn"
                onClick={() => this.productQuantity(false)}
              >
                -
              </Button>
              <input
                className="btn"
                id="quantity"
                type="text"
                readOnly
                value={this.quantity}
              />
              <Button
                className="btn"
                onClick={() => this.productQuantity(true)}
              >
                +
              </Button>
            </>
          )}
          {this.renderButton(this.props.pinCodeData, this.quantity)}
          {this.quantityErrorMessage && <div>Quantity is not available</div>}
        </div>
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
  { updatetMinicart, updatetWishListCount, resetRemoveFromWishlistFlag },
)(addToCartComponent);
