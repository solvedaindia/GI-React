import React from 'react';
import '../../../../public/styles/footerContainer/footerMobile.scss';
import { footerLogoUrl } from '../../../../public/constants/constants';
import Newsletter from '../../../components/Footer/newsletter';
import Categories from '../../../components/Footer/categories';
import Stores from '../../../components/Footer/stores';
import Socialicon from '../../../components/Footer/socialicons';
import FooterLinkAccordian from './footerLinkAccordian';
import '../../../../public/styles/footerContainer/accordian.scss'
export class FooterMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <footer className="footerMobile">
        <div className="logo_white">
          <a href='/'><img className="logo_width" src={footerLogoUrl} alt="logo" /></a>
        </div>
        <Newsletter name={this.props.newsletter} socialicon={this.props.socialicons} isFromMobile={true} />
        <FooterLinkAccordian name={this.props.links} />
        <Categories name={this.props.categories} />
        <Stores name={this.props.stores} />
        <ul className="social-Link clearfix">
          <Socialicon name={this.props.socialicons} />
        </ul>
      </footer>
    );
  }
}

export default FooterMobile;
