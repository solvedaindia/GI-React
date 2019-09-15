import React from 'react';
import { Link, Route } from 'react-router-dom';
import { formatPrice } from '../../../utils/utilityManager';


class Price extends React.Component {
  render() {
    let offerPrice = parseFloat(this.props.offerPrice);
    let actualPrice = parseFloat(this.props.actualPrice);
    let crossPriceItem;

    if (offerPrice < actualPrice) {
      crossPriceItem = <span className="priceno-discount">₹{formatPrice(actualPrice)}</span>;
    }
    if (!isNaN(offerPrice)) {
      offerPrice = `₹${formatPrice(offerPrice)}`
    }
    else {
      offerPrice = null
    }

    return (
      <>
        <span className="discount-price">{offerPrice}</span> {crossPriceItem}
      </>
    );
  }
}

export default Price;
