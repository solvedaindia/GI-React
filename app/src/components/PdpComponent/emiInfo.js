import React from 'react';
import apiManager from '../../utils/apiManager';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { bankEmiApi} from '../../../public/constants/constants';
import {LEARN_MORE,EMI_EASY,TOTAL_COST,PLANS,MONTHS,ANNUAL_INTEREST,CHARGED_PROVIDER,EQUAL_MONTHLY_INSTALLMENT,PAYABLE_PROVIDER,CONVERT_THE_PAYMENT,DEBIT_CARD_PAY} from '../../constants/app/pdpConstants';
import {EMI } from '../../constants/app/cartConstants';

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

	componentWillReceiveProps(nextProps) {
		if(this.props.price !== nextProps.price){
			this.callBankEmiApi(nextProps.price);
		}
	}
	
	componentDidMount() {
		this.callBankEmiApi(this.props.price);
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
	callBankEmiApi(price) {
		apiManager.get(`${bankEmiApi}${price}`).then(response => {
			this.setState({
				bankDetails: response.data,
			  	loading: false,
			});
		}).catch(error => {
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
							<td>{tabContent.rate}%</td>
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
				<Button className='btn-knowmore'  onClick={this.handleShow}>{LEARN_MORE}</Button>
				<Modal className='modal_emiInstallment' show={this.state.show} onHide={this.handleClose}>
					<Modal.Body>
						<Button className="close" onClick={this.handleClose}></Button>
						<Row>
							<Col xs={12} md={12}>
								<div className='emi_modal'>
								<h4 className='heading'>{EMI_EASY}</h4>
									<ul className='emi_list'>
										<li className='list'>{EQUAL_MONTHLY_INSTALLMENT}</li>
										<li className='list'>{CONVERT_THE_PAYMENT}</li>
										<li className='list'>{DEBIT_CARD_PAY}</li>
									</ul>
								{!this.state.loading && (
										<table width="100%" className="emiPlans table table-striped">
											<tr className="tabHeading">
												<td colSpan="4" className='bankNameList'>
													<div class="theadscroll">
													<table className="tableHeading table" width="100%">
														<tr>
														{this.renderTabData(this.state.bankDetails.data.bankEMIDetails)}		
														</tr>
													</table>
													</div>
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

export default EmiInfo;