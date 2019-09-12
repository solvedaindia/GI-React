import React from 'react';
import SubCatImage from './subCatImage';
import { formatPrice } from '../../../utils/utilityManager';
import {STARTING_RS, PRODUCTS} from '../../../constants/app/footerConstants';

const subCatItem = ({ itemData }) => (
    <>
        <div className="featureCarouselbox clearfix">
            <SubCatImage imageData={itemData.thumbnail} uniqueIdPro={itemData.uniqueID} categoryNamePro={itemData.categoryName} />
            <div className="itemtext">
                <div className="leftbox">
                    <div className="bold">{itemData.categoryName}</div>
                    <div className='start_price'>{STARTING_RS + formatPrice(itemData.startPrice)}</div>
                </div>
                <div className="rightbox">{itemData.productCount + " " + PRODUCTS} </div>
            </div>
        </div>
    </>
);

export default subCatItem;