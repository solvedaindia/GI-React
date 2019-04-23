import React from 'react';

class Promotions extends React.Component {
  render() {
    let promotionItem = null;
    if (this.props.data !== null) {
      promotionItem = (
        <span className="free-accessories"> {this.props.data}</span>
      );
    }
    
    return (
      <p className="emi-text text">
         <span className="free-accessories"> EMI Starting from ₹399 </span> {/* {promotionItem} */}
        <span className="bold">10% Off</span> Free accessories
      </p>
    );
  }
}

export default Promotions;
