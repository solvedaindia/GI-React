import React from 'react';
import { Row, Col } from 'react-bootstrap';

class productDetail extends React.Component {
	constructor() {
		super();
		this.dataClass = '';
		this.activeClass = 'active';
	}

    /* display tab with data */
    productDetailsTab(divId) {
		let tabcontent = document.getElementsByClassName('tabcontent');
		let tabData = document.getElementsByClassName('tabData');
		let contentElement = document.getElementById(divId);
		let tabElement = document.getElementById('tab_'+divId);

        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].classList.remove('dataNotActive');
			tabcontent[i].classList.add('dataNotActive');
			tabData[i].classList.remove('active');
        }
        
        contentElement.classList.remove('dataNotActive');
		contentElement.classList.remove('dataActive');
		tabElement.classList.add('active');
    }

	render () {
        return(
		<div className='product_details'>
			<Row>
				<Col md={12} sm={12} xs={12}>
					<h3 className='heading'> Product Detail</h3>
				</Col>
			</Row>
			<Row>
				<Col md={6} sm={12} xs={12}>
					<div className='product_img'>
					<img className='imgfullwidth' src={this.props.productDetail.imagePath}/>
					</div>
				</Col>
				<Col md={6} sm={12} xs={12}>
					<div className='product_description'>
						{
							this.props.productDetail.description.map((tabData, index) => {
								if (index > 0) {
									this.activeClass = '';
								}
								
								return (
									// <div key={index}>
										<a key={index} id={`tab_${index}`} className={`tab tabData ${this.activeClass}`} onClick={() => this.productDetailsTab(index)}>{tabData.title}</a>
									// </div>
								);
							})
						}						
						{
							this.props.productDetail.description.map((data, index) => {
								if (index > 0) {
									this.dataClass = 'dataNotActive';
								}
								return (
									<div key={index}>
										<div id={index} className={`tabcontent ${this.dataClass}`}>
											{
												data.values.map((tabContent, id) => {
													return (
														<div key={id}>
															<b>{tabContent.name}</b>
															<p>{tabContent.value}</p>
														</div>
													);
												}) 
											}
										</div>
									</div>
								);
							})
						}
					</div>
				</Col>
			</Row>
		</div>
    );
  }
}

export default productDetail;
