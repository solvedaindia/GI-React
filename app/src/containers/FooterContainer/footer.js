import React from 'react';
import apiManager from '../../utils/apiManager';
import { footerApi } from '../../../public/constants/constants';
import Footer from '../../components/Footer/footer';
import '../../../public/styles/footerContainer/footerContainer.scss';
import FooterMobile from './FooterRWD/index';
import ContentEspot from '../../components/Primitives/staticContent';
import appCookie from '../../utils/cookie';

class FooterContainer extends React.Component {
  constructor() {
    super();
    this.callFooterApi = this.callFooterApi.bind(this);
    this.renderChatBot = this.renderChatBot.bind(this);
    this.state = {
      data: {},
      loading: true,
      error: false,
      isMobile: window.innerWidth <= 760,
    };
  }

  componentDidMount() {
    this.callFooterApi();
  }

  callFooterApi() {
    apiManager
      .get(footerApi)
      .then(response => {
        const { data } = response || {};
        this.setState({
          footer: data && data,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  }

  renderChatBot() {
    let userName = 'Godrej Interio';
    let userId = 'divyac@godrej.com';
    if (appCookie.get('name')) {
      userName = appCookie.get('name');
    }
    if (appCookie.get('loginID')) {
      userId = appCookie.get('loginID');
    }
    window.intercomSettings = {
      app_id: "rf3dsabc",
      name: userName, // Full name
      email: userId, // Email address
      created_at: `in ISO 8601: ${Date.now()}`
    };
    (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/rf3dsabc';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
  }

  render() {
    this.renderChatBot();
    if (this.state.isMobile) {
      return (
        <>
          {!this.state.loading && (
            <footer className="footer">
              {!this.state.error &&
                this.state.footer.status === 'success' && (
                  <FooterMobile
                    links={this.state.footer.data.Footer_Links}
                    newsletter={this.state.footer.data.Footer_Newsletter_Data}
                    socialicons={this.state.footer.data.Footer_Social_Data}
                    stores={this.state.footer.data.Footer_StoreLinks}
                    categories={this.state.footer.data.Footer_Categories}
                  />
                )}
            </footer>
          )}
        </>
      );
    } 

    return (
      <>
        {!this.state.loading && (
          <footer className="footer">
            {!this.state.error &&
              this.state.footer.status === 'success' && (
                <Footer
                  links={this.state.footer.data.Footer_Links}
                  newsletter={this.state.footer.data.Footer_Newsletter_Data}
                  socialicons={this.state.footer.data.Footer_Social_Data}
                  stores={this.state.footer.data.Footer_StoreLinks}
                  categories={this.state.footer.data.Footer_Categories}
                />
              )}
          </footer>
        )}
        <ContentEspot espotName = { 'GI_PIXEL_FOOTER_END' } />
      </>
    );
  }
}

export default FooterContainer;
