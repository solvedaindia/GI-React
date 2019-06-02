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
    TwitterIcon
  } from 'react-share';

class SocialMedia extends React.Component {
	constructor() {
		super();

	}

	render () {
		// demo
        const shareUrl = window.location.href;
        //const shareUrl =    'https://www.google.com';

		const title = 'Welcome to the Godrej';

		return (
			<>			<div className='social-icon-share'>
							<ul>
								<li>						
								<FacebookShareButton
									url={shareUrl}
									quote={title}
								>
									<FacebookIcon
									size={26}
									round />
								</FacebookShareButton><span className='social-icon-text'> Facebook</span></li>
                                <li>
								<WhatsappShareButton
									url={shareUrl}
									title={title}
									separator=":: "
									className="Demo__some-network__share-button">
									<WhatsappIcon size={26} round />
								</WhatsappShareButton><span className='social-icon-text'>Whatsapp</span>
								</li>
								<li>
                                <TwitterShareButton
                                    url={shareUrl}
                                    title={title}
                                    className="Demo__some-network__share-button">
                                    <TwitterIcon
                                    size={26}
                                    round />
                                </TwitterShareButton><span className='social-icon-text'>Twitter</span>
								</li>
								<li>
								<EmailShareButton
									url={shareUrl}
									title={title}
									className="Demo__some-network__share-button">
									<EmailIcon
									size={26}
									round />
								</EmailShareButton><span className='social-icon-text'>Mail</span>
								</li>
								</ul>
                                </div>


			</>
		);
	}
}

export default SocialMedia;