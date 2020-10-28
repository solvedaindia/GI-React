import React from "react";
import {
  FacebookIcon,
  EmailShareButton,
  FacebookShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";
import { getCookie } from "./utilityManager";

class SocialMedia extends React.Component {
  render() {
    let shareUrl = window.location.href;
    let title = "Welcome to Godrej";
    if (this.props.productName) {
      title = `Found this amazing ${
        this.props.productName
      } on Godrej Interio! Check it Out.`;
    } else if (this.props.fromWislistPro) {
      title = `Checkout the designs ${getCookie(
        "name"
      )} loves on Godrej Interio!`;
      shareUrl = this.props.sharingURLPro;
    }

    return (
      <div className="social-icon-share">
        <ul>
          <li className="list">
            <FacebookShareButton url={shareUrl} quote={title}>
              <div className="iconImg">
                <FacebookIcon size={26} round />
              </div>
              <div className="labelText">
                <span className="social-icon-text"> Facebook</span>
              </div>
            </FacebookShareButton>
          </li>
          <li className="list">
            <WhatsappShareButton url={shareUrl} title={title}>
              <div className="iconImg">
                <WhatsappIcon size={26} className="icons" round />
              </div>
              <div className="labelText">
                <span className="social-icon-text">Whatsapp</span>
              </div>
            </WhatsappShareButton>
          </li>
          <li className="list">
            <TwitterShareButton url={shareUrl} title={title}>
              <div className="iconImg">
                <TwitterIcon size={26} round />
              </div>
              <div className="labelText">
                <span className="social-icon-text">Twitter</span>
              </div>
            </TwitterShareButton>
          </li>
          <li className="list">
            <EmailShareButton url={`${title} ${shareUrl}`}>
              <div className="iconImg">
                <EmailIcon size={26} round />
              </div>
              <div className="labelText">
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
