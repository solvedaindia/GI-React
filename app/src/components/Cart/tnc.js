import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import { bankEmiApi } from '../../../public/constants/constants';
import {KNOW_MORE } from '../../constants/app/cartConstants';
import {EMI_EASY_INSTALLATION } from '../../constants/app/cartConstants';
import {PAY_IN_EQUAL_INSTALLMENT } from '../../constants/app/cartConstants';
import {YOUR_BANK_WILL_CONVERT } from '../../constants/app/cartConstants';
import {FOR_PAYMENTS_DONE } from '../../constants/app/cartConstants';
import {PLANS } from '../../constants/app/cartConstants';
import {MONTHS } from '../../constants/app/cartConstants';
import {EMI } from '../../constants/app/cartConstants';
import {PAYABLE_PROVIDER } from '../../constants/app/cartConstants';
import {ANNUAL_INTEREST } from '../../constants/app/cartConstants';
import {TOTAL_COST } from '../../constants/app/cartConstants';






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
		});
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
				<a className='emiDetails'  onClick={this.handleShow}>{KNOW_MORE}</a>
				<Modal className='modal_emiInstallment' show={this.state.show} onHide={this.handleClose}>
					<Modal.Body>
						<Button className="close" onClick={this.handleClose}></Button>
						<Row>
							<Col xs={12} md={12}>
								<div className='emi_modal'>
								<h4 className='heading'>{EMI_EASY_INSTALLATION}</h4>
									<ul className='emi_list'>
										<li className='list'>{PAY_IN_EQUAL_INSTALLMENT}</li>
										<li className='list'>{YOUR_BANK_WILL_CONVERT}</li>
										<li className='list'>{FOR_PAYMENTS_DONE}</li>
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
												<td>{PLANS}<br/><div class="subText">{MONTHS}</div></td>
												<td>{EMI}<br/><div class="subText">{PAYABLE_PROVIDER}</div></td>
												<td>{ANNUAL_INTEREST}<br/><div class="subText">{CHARGED_PROVIDER}</div></td>
												<td>{TOTAL_COST}<br/><div class="subText">{PAYABLE_PROVIDER}</div></td>
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