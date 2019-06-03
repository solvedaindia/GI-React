import React from 'react';

const price = (props) => {
    return(<div className="price">
    <span className='offerprice text'>&#8377;{props.priceData.offerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
    { props.offerPrice < props.actualPrice && (
        <span className='actualprice text'>&#8377;{props.priceData.actualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
    )}
</div>)

};

export default price;