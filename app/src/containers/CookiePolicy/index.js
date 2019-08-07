
import React from 'react';
import  '../../../public/styles/static-pages/cookie.scss'
import Cookies from '../../components/cookiePolicyComp/CookieComponent';


export class CookiePolicy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		// clpData: {},
		// isLoading: false,
		// error: null,
    };
  }

  render() {
    return (
<>
{/* <Cookies/> */}
<div className='CookieContainer'>
  <div className='container'>
    <h3 className='note'>Cookie Policy</h3>
    <p className='Topparagraph'>Company and third parties with whom Company partners, shall use pixel tags, cookies, web beacons, mobile device IDs, “flash cookies” and similar files or technologies to collect and store information in respect to your use of and third party websites and the Platforms. A cookie can be understood as a small text file that is stored on your computer/ mobile that enables us to recognize you (for example, as a registered user) when you visit the Platform, website, store your preferences and settings, enhance your experience by delivering content and advertising specific to your interests, perform research and analytics, track your use of the Platforms, and assist with security and administrative functions. A pixel tag (also called a web beacon) can be understood as a small graphic with embedded invisibly on a webpage (or an online ad or email) and a unique identifier, and is used to count or track things like activity on a webpage or ad impressions or clicks, as well as to access cookies stored on users’ computers. Kindly note that most browsers are set to automatically allow cookies. However, kindly note that it may be possible to disable some (but not all) cookies through your mobile device or browser settings, but doing so may interfere with certain functionality on the Platform. Separately, Company advises you to check their privacy policies for information about third parties cookies and other practices. Company does not control the practices of such third parties/ partners and their privacy policies/ cookies policies, which govern their interactions with you.</p>
  </div>
</div>
</>
    );
  }
}

export default CookiePolicy;
