import React from 'react';
import { bool } from 'prop-types';

function inStock(isInStock) {
  if (!isInStock.isInStock && isInStock.isInStock !== '') {
    return <button className="btn-outofStock">Out of Stock</button>;
  }
  return null;
}

export default inStock;
