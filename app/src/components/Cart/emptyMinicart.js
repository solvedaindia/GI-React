import React from 'react';
import {YOUR_SHOPPING_CART_EMPTY } from '../../constants/app/cartConstants';
import {NOT_ADDED_ANY_ITEM } from '../../constants/app/cartConstants';

class EmptyMinicart extends React.Component {
  state = {};

  render() {
    return (
      <div className="emptyCart">
        <img className="emptyCartIcon" src={require('../SVGs/emptycart.svg')} />
        <h4 className="heading">{YOUR_SHOPPING_CART_EMPTY}</h4>
        <h4 className="subheading">{NOT_ADDED_ANY_ITEM}</h4>
      </div>
    );
  }
}

export default EmptyMinicart;
