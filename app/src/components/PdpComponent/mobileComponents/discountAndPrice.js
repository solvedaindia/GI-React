import React from 'react';
import Price from '../price';

const discountAndPrice = props => {
    return(
    <div>
        { props.skuData.discount > 1 &&
        <div className="accessories-offer">
            <div className="offerbg text">{props.skuData.discount}% Off</div>
        </div>
        }
        <Price priceData={props.skuData}/>
    </div>
    );
};
export default discountAndPrice;
