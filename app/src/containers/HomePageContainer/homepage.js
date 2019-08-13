import React from 'react';
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

	getIPData() {
		apiManager
		.get(ipDataApi, { headers: { Accept: 'application/json' } })
		.then(response => {
			this.setState({
			ipData: response.data,
			isLoading: false,
			});
			console.log('@@@@ IP DATA RESPONSE @@@@@', response.data);
		})
		.catch(error => {
			this.setState({
			error,
			isLoading: false,
			});
		});
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
			<> {
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
					We use our own third party cookies to improve your experience and our services, and to
					analyse the use of our website. if you continue browsing, we take that to mean that you
					accept their use.
				<a onClick={this.hideCookiePopup}><button className='cancelButton'><img src={CrossIcon} alt='crossImg'/></button></a></div>
			}
			
			</>
		);
	}
}

export default HomapegeLayout;
