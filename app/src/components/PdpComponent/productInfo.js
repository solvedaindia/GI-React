import React from 'react';
import EmiInfo from './emiInfo';
import TermsAndCondition from './termsAndCondition';
import Price from './price';
import { isMobile } from '../../utils/utilityManager';

class productInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: 'dataNotActive'
    }
  }

  toggleOffers() {
	let activeClass;
    if (this.state.isActive === 'dataNotActive') {
		activeClass = 'dataActive';
    } else {
		activeClass = 'dataNotActive';
	}
    this.setState({
      isActive: activeClass
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
        {this.props.pinCodeData.shippingCharge &&
        <div className="shippingCharge">
          Shipping Charges:{' '}
          <span className="bold">
            &#8377;
            {this.props.pinCodeData.shippingCharge}
          </span>
        </div>
        }
        
        <>
		{ showOffer &&
        <div className="accessories-offer">
		 <div className="offerbg text"> % </div>
          <div className="discount-off text">
            { parseInt(this.props.productData.discount) > 1 &&
              <>{parseInt(this.props.productData.discount)}% OFF </>
            }
            { this.props.productData.promotions.length > 0 && this.props.productData.promotions[0].name &&
            <>{parseInt(this.props.productData.discount) > 1 && '& '}{this.props.productData.promotions[0].name}{' '}</>
            }
          </div>
          { this.props.productData.promotions.length > 0 &&
          <a
            className="text viewOffer"
            role="button"
            onClick={this.toggleOffers.bind(this)}
          >
            View Offer
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
                {promotion.description} <TermsAndCondition />
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
                रु {this.props.productData.emiData}{' '}
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
