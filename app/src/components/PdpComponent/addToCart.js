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
import NotifyMe from './notifyMe';
import appCookie from '../../utils/cookie';
import ExperienceStore from './experienceStore';
import { isMobile } from '../../utils/utilityManager';

import Mapflag from '../../components/SVGs/mapflag.svg';

class addToCartComponent extends React.Component {
  constructor(props) {
	super(props);
    this.state = {
      addToCartPopup: null,
      loading: true,
      pincodeVal: appCookie.get('pincode'),
      isEdit: true
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
    if (props.pincodeServiceable === false) {
      let errorMsg = 'Sorry we currently do not deliver in this area. Please enter another pincode';
      if (props.error) {
        errorMsg = props.error;
      }
      return <div className="pincodeNotServiceable">{errorMsg}</div>;
    }
    if (this.deliveryTime === '') {
      if (props.deliveryDateAndTime) {
        this.deliveryTime = 'Delivery between '+props.deliveryDateAndTime;
      }
    }
    return <div className="soldbyDealers">{this.deliveryTime}</div>;
  }

  /* find inventory of the product */
  findInventory = () => {
    setTimeout(() => {	
      let header = document.getElementById("header");
      if(header) {
        header.classList.remove("sticky");
      }
    }, 2000);
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
      const addedProductToCart = appCookie.get('isPDPAddToCart').split(',');
      
      
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

          if (isPDPAddToCart === '') {
            appCookie.set('isPDPAddToCart', appCookie.get('isPDPAddToCart') + this.props.skuData.uniqueID, 365 * 24 * 60 * 60 * 1000);
          } else if(addedProductToCart.indexOf(this.props.skuData.uniqueID) === -1) {
            appCookie.set('isPDPAddToCart', appCookie.get('isPDPAddToCart') + ','+this.props.skuData.uniqueID, 365 * 24 * 60 * 60 * 1000);
          }
          this.props.handleAddtocart(false);
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
      <div className="addedToWishlist dropdownwishlist clearfix">
        <span className="wishlist-text">Product Added to Cart</span>
        <button
          onClick={() => this.props.history.push('/cart')}
          className="view-btn"
        >
          View
        </button>
      </div>
    );
  }

  /* product quantity increase and decrease */
  productQuantity = type => {
    const quantity = document.getElementById('quantity').value;
    if (type === false && quantity > 1) {
      document.getElementById('quantity').value = Number(quantity) - Number(1);
    } else if (type === true && quantity < 99) {
      document.getElementById('quantity').value = Number(quantity) + Number(1);
    }
  };

  updatePincode(props, isUpdate) {
    if (isUpdate === 'Edit') {
      this.setState({
        isEdit: false
      });
    } else {
      const pincode = document.getElementById('pincodeVal').value;
      appCookie.set('pincode', pincode, 365 * 24 * 60 * 60 * 1000);
      this.quantity = 1;
      props.handleAddtocart(true);
      this.setState({
        isEdit: true
      });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /* render buttons */
  renderButton(props, quantity) {
    let btnId = 'stickyBox';
		if(!this.props.sticky) {
			btnId = 'box3';
    }
    
    if(!props.pincodeServiceable || this.props.skuData.offerPrice === "") {
      return <Button className="btn addcartbtn" id={btnId} disabled>Add to Cart</Button>
    } else if (props.inventoryStatus === 'unavailable' && quantity === 1) {
      return <NotifyMe partNumber={this.props.skuData.partNumber} sticky={this.props.sticky} />
    } 
    return <Button className="btn addcartbtn" id={btnId} onClick={this.findInventory} disabled={false}>Add to Cart</Button>
  }

  render() {
  let storeText = 'Store';
  let btnName = 'Update';
  let pincodeFocusId = 'pincodeVal';
	if (this.props.pinCodeData.experienceStore) {
		if (this.props.pinCodeData.experienceStore.length > 2) {
			storeText = 'Stores';
		}
  }

  if (this.state.isEdit === true) {
    btnName = 'Edit';
    pincodeFocusId = '';
  }
	  return (
      <>
        {!this.props.sticky && !this.props.isMobile && (
          <>
            <div className="pincode">
              <div className="PincodeTextdata clearfix">
               <img className="mapflag" src={Mapflag} alt="Mapflag"/>
                <input
                  className="pincodeVal"
                  name="pincodeVal"
                  id="pincodeVal"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.pincodeVal}
                />
                <label htmlFor={pincodeFocusId}
                  className="pincodeEdit"
                  id="edit"
                  role="button"
                  onClick={this.updatePincode.bind(this, this.props, btnName)}
                >
                  {btnName}
                </label>
              </div>
              {this.renderdeliveryMessage(this.props.pinCodeData)}
            </div>
            <div className="clearfix" />
			{ this.props.pinCodeData.experienceStore &&
				<ExperienceStore experienceStore={this.props.pinCodeData.experienceStore} storeText={storeText}/>
			}
			</>
        )}
        {this.state.addToCartPopup}
        
        {isMobile() ?  
          <label className='quantity-text'><b>Quantity</b></label> : ''}
        <div className={isMobile() ? 'addCart quantity-box' : 'addCart'}>
          { !this.props.isMobile && (
          <>
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
          </>
          )}
          { (!isMobile() || this.props.isMobile === true) && this.renderButton(this.props.pinCodeData, this.quantity)}
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
