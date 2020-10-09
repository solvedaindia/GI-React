import React from 'react';
import apiManager from '../../utils/apiManager';
import { footerApi } from '../../../public/constants/constants';
import Footer from '../../components/Footer/footer';
import '../../../public/styles/footerContainer/footerContainer.scss';
import FooterMobile from './FooterRWD/index';
import appCookie from '../../utils/cookie';
import { regexEmail, regexMobileNo } from '../../utils/validationManager';

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
    const appId = process.env.envKeys.INTERCOM_KEY || 'rf3dsabc';
    const intercomSettings = {
      app_id: appId,
    };
    const loginId = appCookie.get('loginID');
    if (appCookie.get('isLoggedIn') === 'true') {
      if (regexEmail.test(loginId)) {
        intercomSettings.email = loginId;
      } else if (regexMobileNo.test(loginId)) {
        intercomSettings.email = loginId;
        intercomSettings.phone = loginId;
      }
    }
    window.Intercom('boot', intercomSettings);
  }

  render() 
  {
    this.renderChatBot();
	if(window.location.pathname === '/cart' || window.location.pathname === '/checkout' || window.location.pathname === '/myAccount'
		|| window.location.pathname.includes('/check/payment/') || window.location.pathname.includes('/order/confirm/'))
	{
		return <></>;
	}		
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
        {/* <ContentEspot espotName = { 'GI_PIXEL_FOOTER_END' } /> */}
      </>
    );
  }
}

export default FooterContainer;
