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
        {this.state.cookiePolicy === 'true' && /*window.location.pathname.length==1 &&*/ (
          <div className="cookiesPolicySticky">
            <div className="cookiesText">
            We use cookies to improve your experience. If you continue browsing, you agree to our use of cookies.
              <a href="/privacy-policy">Read More</a>
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
