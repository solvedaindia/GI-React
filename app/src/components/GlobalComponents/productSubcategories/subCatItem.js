import React from 'react';

const subCatItem = ({ itemData }) => (
    <>
        <div className="featureCarouselbox clearfix">
            <div className="Imgbox"> <img className="imgfullwidth" src={itemData.imageSrc} alt="mattresses" /></div>
            <div className="itemtext">
                <div className="leftbox">
                  <div className="bold">{itemData.categoryName}</div>
                  <div className='start_price'>Starting from ₹ {itemData.startPrice}</div>
                </div>
                <div className="rightbox">{itemData.productCount} Products</div>
            </div>
        </div>
    </>
);

export default subCatItem;