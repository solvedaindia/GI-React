import React from 'react';
import EmiInfo from './emiInfo';
import TermsAndCondition from './termsAndCondition';
import Price from './price';

class productInfo extends React.Component {
  constructor() {
    super();
  }

  toggleOffers() {
    const offers = document.getElementById('offers');
    if (offers.style.display === 'none') {
      offers.style.display = 'block';
    } else {
      offers.style.display = 'none';
    }
  }

  render() {
    let emiValue = false;
    if (this.props.productData.emiData) {
      emiValue = true;
    }

    return (
      <>
        <Price priceData={this.props.productData} />
        <div className="shippingCharge">
          Shipping Charges:{' '}
          <span className="bold">
            &#8377;
            {this.props.pinCodeData.shippingCharge}
          </span>
        </div>
        <div className="accessories-offer">
          <div className="offerbg text"> % </div>
          <div className="discount-off text">
            {this.props.productData.discount}% OFF & free accessories{' '}
          </div>
          <a
            className="text viewOffer"
            role="button"
            onClick={this.toggleOffers.bind(this)}
          >
            View Offer
          </a>
        </div>
        <div id="offers">
          <ul className="cashoffer-wrapper">
            {this.props.productData.promotions.map((promotion, i) => (
              <li className="list" key={i}>
                <h4 className="heading">{promotion.name} </h4>
                {promotion.description} <TermsAndCondition />
              </li>
            ))}
          </ul>
        </div>
        {this.props.productData.emiData &&
          this.props.productData.offerPrice >= 1500 && (
          <div className="starting-emitext">
              <div className="offerbg text">
                {' '}
                <span className="emitext">EMI</span>
              </div>
              <div className="text">Starting from </div>
              <div className="text bold">
                रु {this.props.productData.emiData}{' '}
              </div>
              <div className="text">per month</div>
              <div className="text emiinfo">
                <EmiInfo price={this.props.productData.offerPrice} />
              </div>
          </div>
        )}
      </>
    );
  }
}

export default productInfo;
