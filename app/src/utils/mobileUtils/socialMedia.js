import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import {
    FacebookIcon,
    EmailShareButton,
    FacebookShareButton,
    EmailIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TwitterShareButton,
    TwitterIcon,
  } from 'react-share';
  import { getCookie } from '../utilityManager';

class SocialMedia extends React.Component {
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
        let shareUrl = window.location.href;
        let title = 'Welcome to Godrej';
        if (this.props.productName) {
          title = `Found this amazing [${
            this.props.productName
          }] on Godrej Interio! Check it Out.`;
        } else if (this.props.fromWislistPro) {
          title = `Checkout the designs ${getCookie(
            'name',
          )} loves on Godrej Interio!`;
          shareUrl = this.props.sharingURLPro;
        }
		return (
			<>
				<a className='share-btn'  onClick={this.handleShow}>{this.props.shareImage}</a>
				<Modal className='modalSocialIcons' show={this.state.show} onHide={this.handleClose}>
					<Modal.Body>
						<Button className="close" onClick={this.handleClose}></Button>
                        <h2 className='heading'>Share this product</h2>
						<Row>
							<Col xs={12} md={12}>
                                <div className="social-icon-share">
                                    <ul>
                                    <li className="list">
                                        <FacebookShareButton url={shareUrl} quote={title}>
                                        <div className="iconImg">
                                            <FacebookIcon size={20} round />
                                        </div>
                                        <div className="labelText">
                                            <span className="social-icon-text"> Facebook</span>
                                        </div>
                                        </FacebookShareButton>
                                    </li>
                                    <li className="list">
                                        <WhatsappShareButton url={shareUrl} title={title}>
                                        <div className="iconImg">
                                            <WhatsappIcon size={20} className="icons" round />
                                        </div>
                                        <div className="labelText">
                                            <span className="social-icon-text">Whatsapp</span>
                                        </div>
                                        </WhatsappShareButton>
                                    </li>
                                    <li className="list">
                                        <TwitterShareButton url={shareUrl} title={title}>
                                        <div className="iconImg">
                                            <TwitterIcon size={20} round />
                                        </div>
                                        <div className="labelText">
                                            <span className="social-icon-text">Twitter</span>
                                        </div>
                                        </TwitterShareButton>
                                    </li>
                                    <li className="list">
                                        <EmailShareButton url={`${title} ${shareUrl}`}>
                                        <div className="iconImg">
                                            <EmailIcon size={20} round />
                                        </div>
                                        <div className="labelText">
                                            <span className="social-icon-text">Mail</span>
                                        </div>
                                        </EmailShareButton>
                                    </li>
                                    </ul>
                                </div>

							</Col>
						</Row>
					</Modal.Body>
				</Modal>
			</>
		);
	}
}

export default SocialMedia;