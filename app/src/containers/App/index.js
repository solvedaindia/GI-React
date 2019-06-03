/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import apiManager from '../../utils/apiManager';
import { registerGuestUser, getCurrentTime } from '../../utils/initialManager';
import { getCookie } from '../../utils/utilityManager';
import LoadingIndicator from '../../utils/loadingIndicator';
import {
  guestLoginAPI,
  storeId,
  accessToken,
  accessTokenCookie,
  isLoggedIn,
  getTheAccessToken,
  newsletterTokenCookie,
  newsletterStatusAPI,
} from '../../../public/constants/constants';

// import HomePageContainer from '../HomePageContainer/index';
import HomePageContainer from '../HomePageContainer/homepage';
import HeaderContainer from '../HeaderContainer/index';
import ClpContainer from '../ClpContainer/index';
import PlpContainer from '../PlpContainer/index';
import PdpContainer from '../PdpContainer/pdp';
import FooterContainer from '../FooterContainer/footer';
import RegisterNow from '../../components/RegisterComponent/registerModalData';
import ForgotpassContainer from '../ForgotPasswordContainer/forgotpassword';
import NewsletterModel from '../../components/NewsletterModel/newsletterModel';
import CompareContainer from '../comparePageContainer/index'
import CheckoutContainer from '../checkoutContainer/index'
import '../../../public/styles/app.scss';
import MyWishlist from '../../components/MyWishlist/myWishlist';
import client from '../../utils/apiManager';
import AboutUsContainer from '../AboutUsContainer/AboutUs';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 760,
      accessToken: '',
      showNewsLetter: false,
    };
    this.resize = this.resize.bind(this);
    this.guestLoginCallback = this.guestLoginCallback.bind(this);
  }

  componentDidMount() {
    this.initialLoginHandling();
    this.newsletterPopupHandling();
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  initialLoginHandling() {
    const token = getCookie(accessTokenCookie);
    if (token != '') {
      this.setState({ accessToken: token });
    } else {
      /* Check if User is logged-in or Guest */
      if (isLoggedIn) {
      } else {
        registerGuestUser(this.guestLoginCallback);
      }
    }
  }

  newsletterPopupHandling() {
    console.log('NewsletterCookie---', getCookie(newsletterTokenCookie));
    if (
      getCookie(newsletterTokenCookie) &&
      getCookie(newsletterTokenCookie) != null
    ) {
      this.setState({ showNewsLetter: false });
    } else {
      // this.setState({ showNewsLetter: true });
      // Hit api if NewsletterCookie is null/Empty
      // If yes -> Don't show the Popup
      // If No -> Show the Pop UP
      console.log('In the new');
      this.getNewsletterSubscriptionStatus();
      // this.setState({ showNewsLetter: true });
    }
  }

  getNewsletterSubscriptionStatus() {
    apiManager
      .get(newsletterStatusAPI)
      .then(response => {
        console.log(
          'Newsletter status: ',
          response.data.data.alreadySubscribed,
        );
        if (!response.data.data.alreadySubscribed) {
          this.setState({ showNewsLetter: true });
        }
      })
      .catch(error => {});
  }

  guestLoginCallback(token) {
    if (token != '') {
      getTheAccessToken(token);
      this.setState({ accessToken: token });
      this.getNewsletterSubscriptionStatus();
    } else {
    }
  }

  resize() {
    this.setState({ isMobile: window.innerWidth <= 760 });
  }

  render() {
    if (this.state.accessToken === '') {
      return <LoadingIndicator />;
    }

    let newsletterItem;
    if (this.state.showNewsLetter) {
      newsletterItem = <NewsletterModel />;
    } else {
      newsletterItem = null;
    }

    const { isMobile } = this.state;
    return (
      <div>
        <Helmet titleTemplate="%s - Godrej" defaultTitle="Godrej">
          <meta name="description" content="A Godrej application" />
        </Helmet>
        {newsletterItem}
        <HeaderContainer />
        <Switch>
          <Route exact path="/" component={HomePageContainer} />
          <Route exact path="/about-us" component={AboutUsContainer} />
          <Route path="/clp" component={ClpContainer} />
          <Route path="/plp" component={PlpContainer} />
          <Route path="/pdp/:skuId" component={PdpContainer} />
          <Route path="/forgotpassword" component={ForgotpassContainer} />
          <Route path="/register" component={RegisterNow} />
          <Route path="/compare" component={CompareContainer} />
          <Route path="/wishlist" component={MyWishlist} />
          <Route path="/checkout" component={CheckoutContainer} />
        </Switch>
        <FooterContainer />
      </div>
    );
  }
}
