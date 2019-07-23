import React from 'react';

const price = props => {
  let priceId = 'priceId';
  if (props.sticky) {
      priceId = 'sticyPriceId';
  }
  return(<div className="price" id={priceId}>
    {props.priceData.offerPrice >= 0 && (      
        <h2 className="offerprice text">&#8377;
        {props.priceData.offerPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </h2>
      
    )}
      
    {props.priceData.offerPrice < props.priceData.actualPrice && (      
        <h2 className="actualprice text">&#8377;
        {props.priceData.actualPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </h2>
     
    )}
  </div>);
};

export default price;
