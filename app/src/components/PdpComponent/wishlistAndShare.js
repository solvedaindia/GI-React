import React from 'react';
import { Col } from 'react-bootstrap';
import SocialMedia from '../../utils/socialMedia';
import MobileSocialMedia from '../../utils/mobileUtils/socialMedia';
import Wishlist from '../GlobalComponents/productItem/wishlist';
import { getOnlyWishlistUniqueIds } from '../../utils/utilityManager';
import { isMobile } from '../../utils/utilityManager';
import { SHARE } from '../../constants/app/pdpConstants';

const shareImg = <img src={require('../../../public/images/share.svg')} alt="Share Wishlist"/>;

const wishListAndShare = props => {
    const wishlistArr = getOnlyWishlistUniqueIds();
    return(
        <Col md={5} sm={6} xs={12} className="product-share">
            <div className="share">
            {!isMobile() ? <>{SHARE}</> :''} {!isMobile() && <div className="share-btn">{shareImg}</div>}
            {!isMobile() ? (
                <SocialMedia
                    productName={props.skuData.productName}
                />
            ) : (
                <MobileSocialMedia productName={props.skuData.productName} shareImage={shareImg}/>
            )
            }    
                
            </div>
            <div className="wishListDiv">
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
