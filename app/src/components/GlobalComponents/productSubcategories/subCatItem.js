import React from 'react';
import SubCatImage from './subCatImage';

const subCatItem = ({ itemData }) => (
    <>
        <div className="featureCarouselbox clearfix">
            <SubCatImage imageData={itemData.thumbnail} uniqueIdPro={itemData.uniqueID} />
            <div className="itemtext">
                <div className="leftbox">
                    <h2 className="bold">{itemData.categoryName}</h2>
                    <div className='start_price'>Starting from ₹ {itemData.startPrice}</div>
                </div>
                <div className="rightbox">{itemData.productCount} Products</div>
            </div>
        </div>
    </>
);

export default subCatItem;