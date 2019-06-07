import React from 'react';
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
	render () {
		const shareUrl = window.location.href;
    	const title = 'Welcome to the Godrej';
		return (
			<div className='social-icon-share'>
				<ul>
					<li>						
						<FacebookShareButton url={shareUrl} quote={title}>
							<FacebookIcon size={26} round />
						</FacebookShareButton>
						<span className='social-icon-text'> Facebook</span>
					</li>
					<li>
						<WhatsappShareButton
							url={shareUrl}
							title={title}
							separator=":: "
							className="Demo__some-network__share-button"
						>
							<WhatsappIcon size={26} round />
						</WhatsappShareButton>
						<span className='social-icon-text'>Whatsapp</span>
					</li>
					<li>
						<TwitterShareButton url={shareUrl} title={title}>
							<TwitterIcon size={26} round />
						</TwitterShareButton>
						<span className='social-icon-text'>Twitter</span>
					</li>
					<li>
						<EmailShareButton url={shareUrl} title={title}>
							<EmailIcon size={26} round />
						</EmailShareButton>
						<span className='social-icon-text'>Mail</span>
					</li>
				</ul>
			</div>
		);
	}
}

export default SocialMedia;