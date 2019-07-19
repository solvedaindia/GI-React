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
  ipDataApi,
} from '../../../public/constants/constants';
import appCookie from '../../utils/cookie';

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
import CompareContainer from '../comparePageContainer/index';
import CheckoutContainer from '../checkoutContainer/index';
import '../../../public/styles/app.scss';
import MyWishlist from '../../components/MyWishlist/myWishlist';
import MyAccount from '../MyAccountContainer/index';
import GuestTrackOrder from '../../components/MyAccountComponents/GuestTrackOrder/guestTrackOrder';
import SearchContainer from '../Search Container/searchContainer';
import OrderConformtion from '../orderConfirmation/index'
// import CartDetail from '../CartContainer/cartContainer';
import CartDetail from '../CartContainer/cartContainer';
import StoreLocator from '../../components/StoreLocator/storeLocator';
import Directions from '../../components/StoreLocator/index';
import LightHeader from '../../components/HeaderComponent/headerL1/lightHeader';
// import CartDetail from '../../components/Cart/cartDetail';
import Invoice from '../../components/MyAccountComponents/MyOrder/invoice1';

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
    this.getPincodeData();
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  initialLoginHandling() {
    const token = getCookie(accessTokenCookie);
    if (token != '') {
      this.setState({ accessToken: token });
    } else {
      /* Check if User is logged-in or Guest */
      // if (isLoggedIn) {
      // } else {
      registerGuestUser(this.guestLoginCallback);
      // }
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

  getPincodeData() {
    if (appCookie.get('pincode') === null) {
      apiManager
        .get(ipDataApi, { headers: { Accept: 'application/json' } })
        .then(response => {
          appCookie.set('pincode', response.data, 365 * 24 * 60 * 60 * 1000);
          console.log('@@@@ IP DATA RESPONSE @@@@@', response.data);
        })
        .catch(error => {
          appCookie.set('pincode', '400079', 365 * 24 * 60 * 60 * 1000);
          console.log(`Pincode APi Error=>> ${error}`);
        });
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
        {window.location.pathname === '/cart' ? (
          <LightHeader />
        ) : (
          <HeaderContainer />
        )}
        
        {/* <HeaderContainer /> */}
        <Switch>
          <Route exact path="/" component={HomePageContainer} />
          <Route path="/rooms:id" component={ClpContainer} />
          <Route path="/furniture:id" component={PlpContainer} />
          <Route path="/pdp/:productId/:skuId" component={PdpContainer} />
          <Route path="/forgotpassword" component={ForgotpassContainer} />
          <Route path="/register" component={RegisterNow} />
          <Route path="/compare" component={CompareContainer} />
          <Route path="/wishlist" component={MyWishlist} />
          <Route path="/myAccount" component={MyAccount} />
          <Route path="/checkout" component={CheckoutContainer} />
          <Route path="/guestTrackOrder" component={GuestTrackOrder} />
          <Route path="/search" component={PlpContainer} />
          <Route path="/order/confirm/:orderId" component={OrderConformtion} />
          <Route path="/cart" component={CartDetail} />
          <Route path="/storelocator" component={StoreLocator} />
          <Route path="/direction/:originLat/:originLng/:destinationLat/:destinationLng" component={Directions} />
          
        </Switch>
        {/* <FooterContainer /> */}
      </div>
    );
  }
}
