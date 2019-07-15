import React from 'react';
import Price from '../price';

const discountAndPrice = props => {
    return(
    <div>
        <div className="accessories-offer">
            <div className="offerbg text"> % Off</div>
            <div className="discount-off text">
                {props.skuData.discount}
            </div>
        </div>
        <Price priceData={props.skuData}/>
    </div>
    );
};
export default discountAndPrice;
