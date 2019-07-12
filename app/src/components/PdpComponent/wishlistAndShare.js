import React from 'react';
import { Col } from 'react-bootstrap';
import SocialMedia from '../../utils/socialMedia';
import Wishlist from '../GlobalComponents/productItem/wishlist';
import { getOnlyWishlistUniqueIds } from '../../utils/utilityManager';
const shareImg = <img src={require('../../../public/images/share.svg')} />;

const wishListAndShare = props => {
    const wishlistArr = getOnlyWishlistUniqueIds();
    console.log('propsData', props);
    return(
        <Col md={6} sm={12} xs={12} className="product-share">
            <div className="share">
                SHARE <div className="share-btn">{shareImg}</div>
                <SocialMedia
                    productName={props.skuData.productName}
                />
            </div>
            <div className="wishListDiv">
                WISHLIST{' '}
                <Wishlist
                    uniqueId={props.skuData.uniqueID}
                    isInWishlistPro={wishlistArr.includes(
                        props.skuData.uniqueID,
                    )}
                />
            </div>
        </Col>
    );
};
export default wishListAndShare;
