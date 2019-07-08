import React from 'react';
import CartLogo from '../SVGs/cart';
import '../../../public/styles/cart/emptyCart.scss';
import { isMobile } from '../../utils/utilityManager';
import InstallLogo from '../SVGs/installLogo';
import ExchangeLogo from '../SVGs/exchangeLogo';
import DeliveryLogo from '../SVGs/deliveryLogo';

class EmptyCart extends React.Component {
  render() {
    return (
      <section className="emptyCartContainer">
        {/* left Side info */}
        <div className="emptyCart">
          <h2 className="title">
            <span className="cartBold">Cart</span> is empty :({' '}
          </h2>
          <div className="shopNow">
            {!isMobile ? (
              <CartLogo width={254} height={254} />
            ) : (
              <CartLogo width={68} height={68} />
            )}
            <h2 className="shopHeadLine">There’s nothing in here</h2>
            <p className="info">You haven’t added any items to your yet </p>
            <a className="btn shopBtn">Shop Now</a>
          </div>
        </div>
        {/* Right Side Info */}
        <div className="shopInfo">
          <h2 className="shopTitle">Why shop from us</h2>
          <ul className="keyPoints">
            <li className="detailCard">
              <DeliveryLogo width={34} height={34} />
              <h3 className="cardHeading">On time delivery</h3>
              <p className="cardInfo">On orders above ₹5000 and above.</p>
              <a href="/help" className="detailLink">
                Details
              </a>
            </li>
            <li className="detailCard">
              <InstallLogo width={34} height={34} />
              <h3 className="cardHeading">Free Installation</h3>
              <p className="cardInfo">On orders above ₹5000 and above.</p>
              <a href="/help" className="detailLink">
                Details
              </a>
            </li>
            <li className="detailCard">
              <ExchangeLogo width={34} height={34} />
              <h3 className="cardHeading">Furniture Exchange</h3>
              <p className="cardInfo">On orders above ₹5000 and above.</p>
              <a href="/help" className="detailLink">
                Details
              </a>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default EmptyCart;
