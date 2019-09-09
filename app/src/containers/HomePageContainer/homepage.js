import React from 'react';
import {Helmet} from "react-helmet";
import apiManager from '../../utils/apiManager';
import WidgetList from '../../components/HomePageStatic/widgetList';
import {
  homePageLayoutAPI,
  ipDataApi,
} from '../../../public/constants/constants';
import {is} from '../../utils/utilityManager';
import appCookie from '../../utils/cookie';
import CrossIcon from '../../components/SVGs/crossIcons.svg';
import LoadingIndicator from '../../utils/loadingIndicator';

export class HomapegeLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		homepageLayout: null,
		isLoading: false,
		error: null,
		ipData: null,
		cookiePolicy: appCookie.get('isCookiePolicy')
		};
		this.hideCookiePopup = this.hideCookiePopup.bind(this);
	}
	
	// Please DO NOT remove the commented code.
	getIPData() {
		var request = new XMLHttpRequest();
		request.open('GET', ipDataApi);
		request.setRequestHeader('Accept', 'application/json');
		request.onreadystatechange = function () {
			if (this.readyState === 4 && this.status == 200) {
				var ipData = JSON.parse(this.responseText);
				console.log('IP data response', ipData);
			}
		};
		request.send();
	}

	getPageLayout() {
		apiManager
		.get(homePageLayoutAPI)
		.then(response => {
			const { data } = response || {};
			const layout = data && data.data;
			this.setState({
				homepageLayout: is(layout, 'Array') && layout,
				isLoading: false,
			});
			console.log('HomepageData Layout', response.data.data);
		})
		.catch(error => {
			this.setState({
			error,
			isLoading: false,
			});
		});
	}

	componentDidMount() {
		this.getIPData();
		this.getPageLayout();
	}

	hideCookiePopup() {
		appCookie.set('isCookiePolicy', false, 365 * 24 * 60 * 60 * 1000);
		this.setState({
			cookiePolicy: false
		})
	}

	render() {
		const { homepageLayout } = this.state;
		return (
			<div className='home'>
				<Helmet>
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:site" content="@godrejinterio" />
					<meta name="twitter:title" content="Godrej Interio - Best Home and Office Furniture Store in India" />
					<meta name="twitter:description" content="Shop from Godrej Interio's furniture store for best quality home and office furniture. Browse our wide range of living room, bedroom, mattress, kitchen, desking, seating. ✔Exchange Policy ✔Best Price ✔Free Shipping &amp; Installation ✔Best Quality &amp; Service ✔Smart &amp; innovative designs" />
					<meta name="twitter:image" content="http://www.godrejinterio.com/GodrejInterio/assets/images/godrej-interio_logo.gif" />
					<meta name="twitter:image:alt" content="Godrej Interio" />
					<meta property="og:url" content="https://www.pepperfry.com/" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="Place Page Meta Title" />
					<meta property="og:description" content="Place Meta Description " />

				</Helmet>
				{
				!!homepageLayout ? (			
				homepageLayout.map((widget, i) => (
					<WidgetList
						{...widget}
						key={`${widget.title}_widget_${i}`}
						index={`${widget.title}_widget_${i}`}
					/>
				))
				) : (
					<LoadingIndicator />
				)
				}
				{ this.state.cookiePolicy === 'true' &&
					<div className="cookiesPolicySticky">
						<div className="cookiesText">We use our own third party cookies to improve your experience and our services, and to
						analyse the use of our website. if you continue browsing, we take that to mean that you
						accept their use. 
						</div>
						<button className='accept_cookies' onClick={this.hideCookiePopup}>Accept</button>
					<a onClick={this.hideCookiePopup}><button className='cancelButton'><img src={CrossIcon} alt='crossImg'/></button></a></div>
				}
			</div>
		);
	}
}

export default HomapegeLayout;
