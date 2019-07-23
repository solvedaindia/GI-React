import React from 'react';
import { Col } from 'react-bootstrap';
import SocialMedia from '../../utils/socialMedia';
import Wishlist from '../GlobalComponents/productItem/wishlist';
import { getOnlyWishlistUniqueIds } from '../../utils/utilityManager';
import { isMobile } from '../../utils/utilityManager';
const shareImg = <img src={require('../../../public/images/share.svg')} />;

const wishListAndShare = props => {
    const wishlistArr = getOnlyWishlistUniqueIds();
    console.log('propspropsprops', props);
    return(
        <Col md={5} sm={6} xs={12} className="product-share">
            <div className="share">
            {!isMobile() ? <>SHARE</> :''} <div className="share-btn">{shareImg}</div>
                <SocialMedia
                    productName={props.skuData.productName}
                />
            </div>
            <div className="wishListDiv">
                {!isMobile() ? <>WISHLIST</>:''}{' '}
                <Wishlist
                    uniqueId={props.skuData.uniqueID}
                    isInWishlistPro={wishlistArr.includes(
                        props.skuData.uniqueID,
                    )}
                    isPDP={true}
                    history={props.historyData}
                />
            </div>
        </Col>
    );
};
export default wishListAndShare;
