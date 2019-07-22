import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';

class TermsAndCondition extends React.Component {
	constructor() {
		super();
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false,
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
				<a className='emiDetails'  onClick={this.handleShow}>T&C Apply</a>
				<Modal className='modal_emiInstallment' show={this.state.show} onHide={this.handleClose}>
					<Modal.Body>
						<Button className="close" onClick={this.handleClose}></Button>
						<Row>
							<Col xs={12} md={12}>
								<div className='emi_modal'>
									<div dangerouslySetInnerHTML={{ __html: this.props.espotPromo.data.content }} />
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