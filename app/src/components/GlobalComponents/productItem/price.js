import React from 'react';
import { Link, Route } from 'react-router-dom';

class Price extends React.Component {
  render() {
    console.log('Priceee --- ',this.props)
    const offerPrice = parseFloat(this.props.offerPrice);
    const actualPrice = parseFloat(this.props.actualPrice);
    let crossPriceItem;

    if (offerPrice < actualPrice) {
      crossPriceItem = <span className="priceno-discount">₹{actualPrice}</span>;
    }

    return (
      <>
        <span className="discount-price">₹{offerPrice}</span> {crossPriceItem}
      </>
    );
  }
}

export default Price;
