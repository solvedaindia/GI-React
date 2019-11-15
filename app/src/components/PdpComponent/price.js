import React from 'react';
import { formatPrice } from '../../utils/utilityManager';

const price = props => {
  let priceId = 'priceId';
  if (props.sticky) {
      priceId = 'sticyPriceId';
  }
  return(<div className="price" id={priceId}>
    {props.priceData.offerPrice >= 0 && props.priceData.offerPrice && (    
        <h2 className="offerprice text">&#8377;
          {formatPrice(props.priceData.offerPrice)}
        </h2>
    )}
      
    {props.priceData.offerPrice < props.priceData.actualPrice && (      
        <h2 className="actualprice text">&#8377;
          {formatPrice(props.priceData.actualPrice)}
        </h2>
    )}
  </div>);
};

export default price;
