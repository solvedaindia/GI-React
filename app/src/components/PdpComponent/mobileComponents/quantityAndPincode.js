import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  updatetMinicart,
  updatetWishListCount,
  resetRemoveFromWishlistFlag,
} from '../../../actions/app/actions';
import NotifyMe from '../notifyMe';
import appCookie from '../../../utils/cookie';
import ExperienceStore from '../experienceStore';
import { isMobile } from '../../../utils/utilityManager';
import ProductInfo from '../productInfo';

import Mapflag from '../../../components/SVGs/mapflag.svg';
const PINCODE_REGEX = /^[1-9][0-9]{0,5}$/;
import {ADD_TO_CART,QUANTITY,NOT_AVAILABLE,ESTIMATED_DELIVERY,FREE} from '../../../constants/app/pdpConstants';

class addToCartComponent extends React.Component {
  constructor(props) {
	super(props);
    this.state = {
      addToCartPopup: null,
      loading: true,
      pincodeVal: appCookie.get('pincode'),
      isEdit: true,
      qtyVal: 1,
      isPincodeValid: true
    };
    this.quantityErrorMessage = false;
    this.deliveryTime = '';
  }

  componentWillReceiveProps() {
    this.quantityErrorMessage = false;
    this.deliveryTime = '';
    this.setState({
      qtyVal: 1,
      isPincodeValid: true
    })
  }

  /* render delivery message */
  renderdeliveryMessage(props) 
  {
      let errorMsg = '';
      if (this.state.isPincodeValid === false) {
        errorMsg = 'Please enter valid pincode';
        return <div className="pincodeNotServiceable">{errorMsg}</div>;
      }

    if (props.pincodeServiceable === false) {
      errorMsg = 'Sorry we currently do not deliver in this area. Please enter another pincode';
      if (props.error) {
        errorMsg = props.error;	
      }
	  return <div className="pincodeNotServiceable">{errorMsg}</div>;
    }
    if(props.inventoryStatus=== 'unavailable')
    {
      this.deliveryTime = '';
		  return <div className="soldbyDealers">{this.deliveryTime}</div>;
    }
	  if (props.deliveryDateAndTime) 
	  {
		this.deliveryTime = 'Delivery by '+props.deliveryDateAndTime;
		return <div className="soldbyDealers">{this.deliveryTime}</div>;
	  }
	  else {
		  return <div className="soldbyDealers">{this.deliveryTime}</div>;
	  }
  }

  /* product quantity increase and decrease */
  productQuantity = type => {
    this.quantityErrorMessage = false;
    const quantity = document.getElementById('quantity').value;
    if (type === false && quantity > 1) {
      this.setState({
        qtyVal: Number(quantity) - Number(1)
      })
        
    } else if (type === true && quantity < 99) {
      this.setState({
        qtyVal: Number(quantity) + Number(1)
      })
    }
  };

  onKeyPress=(event,props, isUpdate)=>
  {
    if(event.key === 'Enter'){
     this.updatePincode(props, isUpdate);
  
    }
  }

  updatePincode(props, isUpdate) {
    if (isUpdate === 'Edit') {
      this.setState({
        isEdit: false
      });
    } else {
      const pincode = document.getElementById('pincodeVal').value;
      if (pincode !== '' && PINCODE_REGEX.test(pincode) && pincode.length === 6) {
        //appCookie.set('pincode', pincode, 365 * 24 * 60 * 60 * 1000);
        appCookie.set('pincodeUpdated', true, 365 * 24 * 60 * 60 * 1000);
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
      return <Button className="btn addcartbtn" disabled>{ADD_TO_CART}</Button>
    } else if (props.inventoryStatus === 'unavailable' && quantity === 1) {
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
        
        {this.state.addToCartPopup}
        
        {isMobile() ?  
          <label className='quantity-text'><b>{QUANTITY}</b></label> : ''}
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
                className="btn qty-input"
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
        </div>
        <ProductInfo
                    productData={this.props.skuData}
                    defAttributes={this.props.defAttributes}
										pinCodeData={this.props.pinCodeData}
										espotPromo={this.props.espotPromo}
                  />
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
                  onKeyPress={(evt)=>this.onKeyPress(evt,this.props, btnName)}
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
              { <div className="shippingCharge">
         {ESTIMATED_DELIVERY}{' '}
          <span className="bold">
            {this.props.pinCodeData.shippingCharge > 0 ? (
            <>
              &#8377;
              {this.props.pinCodeData.shippingCharge}
            </>
            ) : (
              <>{FREE}</>
            )}
          </span>
        </div> }
            </div>
            <div className="clearfix" />
			{ this.props.pinCodeData.experienceStore &&
				<ExperienceStore experienceStore={this.props.pinCodeData.experienceStore} storeText={storeText}/>
			}
			</>
        )}
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
