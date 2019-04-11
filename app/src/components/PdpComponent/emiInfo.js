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
			<div>
				<Button className='btn-link' onClick={this.handleShow}>
					Know More
				</Button>
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Body>
							<Button className="close" onClick={this.handleClose}>X</Button>
                            <Row>
                                <Col xs={12} md={12}>
                                    <h3>EMI (Easy Installment)</h3>
                                    All the big things you always wanted to buy can be bought in small, instant installments on your Card now. Convert your purchases above Rs.2,500 into manageable EMIs with a call, the click of your mouse or even on-the-go using Citi Mobile. Tailor your flexible repayment schedule to what you are comfortable with. Plus, you save on the higher interest and service charges on credit cards by opting for the smaller interest rates on your EMIs. Choose to PayLite. The right time to save money is always now.
                                </Col>
                            </Row>         
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

export default EmiInfo;