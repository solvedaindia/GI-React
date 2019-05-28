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
        //const shareUrl = window.location.href;
        const shareUrl =    'https://www.google.com';

		const title = 'Hello This is Demo';

		return (
			<>			
								<FacebookShareButton
									url={shareUrl}
									quote={title}
								>
									<FacebookIcon
									size={32}
									round />
								</FacebookShareButton>Facebook
                                <WhatsappShareButton
									url={shareUrl}
									title={title}
									separator=":: "
									className="Demo__some-network__share-button">
									<WhatsappIcon size={32} round />
								</WhatsappShareButton>Whatsapp
                                <TwitterShareButton
                                    url={shareUrl}
                                    title={title}
                                    className="Demo__some-network__share-button">
                                    <TwitterIcon
                                    size={32}
                                    round />
                                </TwitterShareButton>Twitter

								<EmailShareButton
									url={shareUrl}
									title={title}
									className="Demo__some-network__share-button">
									<EmailIcon
									size={32}
									round />
								</EmailShareButton>Mail


			</>
		);
	}
}

export default SocialMedia;