
import React from 'react';
import '../../../public/styles/static-pages/cookie.scss'
import ContentEspot from '../../components/Primitives/staticContent';
import '../../../public/styles/staticPages/staticPages.scss';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import { CookiePolicES } from '../../utils/EspotConstant';
export class CookiePolicy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className='staticpage cookiepolicy'>
        <Breadcrumb {...this.props.match.params} staticName={'Cookie Policy'} />
        <ContentEspot espotName={CookiePolicES.staticData} />
        <ContentEspot espotName={CookiePolicES.policy2} />
        <ContentEspot espotName={CookiePolicES.policy3} />
        <ContentEspot espotName={CookiePolicES.policy4} />
        <ContentEspot espotName={CookiePolicES.policy5} />

      </div>

    );
  }
}

export default CookiePolicy;
