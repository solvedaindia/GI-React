import React from 'react';
import CartLogo from '../SVGs/cart';
import '../../../public/styles/cart/emptyCart.scss';
import { isMobile } from '../../utils/utilityManager';
import InstallLogo from '../SVGs/installLogo';
import ExchangeLogo from '../SVGs/exchangeLogo';
import DeliveryLogo from '../SVGs/deliveryLogo';
import MWebLogo from '../../components/SVGs/mWebLogo';

class EmptyCart extends React.Component {
  render() {
    return (
      <section className="emptyCartContainer">
        {!!isMobile() ? <div className='checkout-top-hedaer'>
                  <a href="/" className='mob-header-logo'><MWebLogo width="24" height="24" /></a>
                <h2 className='title'> Cart</h2></div> : '' }

        {/* left Side info */}
        <div className="emptyCart">
          <h2 className="title">
            <span className="cartBold">Cart</span> is empty :({' '}
          </h2>
          <div className="shopNow">
            {!isMobile() ? <CartLogo width={254} height={254} />
             : 
              <CartLogo width={68} height={68} />
            }
            <h2 className="shopHeadLine">You haven't chosen any products yet</h2>
            <p className="info">Click on the link below to find furniture you won't be able to resist</p>
            <a className="btn shopBtn" href='/'>Start Browsing</a>
          </div>
        </div>
        {/* Right Side Info */}
        <div className="shopInfo">
          <h2 className="shopTitle">Why Choose Godrej Interio</h2>
          <ul className="keyPoints">
            <li className="detailCard">
              <DeliveryLogo width={34} height={34} />
              <h3 className="cardHeading">{`Free Delivery & Installation`}</h3>
              <p className="cardInfo">On orders above ₹5,000 and above.</p>
            {!isMobile() ? <a href="/support" className="detailLink">
            Learn More
              </a> : ''
            }
            </li>
            <li className="detailCard">
              <InstallLogo width={34} height={34} />
              <h3 className="cardHeading">Free Installation</h3>
              <p className="cardInfo">On orders above ₹5,000 and above.</p>
              {!isMobile() ? <a href="/support" className="detailLink">
              Learn More
              </a> : ''
            }
            </li>
            <li className="detailCard">
              <ExchangeLogo width={34} height={34} />
              <h3 className="cardHeading">Furniture Exchange</h3>
              <p className="cardInfo">On orders above ₹5,000 and above.</p>
              {!isMobile() ? <a href="/support" className="detailLink">
              Learn More
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
