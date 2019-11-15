import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import apiManager from '../../utils/apiManager';
import { getUpdatedMinicartCount } from '../../utils/initialManager';
import {
  addToCart,
  findinventoryAPI,
  findMultiProductInventory,
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
import {PRODUCT_ADDED, ADD_TO_CART,NOT_AVAILABLE, NOT_DELIVER} from '../../constants/app/pdpConstants';

import Mapflag from '../../components/SVGs/mapflag.svg';
const PINCODE_REGEX = /^[1-9][0-9]{0,5}$/;

class addToCartComponent extends React.Component {
  constructor(props) {
	super(props);
    this.state = {
      addToCartPopup: null,
      loading: true,
      pincodeVal: appCookie.get('pincode'),
      isEdit: true,
      qtyVal: 1,
      isPincodeValid: true,
      maxQty: false
    };
    this.quantityErrorMessage = false;
    this.deliveryTime = '';
  }

  componentWillReceiveProps() { 
    this.quantityErrorMessage = false;
    this.deliveryTime = '';
    let pinData = appCookie.get('pincode');
    this.setState({
      isPincodeValid: true,
      maxQty: false,
      pincodeVal: pinData
    })
  }

  /* render delivery message */
  renderdeliveryMessage(props) {
    let errorMsg = '';
    if (this.state.isPincodeValid === false) {
       errorMsg = 'Please enter valid pincode';
      return <div className="pincodeNotServiceable">{errorMsg}</div>;
    }
    if (props.pincodeServiceable === false) {
      errorMsg = NOT_DELIVER;
      if (props.error) {
        errorMsg = props.error;
      }
      return <div className="pincodeNotServiceable">{errorMsg}</div>;
    }
    if (this.deliveryTime === '') {
      if (props.deliveryDateAndTime) {
        this.deliveryTime = 'Delivery by '+props.deliveryDateAndTime;
      }
    }
    return <div className="soldbyDealers">{this.deliveryTime}</div>;
  }

  	/* get pincode API params */
	getInventoryApiParams(resolvedSkuData, getQuantity) {
		let partnumber = [];
		let quantity = [];
    let dataParams;
    
		if (resolvedSkuData.itemInThisBundle) {
			resolvedSkuData.itemInThisBundle.map((data) => {
				partnumber.push(data.partNumber);
				quantity.push(data.quantity * getQuantity);
				 dataParams = {
					params: {
            partnumber: partnumber.toString(),
					  quantity: quantity.toString(),
					},
				};
			})
		} else {
      dataParams = {
        params: {
          partNumber: resolvedSkuData.partNumber,
          quantity: getQuantity,
        },
      };
		}
		return dataParams;

	}

  /* find inventory of the product */
  findInventory = () => {
    let callIntertoryAPI;
    if (this.props.skuData.itemInThisBundle) {
      callIntertoryAPI = findMultiProductInventory;
    } else {
      callIntertoryAPI = findinventoryAPI;
    }
  
    setTimeout(() => {	
      let header = document.getElementById("header");
      if(header) {
        // header.classList.remove("sticky");
      }
    }, 2000);
    const pincode = appCookie.get('pincode');
    let quantity = 1;
    if (document.getElementById('quantity')) {
      quantity = document.getElementById('quantity').value;
    }

    const data = this.getInventoryApiParams(this.props.skuData, quantity);

    apiManager
      .get(callIntertoryAPI + pincode, data)
      .then(response => {
        this.moveToCartClicked(response.data);
      })
      .catch(error => {
      });
  };

  /* move to cart */
  moveToCartClicked = inventory => {
    if (inventory.data.inventoryStatus === 'unavailable') {
      this.quantityErrorMessage = true;
      this.setState({
        loading: false,
        qtyVal: document.getElementById('quantity').value
      });
    } else {
      const isPDPAddToCart = appCookie.get('isPDPAddToCart');
      const addedProductToCart = appCookie.get('isPDPAddToCart').split(',');
      
      
      let quantity = '1';
      let data;
      if (!this.props.sticky) {
        quantity = document.getElementById('quantity').value;
      }

      if (this.props.skuData.itemInThisBundle) {
        let orderItem = Array();
        this.props.skuData.itemInThisBundle.map(bundleData => {
          orderItem.push({sku_id: bundleData.uniqueID, quantity: (bundleData.quantity * quantity).toString()})
        });
        data = {
          orderItem
        };
      } else {
        data = {
          orderItem: [
            {
              sku_id: this.props.skuData.uniqueID,
              quantity,
            },
          ],
        };
      }

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
          this.setState({
            maxQty: error.response.data.error.error_message,
         });
        });
    }
  };

  /* add to cart pop */
  addToCartPopupItem() {
    setTimeout(() => {
      this.setState({
        addToCartPopup: null,
        qtyVal: 1
      });
    }, 2000);
    return (
      <div className="addedToWishlist dropdownwishlist clearfix">
        <span className="wishlist-text">{PRODUCT_ADDED}</span>
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
    this.quantityErrorMessage = false;
    
    if (type === false && quantity > 1) {
      this.setState({
        qtyVal: Number(quantity) - Number(1),
        maxQty: false
      })
    } else if (type === true && quantity < 99) {
      this.setState({
        qtyVal: Number(quantity) + Number(1),
        maxQty: false
      })
    }
  };

  updatePincode(props, isUpdate) {
    if (isUpdate === 'Edit') {
      this.setState({
        isEdit: false
      });
    } else {
      const pincode = document.getElementById('pincodeVal').value;
      if (pincode !== '' && PINCODE_REGEX.test(pincode) && pincode.length === 6) {
        appCookie.set('pincode', pincode, 365 * 24 * 60 * 60 * 1000);
        props.handleAddtocart(true);
        this.setState({
          isEdit: true,
          qtyVal: 1,
          isPincodeValid: true,
          pincodeVal: pincode
        });
      } else if (pincode.length < 6) {
        this.setState({
          isPincodeValid: false
        })
      }
    }
  }

  handleChange = e => {
    const val = e.target.value;
    if (val === '' || PINCODE_REGEX.test(val)) {
      this.setState({ [e.target.name]: e.target.value, isEdit: false });
    }
  };

  /* render buttons */
  renderButton(props, quantity) {
    let btnId = 'stickyBox';
		if(!this.props.sticky) {
			btnId = 'box3';
    }

    if(!props.pincodeServiceable || this.props.skuData.offerPrice === "") {
      return <Button className="btn addcartbtn" id={btnId} disabled>{ADD_TO_CART}</Button>
    } else if (props.inventoryStatus === 'unavailable') {
      return <NotifyMe partNumber={this.props.skuData.partNumber} sticky={this.props.sticky} />
    } 
    return <Button className="btn addcartbtn" id={btnId} onClick={this.findInventory} disabled={false}>Add to Cart</Button>
  }

  render() { 
  let storeText = 'store';
  let btnName = 'Update';
  let pincodeFocusId = 'pincodeVal';
	if (this.props.pinCodeData.experienceStore) {
		if (this.props.pinCodeData.experienceStore.length > 2) {
			storeText = 'stores';
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
                value={this.state.qtyVal}
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
          { (!isMobile() || this.props.isMobile === true) && this.renderButton(this.props.pinCodeData, this.state.qtyVal)}
          {this.quantityErrorMessage && <div  className="errorMessage">{NOT_AVAILABLE}</div>}
          { this.state.maxQty !== false && <div className="errorMessage">{this.state.maxQty}</div>}
        </div>
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
  { updatetMinicart, updatetWishListCount, resetRemoveFromWishlistFlag },
)(addToCartComponent);
