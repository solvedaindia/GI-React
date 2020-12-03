/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import apiManager from '../../utils/apiManager';
import { registerGuestUser } from '../../utils/initialManager';
import { getCookie, isMobile, isTab } from '../../utils/utilityManager';
import LoadingIndicator from '../../utils/loadingIndicator';
import { createBrowserHistory } from 'history';
import CancelComponents from '../../components/cancelComponents/index';

import {
  accessTokenCookie,
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
import WillowKitchen from '../KitchensContainer/willowKitchen';

import InspirationDetails from '../InspirationDetailsContainer/index';
import WardrobesContainer from '../wardrobesContainer';
import ModularWardrobeDetails from '../wardrobesContainer/details';
import privacyPolicy from '../privacyPolicy/index';
import HelpSupport from '../serviceSupportContainer/index';
import TermsConditions from '../termsAndConditions/index';
import CookiePolicy from '../CookiePolicy/index';
import MyAccount from '../MyAccountContainer/index';
import GuestTrackOrder from '../../components/MyAccountComponents/GuestTrackOrder/guestTrackOrder';
import OrderConformtion from '../orderConfirmation/index';
import CartDetail from '../CartContainer/cartContainer';
import StoreLocator from '../../components/StoreLocator/storeLocator';
import Directions from '../../components/StoreLocator/index';
import LightHeader from '../../components/HeaderComponent/headerL1/lightHeader';
import Invoice from '../../components/MyAccountComponents/MyOrder/invoice';
import paymentWait from '../../components/checkout/paymentWait';
import Geocode from "react-geocode";
import NotFound from '../HomePageContainer/notfound';
import InternetError from '../HomePageContainer/InternetError';
import Maintenance from '../HomePageContainer/Maintenance';
import Shipping from '../shippingContainer/index';
import CookiePopup from '../../components/GlobalComponents/cookiepolicywidget';
import ReactSnackBar from "../HomePageContainer/snackbar/index";
import MWebLogo from '../../components/SVGs/mWebLogo';
import Covid19Awareness from '../../components/Covid19Awareness';
import ServiceRequestFormGuest from '../../components/ServiceRequestFormGuest/index';
import ServiceRequestForm from '../../components/ServiceRequestForm';

const userAgent = window.navigator.userAgent.toLowerCase();
const isIPad = /ipad/.test(userAgent);


// import  {createBrowserHistory} from 'history';
// export const history =createBrowserHistory();

// history.listen(({pathname}) => {
//   shouldScrollLogin && window.scrollTo(0,0)
// });


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 760,
      accessToken: '',
      showNewsLetter: false,
      prevPath: '',
      currPath: '',
      loading: true,
      internetErrorMessage: "",
      showSnackBar: false
    };
    this.resize = this.resize.bind(this);
    this.guestLoginCallback = this.guestLoginCallback.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    if (window.location.pathname === '/internet-error') {
      history.goBack();
    }
    window.addEventListener('resize', this.resize);
    window.addEventListener('load', this.handleLoad);
    window.addEventListener('online', this.onOnline.bind(this));
    window.addEventListener('offline', this.onOffline.bind(this));
    this.initialLoginHandling();
    this.newsletterPopupHandling();
    this.cookiePolicyPopup();
    this.resize();
    this.getCurrentLocation();
    this.getIPData();


  }

  onOnline() {

    this.setState({
      internetErrorMessage: "Internet connected",
      showSnackBar: true
    });


    setTimeout(() => {
      this.setState({
        internetErrorMessage: "",
        showSnackBar: false
      });
    }, 3000);

  }
  onOffline() {

    this.setState({
      internetErrorMessage: "Internet disconnected",
      showSnackBar: true
    });

    setTimeout(() => {
      this.setState({
        internetErrorMessage: "",
        showSnackBar: false
      });
    }, 3000);

  }

  componentWillUnmount() {
    window.removeEventListener('online', this.onOnline.bind(this), false);
    window.removeEventListener('offline', this.onOffline.bind(this), false);
  }

  componentWillMount() {
    if (isMobile() || isTab() || isIPad) {
      $('html, body').animate({ scrollTop: 0 }, 'fast');
    }
  }
  componentWillUpdate() {
    let header = document.getElementById("header");
    let pathurl = window.location.href;
    if (header) {
      header.classList.remove("sticky");
    }

    if (window.location.hash) {
      var element = document.getElementById(window.location.hash.substr(1));
      if (element) {
        element.scrollIntoView();
      }
      else {
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
      }
    }
    else if ((pathurl.includes("sort") || pathurl.includes("filter")) && !(isMobile() || isTab())) {
      $('html, body').stop().animate();
    }
    else if ((pathurl.includes("sort") || pathurl.includes("filter")) && !(isMobile() || isTab())) {
      $('html, body').animate({ scrollTop: 0 }, 'smooth');
    }
    else if ((pathurl.includes("furniture-online"))) {
      window.scrollTo(0, 0);
    }
    else {
      if (!isMobile() && !isTab() && !isIPad) {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
      }
    }
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
      this.getNewsletterSubscriptionStatus();
      // this.setState({ showNewsLetter: true });
    }
  }

  cookiePolicyPopup() {
    if (appCookie.get('isCookiePolicy') !== 'false') {
      appCookie.set('isCookiePolicy', true, 365 * 24 * 60 * 60 * 1000);
    }
  }

  getNewsletterSubscriptionStatus() {
    apiManager
      .get(newsletterStatusAPI)
      .then(response => {
        if (!response.data.data.alreadySubscribed) {
          this.setState({ showNewsLetter: true });
        }
      })
      .catch(error => { });
  }

  guestLoginCallback(token) {
    if (token != '') {
      getTheAccessToken(token);
      this.setState({ accessToken: token });
      this.getNewsletterSubscriptionStatus();
    } else {
    }
  }

  handleLoad() {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substr(1));
      if (element)
        element.scrollIntoView();
    }
  }

  resize() {
    this.setState({ isMobile: window.innerWidth <= 760 });
  }

  // IP Data Call.
  getIPData() {

    if (appCookie.get('pincode') === null || appCookie.get('pincode') === '') {
      appCookie.set('pincode', '400079', 365 * 24 * 60 * 60 * 1000);
      navigator.geolocation.getCurrentPosition(
        function () {
          appCookie.set('pincode', '400079', 365 * 24 * 60 * 60 * 1000);
        }
      );

      navigator.geolocation.watchPosition(function (position) {
        var request = new XMLHttpRequest();
        request.open('GET', ipDataApi);
        request.setRequestHeader('Accept', 'application/json');
        request.send();
        request.onreadystatechange =
          function () {
            if (this.status == 200) {
              var ipData = JSON.parse(this.responseText);
              if (ipData && ipData.postal) {
                var ipDataPostCode = ipData.postal;
                appCookie.set('pincode', ipDataPostCode, 365 * 24 * 60 * 60 * 1000);
              }
              else {
                appCookie.set('pincode', '400079', 365 * 24 * 60 * 60 * 1000);
              }
            }
            else {
              appCookie.set('pincode', '400079', 365 * 24 * 60 * 60 * 1000);
  						//   Geocode.setApiKey(mapKey);
						  //   Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
							//   response => {
							// 	  const address = response.results[0].formatted_address;
							// 	  const data = address.replace(', India', '');
							// 	  const postalCode = data.substr(data.length -6);
							// 	  if (validatePindcode(postalCode) === true && appCookie.get('pincodeUpdated') !== 'true') {
							// 		appCookie.set('pincode', postalCode, 365 * 24 * 60 * 60 * 1000);
							// 		this.setState({
							// 		  loading: false
							// 		})
              //     }
              //     else{
              //       appCookie.set('pincode', '400079', 365 * 24 * 60 * 60 * 1000);
              //     }          
							// 	},
							// 	error => {
							// 		appCookie.set('pincode', '400079', 365 * 24 * 60 * 60 * 1000);
							// 	}
							// )
            }
          };
      },
        function (error) {
          if (error.code == error.PERMISSION_DENIED)
            appCookie.set('pincode', '400079', 365 * 24 * 60 * 60 * 1000);
        });
    }
  }

  getCurrentLocation() {
    // if (appCookie.get('pincode') === null || appCookie.get('pincode') === '') 
    // {
    //    appCookie.set('pincode', '400079', 365 * 24 * 60 * 60 * 1000);
    // }
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(showPosition.bind(this));
    // }
    // function showPosition(position) { }
  }

  checkSearchInput() {
    if (window.location.pathname !== '/search' && document.getElementById("searchInput")) {
      document.getElementById("searchInput").value = '';
      const crossbtn = document.getElementById('clearField');
      if (crossbtn) {
        crossbtn.style.display = 'none';
      }
    }
  }

  render() {
    if (this.state.accessToken === '') {
      return <LoadingIndicator />;
    }
    this.checkSearchInput();

    let newsletterItem;
    if (this.state.showNewsLetter) {
      newsletterItem = <NewsletterModel />;
    } else {
      newsletterItem = null;
    }

    const { isMobile } = this.state;
    return (
      <div>
        {appCookie.get('isCookiePolicy') === 'true' ? <CookiePopup /> : null}
        {newsletterItem}
        {
          window.location.pathname.includes('/check/payment/') ? '' : window.location.pathname === '/cart' || window.location.pathname === '/checkout' ? (
            <LightHeader />
          ) : (
              <HeaderContainer />
            )
        }
        {/* {window.location.pathname === '/cart' || window.location.pathname === '/checkout'  ? (
              <LightHeader />
            ) : (
              <HeaderContainer />
            )} */}

        {/* <HeaderContainer /> */}
	  <div id="mainContainer">
		<LastLocationProvider>
        <Switch>
          <Route exact path="/" component={HomePageContainer} />
		      <Route path="/online-furniture-kitchen" component={Kitchens} />
          <Route path="/online-furniture-chef-kitchen" component={SteelChefKitchen} />
          <Route path="/online-furniture-willow-kitchen" component={WillowKitchen} />
          <Route path="/online-furniture-modular-wardrobes" component={WardrobesContainer} />
          <Route path="/online-furniture-modular-wardrobes-kreation-steel" render={() => <ModularWardrobeDetails identifier="kreation" />} />
          <Route path="/online-furniture-modular-wardrobes-kalista-wooden" render={() => <ModularWardrobeDetails identifier="kalista" />} />
          <Route path="/online-furniture-:id" component={ClpContainer} />
		      <Route path="/furniture-online-:productId/:skuId" component={PdpContainer} />
          <Route path="/furniture-:id" component={PlpContainer} />
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
          <Route path="/termsconditions" component={TermsConditions} />
          <Route path="/furniture" component={CookiePolicy} />
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Route path="/inspiration" component={Inspiration} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/lookbook" component={InspirationDetails} />
          <Route path="/privacy-policy" component={privacyPolicy} />
          <Route path="/about-us" component={AboutUsContainer} />
          <Route path="/support" component={HelpSupport} />
          <Route path="/serviceRequest" component={ServiceRequestFormGuest} />
          <Route path="/invoice/:invoiceId" component={Invoice} />
          <Route path="/check/payment/:orderId" component={paymentWait} />
          <Route path="/covid19_health_safety_measures" component={Covid19Awareness} />
          <Route path="/business" render={this.redirectToB2B} />
          <Route path="/internet-error" component={InternetError} />
          <Route path="*" component={NotFound} />
          <Route path="/502" component={Maintenance} />
        </Switch>
        </LastLocationProvider>
		</div>
		<FooterContainer /> 
    <ReactSnackBar Icon={<span><MWebLogo width="24" height="24" /></span>} Show={this.state.showSnackBar}>
          {this.state.internetErrorMessage}
        </ReactSnackBar>

      </div>
    );
  }

  redirectToB2B() {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
    apiManager
    .get('/B2B_Redirection')
    .then(response => {
    })
    .catch(error => { })
  }

}

export const history = createBrowserHistory();	