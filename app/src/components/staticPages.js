import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import TermsConditions from '../components/termsConditionsComp/termConditions';
import CookiePolicy from '../containers/CookiePolicy';
import Inspiration from '../containers/InspirationCont';
import Kitchens from '../containers/KitchensContainer';
import SteelChefKitchen from '../containers/KitchensContainer/kitchen2';
import InspirationDetails from '../containers/InspirationDetailsContainer';
import WardrobesContainer from '../containers/wardrobesContainer';
import PrivacyPolicy from '../containers/privacyPolicy';
import AboutUsContainer from '../containers/aboutUsContainer';
import HelpSupport from '../containers/serviceSupportContainer';
class StaticPagesList extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/termsconditions" component={TermsConditions} >
            <h1>T&amp;C</h1>
        </Route>
        <Route path="/cookie" component={CookiePolicy} > Cookie Policy</Route>
        <Route path="/inspiration" component={Inspiration} > Inspiration </Route>
        <Route path="/kitchens" component={Kitchens} >Kitchens</Route>
        <Route path="/chefkitchen" component={SteelChefKitchen} > Steel Kitchen Chef</Route>
        <Route path="/lookbook" component={InspirationDetails} >Inspirational Details</Route>
        <Route path="/wardrobes" component={WardrobesContainer} >Wardrob Container</Route>
        <Route path="/privacy-policy" component={PrivacyPolicy} >Privacy Policy </Route>
        <Route path="/about-us" component={AboutUsContainer} > About Us</Route>
        <Route path="/support" component={HelpSupport} > Help &amp; Support</Route>
      </Switch>
    );
  }
}

export default StaticPagesList;
