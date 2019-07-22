import React from 'react';

const price = props => {
  let priceId = 'priceId';
  if (props.sticky) {
      priceId = 'sticyPriceId';
  }
  return(<div className="price" id={priceId}>
    {props.priceData.offerPrice >= 0 && (      
        <h2 className="offerprice text">&#8377;
        {parseInt(props.priceData.offerPrice)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </h2>
      
    )}
      
    {props.priceData.offerPrice < props.priceData.actualPrice && (
      <span className="actualprice text">
        <h2>&#8377;
        {parseInt(props.priceData.actualPrice)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </h2>
      </span>
    )}
  </div>);
};

export default price;
