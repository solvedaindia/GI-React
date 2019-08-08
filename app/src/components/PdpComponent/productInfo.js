import React from 'react';
import EmiInfo from './emiInfo';
import TermsAndCondition from './termsAndCondition';
import Price from './price';
import { isMobile } from '../../utils/utilityManager';

import Uparrow from '../../components/SVGs/upArrow.svg';
import DownArrow from '../../components/SVGs/downArrow.svg';

class productInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: 'dataNotActive',
      imageArrowSrc: DownArrow,
      imageArrowAlt: 'DownArrow'
    }
  }

  toggleOffers() {
    let activeClass;
    let imgSrc;
    let imgAlt;
    if (this.state.isActive === 'dataNotActive') {
    activeClass = 'dataActive';
    imgSrc = Uparrow;
    imgAlt = 'Uparrow';
    } else {
      activeClass = 'dataNotActive';
      imgSrc = DownArrow;
      imgAlt = 'DownArrow';
	}
    this.setState({
      isActive: activeClass,
      imageArrowSrc: imgSrc,
      imageArrowAlt: imgAlt
    })
  }

  render() {
	let showOffer = false;
	if (this.props.productData.promotions.length > 0 || parseInt(this.props.productData.discount) > 1) {
		showOffer = true;
	}
	
    return (
      <>
        { !isMobile() && <Price priceData={this.props.productData} /> }
        { !isMobile() && <div className="shippingCharge">
          Shipping Charges:{' '}
          <span className="bold">
            {this.props.pinCodeData.shippingCharge > 0 ? (
            <>
              &#8377;
              {this.props.pinCodeData.shippingCharge}
            </>
            ) : (
              <>Free</>
            )}
          </span>
        </div> }
        
        <>
		{ showOffer &&
        <div className="accessories-offer">
		 <div className="offerbg text"> % </div>
          <div className="discount-off text">
            { parseInt(this.props.productData.discount) > 1 &&
              <>{parseInt(this.props.productData.discount)}% OFF </>
            }
            { this.props.productData.promotions.length > 0 && this.props.productData.promotions[0].name &&
            <><span className="free-accessories">{parseInt(this.props.productData.discount) > 1 && '& '}{this.props.productData.promotions[0].name}{' '}</span></>
            }
          </div>
          { this.props.productData.promotions.length > 0 &&
          <a
            className="text viewOffer"
            role="button"
            onClick={this.toggleOffers.bind(this)}
          >
           <span className="">View Offer</span>
           <img className="upArrow" src={this.state.imageArrowSrc} alt={this.state.imageArrowAlt}/>
          </a>
          }
        </div>
		}
        { this.props.productData.promotions.length > 0 &&
        <div id="offers" className={this.state.isActive}>
          <ul className="cashoffer-wrapper">
            {this.props.productData.promotions.map((promotion, i) => (
              <li className="list" key={i}>
                <h4 className="heading">{promotion.name}</h4>
                {promotion.description} <TermsAndCondition espotPromo={this.props.espotPromo} />
              </li>
            ))}
          </ul>
        </div>
        }
        </>
        {this.props.productData.emiData &&
          this.props.productData.offerPrice >= 1500 && (
          <div className="starting-emitext">
              <div className="offerbg text">
                {' '}
                <span className="emitext">EMI</span>
              </div>
              <div className="text">Starting from </div>
              <div className="text bold">
              &#8377;{this.props.productData.emiData}{' '}
              </div>
              <div className="text">per month</div>
              <div className="text emiinfo">
                <EmiInfo price={this.props.productData.offerPrice} />
              </div>
          </div>
        )}
      </>
    );
  }
}

export default productInfo;
