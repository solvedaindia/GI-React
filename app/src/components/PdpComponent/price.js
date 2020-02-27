import React from 'react';
import { isMobile, formatPrice } from '../../utils/utilityManager';
import { TAX_DISCLAIMER } from '../../constants/app/pdpConstants';

const price = props => {
  let priceId = 'priceId';
  if (props.sticky) {
      priceId = 'sticyPriceId';
  }
  return(<><div className="price" id={priceId}>
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
    {isMobile() && <h2 class="tax-disclaimer text">{TAX_DISCLAIMER}</h2>}
  </div>
  {!isMobile() && <div class="tax-disclaimer text">{TAX_DISCLAIMER}</div>}
  </>);
};

export default price;
