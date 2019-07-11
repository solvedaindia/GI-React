import React from 'react';

const price = props => {
  let priceId = 'priceId';
  if (props.sticky) {
      priceId = 'sticyPriceId';
  }
  return(<div className="price" id={priceId}>
    {props.priceData.offerPrice && (
      <span className="offerprice text">
        <h2 className="priceText">&#8377;
        {props.priceData.offerPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </h2>
      </span>
    )}

    {props.priceData.offerPrice < props.priceData.actualPrice && (
      <span className="actualprice text">
        <h2>&#8377;
        {props.priceData.actualPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </h2>
      </span>
    )}
  </div>);
};

export default price;
