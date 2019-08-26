import React from 'react';
import apiManager from '../../utils/apiManager';
import { Button, Modal, Row, Col, FormGroup, Form, Label  } from 'react-bootstrap';
import { notifyMeAPI} from '../../../public/constants/constants';
import { regexEmail, validateEmptyObject } from '../../utils/validationManager';
import appCookie from '../../utils/cookie';

class NotifyMe extends React.Component {
	constructor() {
		super();
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false,
			loading: true,
			error: false,
			errorMessage: null,
			msgClass: 'error-msg'
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

	/* Handle Change */
	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value});
	};
	

	  /* Handle Validation */
	  handleValidation(obj, errorType) {
		let isValidate = errorType;
		this.setState({
			errorMessage: null
		});

		if (!validateEmptyObject(obj.email) || !regexEmail.test(obj.email)) {
			this.setState({
				errorMessage: 'Please enter valid Email Id',
				msgClass: 'error-msg'
			});
			isValidate = false;
		}

		return isValidate;
	  }

	    /* Handle Submit */
  handleSubmit = e => {
    e.preventDefault();
    const isValidate = this.handleValidation(this.state, true);

    if (isValidate === false) {
      return false;
    }

	this.callNotifyMeApi();
  };

	/* call bank emi api */
	callNotifyMeApi() {
		const partNumber = this.props.partNumber;
		const data = {
			email_id: this.state.email,
			part_number: partNumber,
			pincode: appCookie.get('pincode')
		};
		apiManager.post(notifyMeAPI, data).then((res) => {
			this.setState({
				errorMessage: res.data.data.message,
				msgClass: 'success-msg'
			});
		}).catch(error => {
			this.setState({
				 errorMessage: error.response.data.error.error_message,
				 msgClass: 'error-msg'
			});
			console.log('Notify API Error---', error.response.data.error.error_message);
		});
	}

	 /* Error Messgae */
	 errorMessage = message => <div className={this.state.msgClass}>{message}</div>;

	render () {
		let errorMessage = null;
		if (this.state.errorMessage) {
			errorMessage = this.errorMessage(this.state.errorMessage);
		  }
		  let btnId = 'stickyBox';
		  if(!this.props.sticky) {
			  btnId = 'box3';
	  	  }
		return (
			<>
				<Button className="btn notifybtn addcartbtn" id={btnId} onClick={this.handleShow}>Notify me when available</Button>
				<Modal className='modal_notify' show={this.state.show} onHide={this.handleClose}>
					<Modal.Body>
						<Button className="close" onClick={this.handleClose}></Button>

						<div className="innerNotify">
						<Row>
							<Col xs={12} md={12}>
								<div className=''>

									<h4 className='heading'>Notify me at this email address</h4>
								</div>
							</Col>
						</Row>       
						<Row>
							<Col xs={12} md={12}>
								<Form>
									<FormGroup>
										<div className="form-div clearfix">
											<Label>Email Address</Label>
											<input
												type="text"
												name="email"
												className="form-control"
												placeholder="Enter Email ID"
												onChange={this.handleChange}
												value={this.state.email}
											/>
											{errorMessage}
										</div>
									</FormGroup>
									<FormGroup className='Submit-form'>
										<Button
											className="btn-block btn-bg"
											onClick={this.handleSubmit}
										>
											Submit
										</Button>
									</FormGroup>
								</Form>
							</Col>
						</Row>     
						</div>
					</Modal.Body>
				</Modal>
			</>
		);
	}
}

export default NotifyMe;