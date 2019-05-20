import React from 'react';
import axios from 'axios';
import WidgetList from '../../components/HomePageStatic/widgetList';
import {
  homePageLayoutAPI,
  ipDataApi,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
export class HomapegeLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        homepageLayout: null,
        isLoading: false,
        error: null,
        ipData: null
        };
    }
    
    getIPData() {
        axios.get(ipDataApi, {'headers': { 'Accept': 'application/json'} })
        .then( response => {
            this.setState({
                ipData: response.data,
                isLoading: false
            })
            console.log('@@@@ IP DATA RESPONSE @@@@@', response.data);
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            });
        });
    }
    getPageLayout() {
        axios.get(homePageLayoutAPI, { 'headers': { 'store_id': storeId, 'access_token': accessToken } })
        .then(response => {
            this.setState({
                homepageLayout: response.data.data,
                isLoading: false
            });
            console.log('HomepageData Layout', response.data.data);
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            });
        });
  	}

	componentDidMount() {
        this.getIPData();
		this.getPageLayout();
	}

	render() {
		const { homepageLayout } = this.state;
		return (
            !!homepageLayout && homepageLayout.map((widget, i) => (
                <WidgetList
                {...widget}
                key={`${widget.title}_widget_${i}`}
                index={`${widget.title}_widget_${i}`}
                />
            ))
		);
	}
}

export default HomapegeLayout;
