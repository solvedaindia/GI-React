import React from 'react';
import { cartGetPromoAPI } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';

class GetCartPromo extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
			promo: null,
			isLoading: false
		};
	}
	componentDidMount() {
		this.handlePromotion();
	}
	handlePromotion() {
		apiManager
		.get(cartGetPromoAPI)
		.then(response => {
			this.setState({
				promo: response.data.data,
				isLoading: false,
			});
			console.log('Promotion Data', response.data.data);
		})
		.catch(error => {
			this.setState({
			error,
			isLoading: false,
			});
		});
	}
	
	render(){
		const { promo } = this.state
		return (
			<ul className='promoList'>
				{!!promo && promo.map((sellerItemData, index) => (
					<li className='promoListItem' key={index}>
						<p className='promoCode'>{sellerItemData.promocode}</p>
						<p className='promoDesc'>{sellerItemData.description}</p>
						<span className='applyPromo'>Apply</span>
					</li>
				))
				} 
			</ul>
		);
	}
}


export default GetCartPromo;