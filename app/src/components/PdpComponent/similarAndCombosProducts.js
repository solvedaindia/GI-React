import React from 'react';
import Slider from 'react-slick';
// import '../../../public/styles/slickCustom.scss';

class SimilarCombosProducts extends React.Component {
	constructor() {
		super();
	}

	/* hide and show produts */
	productsType(activeType, deActiveType) {
		const activeEle = document.getElementById(`${activeType}`);
		document.getElementById(`${activeType}Head`).classList.add('active');
		activeEle.classList.remove('dataNotActive');
		activeEle.classList.add('dataActive');

		const deActiveEle = document.getElementById(`${deActiveType}`);
		document.getElementById(`${deActiveType}Head`).classList.remove('active');
		deActiveEle.classList.remove('dataActive');
		deActiveEle.classList.add('dataNotActive');
	}

	getSimilarProducts() {
		
		return(this.props.similarProducts.map((data, index) => {
			const imgUrl = 'https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/product-3.png';
			
			return (
				<li className="productlist" key={index}>
					<div className='imgBox' key={index}>
						<img src={imgUrl}  alt='Img'/>
					</div>
					<div className="product-text">
						<p className='heading text'>{data.productName}</p>
				
						<p className="price text">
							<span className="discount-price">&#8377;{data.offerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
							{ data.offerPrice < data.actualPrice && (
							<span className="priceno-discount">&#8377;{data.actualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
							)}
						</p>
						<p className='emi-text text'>
							<span className='free-accessories'>EMI Starting from <span className='bold'>{data.emiData}</span></span>
							<span className='bold'>{data.discount}% Off </span> on this product
						</p>
					</div>
				</li>
			);
		}));
		
	}

	getComobosProducts() {
		return(this.props.combos.map((data, index) => {
			const imgUrl = 'https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/product-2.png';
			
			return (
				<li className="productlist" key={index}>
					<div className='imgBox' key={index}>
						<img src={imgUrl}  alt='Img'/>
					</div>
					<div className="product-text">
						<p className='heading text'>{data.productName}</p>
				
						<p className="price text">
							<span className="discount-price">&#8377;{data.offerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
							{ data.offerPrice < data.actualPrice && (
							<span className="priceno-discount">&#8377;{data.actualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
							)}
						</p>
						<p className='emi-text text'>
							<span className='free-accessories'>EMI Starting from <span className='bold'>{data.emiData}</span></span>
							<span className='bold'>{data.discount}% Off </span> on this product
						</p>
					</div>
				</li>
			);
		}));
	}

	render() {
		const settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
		};
		return (
			<div className='similarProduct-Wrapper'>
				<h4 className="heading text-center"><a role='button' id='similarHead' className='active' onClick={this.productsType.bind(this, 'similar', 'combos')}>Similar Products</a>&nbsp;&nbsp;&nbsp;<a role='button' id='combosHead' onClick={this.productsType.bind(this, 'combos', 'similar')}>Combos You May Like</a></h4>
				
				<div id='similar' className='dataActive'>
					<ul className='similarProducts'>
						{this.getSimilarProducts()}
					</ul>
				</div>
				<div id='combos' className='dataNotActive'>
					<ul className='similarProducts'>					
						{this.getComobosProducts()}
					</ul>
				</div>
			</div>
		);
	}
}

export default SimilarCombosProducts;
