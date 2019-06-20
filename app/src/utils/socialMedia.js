import React from 'react';
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

class SocialMedia extends React.Component {
  render() {
    const shareUrl = window.location.href;
    const title = 'Welcome to the Godrej';
    return (
      <div className="social-icon-share">
        <ul>
          <li className='list'>
            <FacebookShareButton url={shareUrl} quote={title}>
            <div className='iconImg'>
            	<FacebookIcon size={26} round />
            </div>
			<div className='labelText'>
				<span className="social-icon-text"> Facebook</span>
			</div>
            </FacebookShareButton>
            
          </li>
          <li className='list'>
            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator=":: "
            >
            <div className='iconImg'>
            	<WhatsappIcon size={26} className='icons' round />
            </div>
            <div className='labelText'>
            	<span className="social-icon-text">Whatsapp</span>
            </div>
            </WhatsappShareButton>
            
          </li>
          <li className='list'>
            <TwitterShareButton url={shareUrl} title={title}>
            <div className='iconImg'>
            	<TwitterIcon size={26} round />
            </div>
            <div className='labelText'>
            	<span className="social-icon-text">Twitter</span>
            </div>    
            </TwitterShareButton>
            
          </li>
          <li className='list'>
            <EmailShareButton url={shareUrl} title={title}>
            <div className='iconImg'>
            	<EmailIcon size={26} round />
            </div>
            <div className='labelText'>
            	<span className="social-icon-text">Mail</span>
            </div>    
            </EmailShareButton>
          </li>
        </ul>
      </div>
    );
  }
}

export default SocialMedia;
