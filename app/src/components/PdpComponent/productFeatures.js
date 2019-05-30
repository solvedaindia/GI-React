import React from 'react';
import { Col,Row } from 'react-bootstrap';
import {
	newMachineUrl,
	store,
  	catalog,
} from '../../../public/constants/constants';

class productFeatures extends React.Component {
	constructor() {
		super();
		this.dataClass = '';
		this.state = {
			selectedTabId:0
		};
	}

	isActive=(id)=> {
		return this.state.selectedTabId === id;
	}

	setActiveTab = (selectedTabId)=> {
		this.setState({ selectedTabId });
	}

	/* show feature images */
	showFeatureImage(divId) {
		const featureImages = document.getElementsByClassName('featureImages');
		const contentElement = document.getElementById(`featureImage_${divId}`);
		for (let i = 0; i < featureImages.length; i++) {
			featureImages[i].classList.remove('dataNotActive');
			featureImages[i].classList.add('dataNotActive');
		}
		contentElement.classList.remove('dataNotActive');
	}

  render() {
		return (  
			<Col md={12} sm={12} xs={12}>
				<div className='PdpFeatures'>
					<div className='featureVertical-tab'>
						<Row>
							<Col md={12} sm={12} xs={12}>
								<div className='headingBox'>
									<h3 className="heading">Features</h3>
								</div>
							</Col>
						</Row>
						<div className='row'>       
							<Col md={6} sm={12} xs={12}> 
								<div className='featureImgbox'>
									{this.props.productFeature.map((imagePath, index) => {
										const fullImagePath = `${newMachineUrl}/${store}/${catalog}${imagePath.imagePath}`;
										this.dataClass = '';
										if (index > 0) {
											this.dataClass = 'dataNotActive';
										}

										return (
											<div
												id={`featureImage_${index}`}
												key={index}
												className={`featureImages ${this.dataClass}`}
											>
												<img src={fullImagePath} />
											</div>
										);
									})}
								</div>     
							</Col>
							<Col md={6} sm={12} xs={12}>
								<ul className='verticalTab'>
									{this.props.productFeature.map((featureData, i) => (
										<li className={ this.isActive(i) ? 'list active':'list' } key={i}
            onClick={() => this.setActiveTab(i) }>
											<a className='link' role="button" onClick={this.showFeatureImage.bind(this, i)}>
												<h3 className="heading">{featureData.title}</h3>
												{featureData.description}
											</a>
										</li>
									))}
								</ul>
							</Col>
						</div>
					</div>
				</div>
			</Col>    
		);
  	}
}

export default productFeatures;
