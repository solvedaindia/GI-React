import React from 'react';
import { bool } from 'prop-types';

function inStock(isInStock) {
    if (isInStock.isInStock !== 'true') {
        return (
            <button className="btn-outofStock">Out of Stock</button>
        )
    }
    else  {
        return (
            null
        )
    }
}

export default inStock;
