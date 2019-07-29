import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import { bankEmiApi } from '../../../public/constants/constants';

class TermsAndCondition extends React.Component {
	constructor() {
		super();

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false,
		}
	}

	getTNCData() {
		apiManager
		.get(bankEmiApi + this.props.netAmount)
		.then(response => {
			const { data } = response || {};
			const bsData = data && data.data;
			this.setState({
			bestSellerData: (is(bsData, 'Object') && bsData) || {},
			isLoading: false,
			});
		})
		.catch(error => {
			this.setState({
			error,
			isLoading: false,
			});
			console.log('Best Seller ERROR');
		});
		console.log('ERROR');
	}
	
	componentDidMount() {
	this.getTNCData();
	}

	/* Handle Modal Close */
	handleClose() {
		this.setState({ show: false });
	}

	/* Handle Modal Show */
	handleShow() {
		this.setState({ show: true });
	}

	render () {
		return (
			<>
				<a className='emiDetails'  onClick={this.handleShow}>Know More</a>
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
												<td>PLANS<br/><div class="subText">(Months)</div></td>
												<td>EMI<br/><div class="subText">(Payable to provider)</div></td>
												<td>ANNUAL INTEREST<br/><div class="subText">(Charged by provider)</div></td>
												<td>TOTAL COST<br/><div class="subText">(Payable to provider)</div></td>
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

export default TermsAndCondition;