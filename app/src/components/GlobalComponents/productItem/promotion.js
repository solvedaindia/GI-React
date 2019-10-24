import React from 'react';
import {EMI_STARTING, PERCENT_OFF} from '../../../constants/app/footerConstants';

class Promotions extends React.Component {
  render() {
    let emiItem = null;
    if (this.props.emi !== '') {
      const boldStr = <span className="bold"> ₹{this.props.emi}</span>
      emiItem = (
        <span className="free-accessories">{EMI_STARTING} {boldStr}</span>
      );
    }

    let discountAccessoriesItem = null;
    if (this.props.discount !== '') {
      const boldStr = <span className="bold">{this.props.discount + PERCENT_OFF}</span>
      discountAccessoriesItem = (
        // <span className="free-accessories">{parseInt(this.props.discount) < 2 ? null : boldStr} {this.props.promoData !== '' || this.props.discount !== '' ? '&' : ''} {this.props.promoData !== '' ? this.props.promoData : null}</span>
        <span className="free-accessories">{parseInt(this.props.discount) < 2 ? null : boldStr} {this.props.promoData !== '' && this.props.discount !== '' ? '&' : ''}</span>
      );
    }

    let promoItem = null;
    if (this.props.promoData !== '') {
      promoItem = (
        <span className="free-accessories">{this.props.promoData}</span>
      );
    }
    
    return (
      <p className="emi-text text">
         {emiItem}
         {discountAccessoriesItem} 
         {promoItem}
      </p>
    );
  }
}

export default Promotions;
