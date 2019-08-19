import React from 'react';

class EmptyMinicart extends React.Component {
  state = {};

  render() {
    return (
      <div className="emptyCart">
        <img className="emptyCartIcon" src={require('../SVGs/emptycart.svg')} />
        <h4 className="heading">Your shopping cart is empty</h4>
        <h4 className="subheading">You haven’t added any items to your cart</h4>
      </div>
    );
  }
}

export default EmptyMinicart;
