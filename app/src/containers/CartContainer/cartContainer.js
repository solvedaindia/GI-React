import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import {
  getReleventReduxState,
  isMobile,
  formatPrice,
  createPdpURL,
  createSEOPdpURL
} from '../../utils/utilityManager';
import reducer from './reducer';
import saga from './saga';
import appCookie from '../../utils/cookie';
import {getCookie} from '../../utils/utilityManager';
import apiManager from '../../utils/apiManager';
import { getCartDetails } from './action';
import { imagePrefix } from '../../../public/constants/constants';
import EmptyCart from '../../components/Cart/emptyCart';
import Pincode from '../../components/Cart/pincode';
import CartUpdate from '../../components/Cart/updateCart';
import DeleteCartItem from '../../components/Cart/cartDeleteItem';
import MoveToWishList from '../../components/Cart/moveToWishList';
import '../../../public/styles/cart/cartItem.scss';
import GetCartPromo from '../../components/Cart/promotion';
import PromoField from '../../components/Cart/applyPromo';
import MWebLogo from '../../components/SVGs/mWebLogo';
import AppliedPromoCode from '../../components/Cart/appliedPromoCode';
import EmiInfo from '../../components/PdpComponent/emiInfo';
import ExpandIcon from '../../components/SVGs/expandArrow';
import OutOfStockIcon from '../../components/SVGs/outOfStockIcon';
import EMIVal from '../../components/Cart/emiPrice';
import ContentEspot from '../../components/Primitives/staticContent';
import {Helmet} from "react-helmet";
import Pixels from '../../components/Primitives/pixels';
import { cartDeleteItemAPI, addToWishlist } from '../../../public/constants/constants';

import {
  YOUR_CART,
  DO_YOU_HAVE_COUPAN,
  ORDER_SUMMARY,
  CART_TOTAL,
  PRODUCT_DISCOUNT,
  ORDER_DISCOUNT,
  SHIPPING,
  TOTAL,
  PROCEED_TO_CHECK_OUT,
  FREE,
  DELIVERY_BY,
  SHIPPING_CHARGES,
  YOU_SAVED,
  TOTAL_AMOUNT,
  PROCEED,
  ITEMS,
} from '../../constants/app/cartConstants';

class CartDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReply: false,
      abc: false,
    }
    this.addToWishlistApi = this.addToWishlistApi.bind(this);
  }

  componentDidMount() {
    this.props.getCartDetails();
    if(getCookie('isLoggedIn') === 'true' && getCookie('wishListUniqueId') !== undefined && getCookie('wishListUniqueId') !== null && getCookie('wishListUniqueId') !== ''){
			this.addToWishlistApi();
		}
  }

  handleOnClick(e) {
    e.preventDefault();
    this.setState({ showReply: !this.state.showReply })
  }

  addToWishlistApi(){
    const wishlistId = appCookie.get('wishListUniqueId')
		const data = {
			sku_id: wishlistId,
		};
		apiManager
			.post(addToWishlist, data)
			.then(response => {
        appCookie.set('wishListUniqueId', '' , 365 * 24 * 60 * 60 * 1000);
				appCookie.set('saveForLaterClicked', false , 365 * 24 * 60 * 60 * 1000);
        }).catch(error => {
				
		});
  }

  // handleDeleteItem() {
  //     const orderId = appCookie.get('orderItemId');
  //   	const data = {
  //   	orderItemId: orderId,
  //   	};
  //   	apiManager
  //   	.post(cartDeleteItemAPI, data)    	
  //     .then(response => {
  //       appCookie.set('wishListUniqueId', '' , 365 * 24 * 60 * 60 * 1000);
  //       appCookie.set('saveForLaterClicked', false , 365 * 24 * 60 * 60 * 1000);
  //       this.setState({abc: true});
  //     })
  //   	.catch(error => {
    		
  //   	});
  //   }

  render() {
    const { cartData } = this.props;
    if (!cartData) return null;
    let disableCheckout = false;


    let isSaveForLater = appCookie.get('saveForLaterClicked');
    let wishListId = appCookie.get('wishListUniqueId');
    if (isSaveForLater === 'false' && wishListId !== '') {
      // this.addToWishlistApi();
      return (
        <>
        </>
      );
    }

    return (
      !!cartData.cartItems && !!cartData.cartItems.length
        ?
        <>
     <ContentEspot espotName = { 'GI_PIXEL_CART_BODY_START' } />
  <section className='cartDetails'>
    <Helmet>
      <Pixels espotName= {'GI_PIXEL_CART_META'}/>
    </Helmet>
    <div className='cartItem'>
      <div className='cartHeadDetails'>
        {!isMobile() ? <h2 className='title'>{YOUR_CART}<span className='cartCount'>{cartData.cartTotalItems} {ITEMS}</span>
        </h2> : <div className='checkout-top-hedaer'>
          <a href="/" className='mob-header-logo'><MWebLogo width="24" height="24" /></a>
          <h2 className='title'>{YOUR_CART}<span className='cartCount'>({cartData.cartTotalItems} {ITEMS})</span></h2></div> }
              	<Pincode
			  		getCartDetails={this.props.getCartDetails}
        />
      </div>
      <ul className='cartItemList'>
        {cartData.cartItems.map((itemData, index) => {
          let outOfStock = itemData.inventoryStatus !== 'available';
          disableCheckout = !disableCheckout ? outOfStock : disableCheckout;
          return (
            <li className={`prodList${outOfStock ? ' outOfStockList' : ''}`} key={`${index}-pro`}>
              {outOfStock && <div className='outOfStock' />}
              <Link to={createSEOPdpURL(itemData.productName, itemData.shortDescription, itemData.partNumber)}>
				  <figure className='prodImg'>
                  <img className='img' src={`${imagePrefix}${itemData.thumbnail}`} alt={index} />
                  {outOfStock && <div className='outOfStockLogo'><OutOfStockIcon /></div>}
                </figure>
              </Link>
              <div className='prodDetails'>
                <h3 className='prodTitle'>{itemData.productName}</h3>
                <p className='subTitle'>({itemData.shortDescription})</p>
                {!isMobile() && !itemData.freeGift &&
                      <CartUpdate
                        quantity={itemData.quantity}
                        orderItemId={itemData.orderItemId}
                        getCartDetails={this.props.getCartDetails}
                      />}
                <MoveToWishList
                  uniqueID={itemData.uniqueID}
                  orderItemId={itemData.orderItemId}
                  getCartDetails={this.props.getCartDetails}
                />
                {!itemData.freeGift &&
                      <DeleteCartItem
                        orderItemId={itemData.orderItemId}
                        uniqueID={itemData.uniqueID}
                        productName = {itemData.productName}
                        getCartDetails={this.props.getCartDetails}
                      />}
                <p className='delBy'>{DELIVERY_BY}</p>
                <span className='date'>{itemData.deliveryDate}</span>
                {!isMobile() && <span className='price'>₹{formatPrice(itemData.offerPrice)}</span>}
                {!isMobile() && <span className='shipping'>{SHIPPING_CHARGES} {itemData.shippingCharges === 0 ? `${FREE}` : itemData.shippingCharges}</span>}
              </div>
              {!!isMobile() && <div className='quantityPrice'>
                {!itemData.freeGift &&
						<CartUpdate
						  quantity={itemData.quantity}
						  orderItemId={itemData.orderItemId}
						  getCartDetails={this.props.getCartDetails}
						/>}
                <p className='price'>₹{formatPrice(itemData.offerPrice)}</p>
              </div>}
            </li>
			  )})}
      </ul>
    </div>
    <div className='orderSummary'>
      <div className='promotion'>
        {!isMobile() ?
					<>
						<p
						  className='promoMsg'
						  onClick={this.handleOnClick.bind(this)}
						>
						  {DO_YOU_HAVE_COUPAN}<ExpandIcon width={16} height={16}/>
						</p>
						{cartData.promotionCode && cartData.promotionCode.length ?
						  <AppliedPromoCode
						    promoCode = {cartData.promotionCode}
						    getCartDetails={this.props.getCartDetails}
						  /> :
						  this.state.showReply && <PromoField
						    appliedPromoCode = {cartData.promotionCode}
						    orderID={cartData.orderSummary.orderID}
						    getCartDetails={this.props.getCartDetails}
						  />}
					</>:
          cartData.promotionCode && cartData.promotionCode.length ?
            <AppliedPromoCode
              promoCode = {cartData.promotionCode}
              getCartDetails={this.props.getCartDetails}
            /> :
            <PromoField
              appliedPromoCode = {cartData.promotionCode}
              orderID={cartData.orderSummary.orderID}
              getCartDetails={this.props.getCartDetails}
            />
        }
        <GetCartPromo
          appliedPromoCode = {cartData.promotionCode}
          orderID={cartData.orderSummary.orderID}
          getCartDetails={this.props.getCartDetails}
        />
      </div>
      <h2 className='title'>{ORDER_SUMMARY}</h2>
      <div className='summary'>
        <p className='cartTotal'>
          <span className='info'>{CART_TOTAL}</span>
          <span className='val'> ₹{formatPrice(cartData.orderSummary.totalAmount === '' ? '0' : cartData.orderSummary.totalAmount)}</span>
        </p>
        {!!cartData.orderSummary.productDiscount &&
                <p className="prodDisc">
                  <span className='info'>{PRODUCT_DISCOUNT}</span>
                  <span className='val'>- ₹{formatPrice(cartData.orderSummary.productDiscount)}</span>
                </p>
        }
        {!!cartData.orderSummary.orderDiscount &&
                <p className='orderDisc'>
                  <span className='info'>{ORDER_DISCOUNT}</span>
                  <span className='val'>- ₹{formatPrice(cartData.orderSummary.orderDiscount)}</span>
                </p>
        }
        {!!cartData.orderSummary.shippingCharges == '0' ?
          <p className='shipping'>
            <span className='info'>{SHIPPING}</span>
            <span className='val'>{FREE}</span>
            <span className='shippingMsg'>{cartData.orderSummary.shippingMessage}</span>
          </p>
          :
          <p className='shipping'>
            <span className='info'>{SHIPPING}</span>
            <span className='val'>-₹{formatPrice(cartData.orderSummary.shippingCharges)}</span>
          </p>
        }
        <p className={!isMobile() ? 'emiInfo' : 'emiInfo mob-emi-info'}>
          <EMIVal getCartDetails={this.props.getCartDetails} price={cartData.orderSummary.netAmount} />
          <EmiInfo price={cartData.orderSummary.netAmount}/>
        </p>
        {!isMobile() ? <p className='totalAmt'>
          <span className='totalPrice'> {TOTAL}</span>
          <span className='val'>₹{formatPrice(cartData.orderSummary.netAmount)}</span>
          <span className='savingText'>{YOU_SAVED} <span className='savedAmt'>₹{formatPrice(cartData.orderSummary.saving)}</span></span>
        </p>:''}
        {!isMobile() ? (<a id='checkoutBtn' className={`btn btnCheckout ${disableCheckout ? 'disabled oos' : '' }`} href={!disableCheckout ? '/checkout' : ''}>{PROCEED_TO_CHECK_OUT}</a>)
          :
          (<div className="checkout-btn-floater">
            <div className="total-amount"><div className="net-amount-box">₹{formatPrice(cartData.orderSummary.netAmount)}<span className="total-amount-text">{TOTAL_AMOUNT}</span></div></div>
            <div className="proceed-btn"><a id='checkoutBtn' className={`btn-blackbg ${disableCheckout ? 'disabled oos' : '' }`} href={!disableCheckout ? '/checkout' : ''}>{PROCEED}</a></div>
          </div>)}
      </div>
    </div>
  </section>
        <ContentEspot espotName = { 'GI_PIXEL_CART_BODY_END' } />

        </>
        : <EmptyCart />
    )
  }
}



const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'cart');
  return {
    cartData: stateObj,
  };
};

const mapDispatchToProps = dispatch => ({
  getCartDetails: () => dispatch(getCartDetails()),
});

// const withConnect = connect(
//   (state) => ({
//     cartData: getReleventReduxState(state, 'cart')
//   }),
//   {
//     getCartDetails,
//   }
// );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'cart', reducer });
const withSaga = injectSaga({ key: 'cartContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CartDetail);
