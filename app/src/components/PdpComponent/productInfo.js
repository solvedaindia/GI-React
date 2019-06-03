import React from 'react';
import EmiInfo from './emiInfo';
import TermsAndCondition from './termsAndCondition';
import AddToCart from './addToCart';
import Price from './price';

class productInfo extends React.Component {
	constructor() {
		super();
	}

	toggleOffers() {
		let x = document.getElementById('offers');
		if (x.style.display === 'none') {
			x.style.display = 'block';
		} else {
			x.style.display = 'none';
		}
	}

	render() {
		let emidata = this.props.productData.emiData;
		return (
			<>
			<Price priceData={this.props.productData}/>
			<div className="shippingCharge">
				Shipping Charges:{' '}
				<span className="bold">
				{' '}
				&#8377;450 {/* this.props.productData.shipingCharges */}
						</span>
			</div>
			<div className="accessories-offer">
				<div className='offerbg text'> % </div>
				<div className='discount-off text'>{this.props.productData.discount}% OFF & free accessories </div>
				<a className='text viewOffer' role="button" onClick={this.toggleOffers.bind(this)}>View Offer</a>
			</div>
			<div id="offers">
				<ul className='cashoffer-wrapper'>
					{this.props.productData.promotions.map((promotion, i) => (
						<li className='list' key={i}>                                 
							<h4 className='heading'>{promotion.name} </h4>
							{promotion.description} <TermsAndCondition/>                                  
						</li>
						))
					}
				</ul>
			</div>
			{ this.props.productData.offerPrice >= 1500 && (
			<div className="starting-emitext">
				<div className='offerbg text'> <span className='emitext'>EMI</span></div>
				<div className='text'>Starting from </div>
				<div className='text bold'>रु {emidata} </div>                   
				<div className='text'>per month</div>
				<div className='text emiinfo'><EmiInfo price={this.props.productData.offerPrice}/></div>
			</div>
			)}
			<div className='pincode'>
				<div className='PincodeTextdata clearfix'>
					<input className='pincodeVal' type='text' readOnly value='400079' />
					<a className='pincodeEdit' role='button'>Edit</a>
				</div>              
				<div className='soldbyDealers'>Delivery between 6th Jan to 10 Jan</div>
			</div>
			<div className='clearfix'></div>
			<div className="ExperienceProduct">
				Experience this product at{' '}
				<a className='bold' role="button">Vikroli Store (1.5 K.M away)</a>
			</div>
			<AddToCart skuId={this.props.productData.uniqueID} sticky={false} />
			</>
		);
	}
}

export default productInfo;
