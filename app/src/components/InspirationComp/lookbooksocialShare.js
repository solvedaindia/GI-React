import React from 'react';
import { Col } from 'react-bootstrap';
import SocialMedia from '../../utils/socialMedia';
import MobileSocialMedia from '../../utils/mobileUtils/socialMedia';
import { getOnlyWishlistUniqueIds } from '../../utils/utilityManager';
import { isMobile } from '../../utils/utilityManager';
const shareImg = <img src={require('../../../public/images/share.svg')} alt="Share" />;

const LookbooksocialShare = () => {
    return(
        <Col md={5} sm={6} xs={12} className="product-share">
            <div className="share">
            {!isMobile() ? <>SHARE</> :''} {!isMobile() && <div className="share-btn">{shareImg}</div>}
            {!isMobile() ? (
                <SocialMedia
                />
            ) : (
                <MobileSocialMedia />
            )
            }    
                
            </div>
           
        </Col>
    );
};
export default LookbooksocialShare;
