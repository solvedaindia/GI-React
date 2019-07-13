import React from 'react';
import apiManager from '../../utils/apiManager';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { bankEmiApi} from '../../../public/constants/constants';

class EmiInfo extends React.Component {
	constructor() {
		super();
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false,
			loading: true,
			error: false,
		}
	}

	componentDidMount() {
		this.callBankEmiApi();
	}

	/* Handle Modal Close */
	handleClose() {
		this.setState({ show: false });
	}

	/* Handle Modal Show */
	handleShow() {
		this.setState({ show: true });
	}

	/* call bank emi api */
	callBankEmiApi() {
		apiManager.get(bankEmiApi + this.props.price).then(response => {
			this.setState({
				bankDetails: response.data,
			  	loading: false,
			});
		}).catch(error => {
			console.log('Emi Info Error---', error);
		});
	}

	/* display tab with data */
	EmiDetailsTab(divId) {
		const tabcontent = document.getElementsByClassName('bankTabcontent');
		const tabData = document.getElementsByClassName('bankTabData');
		const contentElement = document.getElementById(`bankContent_${divId}`);
		const tabElement = document.getElementById(`bankTab_${divId}`);

		for (let i = 0; i < tabcontent.length; i++) {
			tabcontent[i].classList.remove('dataNotActive');
			tabcontent[i].classList.add('dataNotActive');
			tabData[i].classList.remove('active');
		}
		contentElement.classList.remove('dataNotActive');
		contentElement.classList.remove('dataActive');
		tabElement.classList.add('active');
	}

	/* render tab data */
	renderTabData(data) {
		return (
			data.map((tabData, index) => {
				this.activeClass = 'active';
				if (index > 0) {
					this.activeClass = '';
				}

				return (
					<td
						key={index}
						id={`bankTab_${index}`}
						className={`bankTab bankTabData ${this.activeClass}`}
						onClick={() => this.EmiDetailsTab(index)}
					>
						{tabData.bankName}
					</td>
				);
			})
		);
	}

	/* render tab content */
	renderTabContent(data) {
		return (
			data.map((data, index) => {
				this.dataClass = '';

				if (index > 0) {
					this.dataClass = 'dataNotActive';
				}

				let displayContent = '';
				displayContent = data.emiDetails.map((tabContent, id) => (					
					 <tr key={id}>						
							<td>{tabContent.tenure}</td>
							<td>{tabContent.emiValue}</td>
							<td>{tabContent.interestAmount}%</td>
							<td>{tabContent.totalAmount}</td>
					</tr>	
				));

				return (					
					<td colSpan={4} key={index}
						id={`bankContent_${index}`}
						className={`bankTabcontent ${this.dataClass}`}
					>						
						<table className="emiPlans table table-striped" width="100%">{displayContent}</table>
					</td>
					
				);
			})
		);
	}

	render () {
		return (
			<>
				<Button className='btn-knowmore'  onClick={this.handleShow}>Know More</Button>
				<Modal className='modal_emiInstallment' show={this.state.show} onHide={this.handleClose}>
					<Modal.Body>
						<Button className="close" onClick={this.handleClose}></Button>
						<Row>
							<Col xs={12} md={12}>
								<div className='emi_modal'>
								<h4 className='heading'>EMI (Easy Installment)</h4>
									<ul className='emi_list'>
										<li className='list'>Pay for your order in equal monthly installments (EMI), using any one of the payment options in the table below.</li>
										<li className='list'>Your bank will convert the payment done using credit or debit cards into EMI in 3-4 working days.</li>
										<li className='list'>For payments done using credit and debit cards, to make this a No Cost EMI offer, the interest amount will be discounted from the price of your order. Your card will be charged for the item price minus the discounted interest. The total amount you will pay to the bank (excluding GST) will be equal to the price of the item. The bank will charge GST on the interest amount. For payments done using Amazon Pay EMI, the price will not be discounted upfront. Instead, you will not be charged any interest for a No Cost EMI offer.</li>
									</ul>
								{!this.state.loading && (
										<table width="100%" className="emiPlans table table-striped">
											<tr className="tabHeading">
												<td colSpan="4">
													<table className="tableHeading table" width="100%">
														<tr>
														{this.renderTabData(this.state.bankDetails.data.bankEMIDetails)}
														</tr>
													</table>
												</td>
											   
											</tr>
											<tr className="spacing">
												<td className="seprater" colSpan="4">&nbsp;</td>
											</tr>
											
											<tr className='bankEmiList'>
												<td>PLANS</td>
												<td>EMI</td>
												<td>ANNUAL INTEREST</td>
												<td>TOTAL COST</td>
											</tr>
											
											<tr className="banklistdata">
											{this.renderTabContent(this.state.bankDetails.data.bankEMIDetails)}
									        </tr>
									</table>
								)}
								</div>
							</Col>
						</Row>         
					</Modal.Body>
				</Modal>
			</>
		);
	}
}

export default EmiInfo;