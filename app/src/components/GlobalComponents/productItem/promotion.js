import React from 'react';

class Promotions extends React.Component {
  render() {
    let emiItem = null;
    if (this.props.emi !== '') {
      const boldStr = <span className="bold">₹{this.props.emi}</span>
      emiItem = (
        <span className="free-accessories"> EMI Starting from {boldStr}</span>
      );
    }

    let discountAccessoriesItem = null;
    if (this.props.discount !== '') {
      const boldStr = <span className="bold">{this.props.discount}%</span>
      discountAccessoriesItem = (
        <span className="free-accessories">{boldStr} Off {this.props.promoData !== '' && this.props.discount !== '' ? '&' : ''} {this.props.promoData !== '' ? this.props.promoData : null}</span>
      );
    }
    
    return (
      <p className="emi-text text">
         {emiItem}
         {discountAccessoriesItem}
      </p>
    );
  }
}

export default Promotions;
