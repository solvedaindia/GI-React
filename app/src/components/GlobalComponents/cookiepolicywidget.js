import React from 'react';
import appCookie from '../../utils/cookie';
import CrossIcon from '../SVGs/crossIcons.svg';

class CookiePolicyWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookiePolicy: appCookie.get('isCookiePolicy'),
    };
    this.hideCookiePopup = this.hideCookiePopup.bind(this);
  }

  hideCookiePopup() {
    appCookie.set('isCookiePolicy', 'false', 365 * 24 * 60 * 60 * 1000);
    this.setState({
      cookiePolicy: false,
    });
  }

  render() {
    return (
      <>
        {this.state.cookiePolicy === 'true' && (
          <div className="cookiesPolicySticky">
            <div className="cookiesText">
              We use our own third party cookies to improve your experience and
              our services, and to analyse the use of our website. if you
              continue browsing, we take that to mean that you accept their use.
              <a href="/cookie-policy">Know More</a>
            </div>
            <button className="accept_cookies" onClick={this.hideCookiePopup.bind(this)}>
              Accept
            </button>
            <a onClick={this.hideCookiePopup}>
              <button className="cancelButton">
                <img src={CrossIcon} alt="crossImg" />
              </button>
            </a>
          </div>
        )}
      </>
    );
  }
}

export default CookiePolicyWidget;
