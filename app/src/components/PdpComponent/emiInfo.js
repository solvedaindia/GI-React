import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';

class EmiInfo extends React.Component {
	constructor() {
		super();
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false
		}
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
                                    {/* All the big things you always wanted to buy can be bought in small, instant installments on your Card now. Convert your purchases above Rs.2,500 into manageable EMIs with a call, the click of your mouse or even on-the-go using Citi Mobile. Tailor your flexible repayment schedule to what you are comfortable with. Plus, you save on the higher interest and service charges on credit cards by opting for the smaller interest rates on your EMIs. Choose to PayLite. The right time to save money is always now. */}
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