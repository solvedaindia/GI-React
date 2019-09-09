import React from 'react';
import CartLogo from '../SVGs/cart';
import '../../../public/styles/cart/emptyCart.scss';
import { isMobile } from '../../utils/utilityManager';
import InstallLogo from '../SVGs/installLogo';
import ExchangeLogo from '../SVGs/exchangeLogo';
import DeliveryLogo from '../SVGs/deliveryLogo';
import MWebLogo from '../../components/SVGs/mWebLogo';
import {CART } from '../../constants/app/cartConstants';
import {IS_EMPTY } from '../../constants/app/cartConstants';
import {NOT_CHOSEN_ANY_PRODUCT } from '../../constants/app/cartConstants';
import {CLICK_ON_LINK } from '../../constants/app/cartConstants';
import {START_BROWSING } from '../../constants/app/cartConstants';
import {WHY_GODREG_CHOOSE } from '../../constants/app/cartConstants';
import {ON_ORDERS_ABOVE } from '../../constants/app/cartConstants';
import {LEARN_MORE } from '../../constants/app/cartConstants';
import {FURNITURE_EXCHANGE } from '../../constants/app/cartConstants';
import {FREE_INSTALLATION } from '../../constants/app/cartConstants';






class EmptyCart extends React.Component {
  render() {
    return (
      <section className="emptyCartContainer">
        {!!isMobile() ? <div className='checkout-top-hedaer'>
                  <a href="/" className='mob-header-logo'><MWebLogo width="24" height="24" /></a>
                <h2 className='title'> {CART}</h2></div> : '' }

        {/* left Side info */}
        <div className="emptyCart">
          <h2 className="title">
            <span className="cartBold">{CART }</span> {IS_EMPTY }({' '}
          </h2>
          <div className="shopNow">
            {!isMobile() ? <CartLogo width={254} height={254} />
             : 
              <CartLogo width={68} height={68} />
            }
            <h2 className="shopHeadLine">{NOT_CHOSEN_ANY_PRODUCT}</h2>
            <p className="info">{CLICK_ON_LINK}</p>
            <a className="btn shopBtn" href='/'>{START_BROWSING}</a>
          </div>
        </div>
        {/* Right Side Info */}
        <div className="shopInfo">
          <h2 className="shopTitle">{WHY_GODREG_CHOOSE}</h2>
          <ul className="keyPoints">
            <li className="detailCard">
              <DeliveryLogo width={34} height={34} />
              <h3 className="cardHeading">{`Free Delivery & Installation`}</h3>
              <p className="cardInfo">{ON_ORDERS_ABOVE}</p>
            {!isMobile() ? <a href="/support" className="detailLink">
           {LEARN_MORE}
              </a> : ''
            }
            </li>
            <li className="detailCard">
              <InstallLogo width={34} height={34} />
              <h3 className="cardHeading">{FREE_INSTALLATION}</h3>
              <p className="cardInfo">{ON_ORDERS_ABOVE}</p>
              {!isMobile() ? <a href="/support" className="detailLink">
             {LEARN_MORE}
              </a> : ''
            }
            </li>
            <li className="detailCard">
              <ExchangeLogo width={34} height={34} />
              <h3 className="cardHeading">{FURNITURE_EXCHANGE}</h3>
              <p className="cardInfo">{ON_ORDERS_ABOVE}</p>
              {!isMobile() ? <a href="/support" className="detailLink">
              {LEARN_MORE}
              </a> : ''
            }
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default EmptyCart;
