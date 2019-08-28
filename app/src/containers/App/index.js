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
  mapKey
} from '../../../public/constants/constants';

import {
 validatePindcode
} from '../../utils/validationManager';

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
import client from '../../utils/apiManager';
import AboutUsContainer from '../aboutUsContainer/index';
import Inspiration from '../InspirationCont/index';
import Kitchens from '../KitchensContainer';
import SteelChefKitchen from '../KitchensContainer/kitchen2';
import InspirationDetails from '../InspirationDetailsContainer/index';
import WardrobesContainer from '../wardrobesContainer';
import privacyPolicy from '../privacyPolicy/index';
import HelpSupport from '../serviceSupportContainer/index';
import TermsConditions from '../termsAndConditions/index';
import CookiePolicy from '../CookiePolicy/index';
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
import Invoice from '../../components/MyAccountComponents/MyOrder/invoice';
import paymentWait from '../../components/checkout/paymentWait';
import StaticPagesList from '../../components/staticPages';
import Geocode from "react-geocode";


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
    this.cookiePolicyPopup();
    window.addEventListener('resize', this.resize);
    this.resize();
    this.getCurrentLocation();
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

  cookiePolicyPopup() {
    if (appCookie.get('isCookiePolicy') !== 'false') {
      appCookie.set('isCookiePolicy', true, 365 * 24 * 60 * 60 * 1000);
    }
  }

  getPincodeData() {
    if (appCookie.get('pincode') === null) {
      apiManager
        .get(ipDataApi)
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

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) {
      Geocode.setApiKey(mapKey);
      Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
        response => {
          const address = response.results[0].formatted_address;
          const data = address.replace(', India', '');
          const postalCode = data.substr(data.length -6);
          if (validatePindcode(postalCode) === true) {
            appCookie.set('pincode', postalCode, 365 * 24 * 60 * 60 * 1000);
          }          
        },
        error => {
          console.error(error);
        }
      );
     }
    }

  checkCookiePolicyPopup() {
    if (appCookie.get('isCookiePolicy') === 'true' && window.location.pathname !== '/') {
      appCookie.set('isCookiePolicy', false, 365 * 24 * 60 * 60 * 1000);
    } 
  }

  checkSearchInput() {
    if (window.location.pathname !== '/search' && document.getElementById("searchInput")) {
      document.getElementById("searchInput").value='';     
      const crossbtn = document.getElementById('clearField');
      if (crossbtn) {
        crossbtn.style.display='none';
      }
    }
  }

  render() {
    if (this.state.accessToken === '') {
      return <LoadingIndicator />;
    }
    this.checkCookiePolicyPopup();
    this.checkSearchInput();
    
    let newsletterItem;
    if (this.state.showNewsLetter) {
      newsletterItem = <NewsletterModel />;
    } else {
      newsletterItem = null;
    }

    const { isMobile } = this.state;
    {console.log("Test URL", window.location)}
    return (
      <div>
        <Helmet titleTemplate="%s - Godrej" defaultTitle="Godrej">
          <meta name="description" content="A Godrej application" />
        </Helmet>
        {newsletterItem}
        {window.location.pathname.includes('/check/payment/') ? '' : window.location.pathname === '/cart' || window.location.pathname === '/checkout'  ? (
          <LightHeader />
        ) : (
          <HeaderContainer />
        ) }
        {/* {window.location.pathname === '/cart' || window.location.pathname === '/checkout'  ? (
          <LightHeader />
        ) : (
          <HeaderContainer />
        )} */}
        
        {/* <HeaderContainer /> */}
        <Switch>
          <Route exact path="/" component={HomePageContainer} />
          <Route path="/rooms-:category/:id" component={ClpContainer} />
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
          <Route path='/staticpages' component = {StaticPagesList} />
          <Route path="/termsconditions" component={TermsConditions} />
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Route path="/inspiration" component={Inspiration} />
          <Route path="/kitchens" component={Kitchens} />
          <Route path="/chef-kitchen" component={SteelChefKitchen} />
          <Route path="/lookbook" component={InspirationDetails} />
          <Route path="/wardrobes" component={WardrobesContainer} />
          <Route path="/privacy-policy" component={privacyPolicy} />
          <Route path="/about-us" component={AboutUsContainer} />
          <Route path="/support" component={HelpSupport} />
          <Route path="/invoice/:invoiceId" component={Invoice} />
          <Route path="/check/payment/:orderId" component={paymentWait} />
          
        </Switch>
        {window.location.pathname === '/cart' || window.location.pathname === '/checkout' || window.location.pathname === '/myAccount'|| window.location.pathname.includes('/check/payment/') ? '' : <FooterContainer /> }
      </div>
    );
  }
}
