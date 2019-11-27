import React from 'react';
import {Helmet} from "react-helmet";
import apiManager from '../../utils/apiManager';
import WidgetList from '../../components/HomePageStatic/widgetList';
import {
	homePageLayoutAPI
} from '../../../public/constants/constants';
import {is} from '../../utils/utilityManager';
import appCookie from '../../utils/cookie';
import CrossIcon from '../../components/SVGs/crossIcons.svg';
import LoadingIndicator from '../../utils/loadingIndicator';
import ContentEspot from '../../components/Primitives/staticContent';
import Pixels from '../../components/Primitives/pixels';
import InfoAlert from '../../utils/infoAlert';
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
		// this.hideCookiePopup = this.hideCookiePopup.bind(this);
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
			})
			.catch(error => {
				this.setState({
					error,
					isLoading: false,
				});
			});
	}

	componentDidMount() {
		this.getPageLayout();
	}

	/* 	hideCookiePopup() {
			appCookie.set('isCookiePolicy', false, 365 * 24 * 60 * 60 * 1000);
			this.setState({
				cookiePolicy: false
			})
		} */

	render() {
		const { homepageLayout } = this.state;
		return (
			<>
			<InfoAlert/>
				<ContentEspot espotName={'GI_PIXEL_BODY_START'} />
				<div className='home'>
					<Pixels espotName={'GI_PIXEL_HOME_META'} />
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
					{/* { this.state.cookiePolicy === 'true' &&
					<div className="cookiesPolicySticky">
						<div className="cookiesText">We use our own third party cookies to improve your experience and our services, and to
						analyse the use of our website. if you continue browsing, we take that to mean that you
						accept their use. 
						</div>
						<button className='accept_cookies' onClick={this.hideCookiePopup}>Accept</button>
					<a onClick={this.hideCookiePopup}><button className='cancelButton'><img src={CrossIcon} alt='crossImg'/></button></a></div>
				} */}
				</div>
				<ContentEspot espotName = { 'GI_PIXEL_BODY_END' } />
			</>
		);
	}
}

export default HomapegeLayout;
