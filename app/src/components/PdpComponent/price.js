import React from 'react';

const price = (props) => {
    let priceId = 'priceId';
    if (props.sticky) {
        priceId = 'sticyPriceId';
    }
    return(
    <div className="price">
        { props.priceData.offerPrice && (
        <span className='discount-price' id={priceId}>&#8377;{props.priceData.offerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        )}
        
        { props.priceData.offerPrice < props.priceData.actualPrice && (
            <span className='priceno-discount'>&#8377;{props.priceData.actualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        )}
    </div>
)
};

export default price;