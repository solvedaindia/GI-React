import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  	pdpApi2,
  	espotAPI
} from '../../../public/constants/constants';
import PdpComponent from '../../components/PdpComponent/PdpComponent';

class PdpContainer extends React.Component {
	constructor() {
		super();
		this.callPdpApi = this.callPdpApi.bind(this);
		this.state = {
			pdpLoading: true,
			pdpError: false,
			espotLoading: true,
			espotError: false,
		};
	}

	componentDidMount() {
		this.callPdpApi();
    	this.callPdpEspotApi();
  	}

	callPdpApi() {
		const productId = 22951;
		apiManager.get(pdpApi2 + productId)
		.then(response => {
			//console.log('=====>PDP', JSON.stringify(response.data));
			this.setState({
			pdp: response.data,
			pdpLoading: false,
			});
		})
		.catch(error => {
			console.log('PDP API Error =>', error);
		});
	}

	callPdpEspotApi() {
		const APIType = 'GI_PDP_Sample_Espot1';
		const espotPdpApi = espotAPI + APIType;
		apiManager.get(espotPdpApi).then(response => {
			this.setState({
				pdpEspot: response.data,
				espotLoading: false,
			});
		}).catch(error => {
			console.log('PDP Espot API Error =>', error);
		});
	}

  render() {
	return (
    	<div>
			{!this.state.pdpLoading && !this.state.espotLoading && (
				<PdpComponent
					data={this.state.pdp.data}
					skuId={this.props.match.params}
					espot={this.state.pdpEspot}
					historyData={this.props.history}
				/>
			)}
    	</div>
    );
  }
}

export default PdpContainer;
