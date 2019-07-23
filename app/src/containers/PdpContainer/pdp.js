import React from 'react';
import apiManager from '../../utils/apiManager';
import { pdpApi2, espotAPI } from '../../../public/constants/constants';
import PdpComponent from '../../components/PdpComponent/PdpComponent';
import appCookie from '../../utils/cookie';

class PdpContainer extends React.Component {
  constructor() {
    super();
    this.callPdpApi = this.callPdpApi.bind(this);
    this.state = {
      pdpLoading: true,
      pdpError: false,
      espotLoading: true,
	  espotError: false,
	  espotTandCLoading: true,
    };
  }

  componentDidMount() {
    this.callPdpApi();
	this.callPdpEspotApi();
	this.callPdpPromoTandC();
  }

	callPdpApi() {
		const skuId = this.props.match.params.skuId;
		apiManager.get(pdpApi2 + skuId).then(response => {
			//console.log('=====>PDP=>>'+pdpApi2+'=>>>', JSON.stringify(response.data));
			this.setState({
				pdp: response.data,
				pdpLoading: false,
			});

			if (appCookie.get('isPDPAddToCart') === null) {
				appCookie.set('isPDPAddToCart', '' , 365 * 24 * 60 * 60 * 1000);
			}
		}).catch(error => {
			console.log('PDP API Error =>', error);
		});
	}

  callPdpEspotApi() {
    const APIType = 'GI_PDP_Sample_Espot1';
    const espotPdpApi = espotAPI + APIType;
    apiManager
      .get(espotPdpApi)
      .then(response => {
        this.setState({
          pdpEspot: response.data,
          espotLoading: false,
        });
      })
      .catch(error => {
        console.log('PDP Espot API Error =>', error);
      });
  }

  callPdpPromoTandC() {
    const APIType = 'GI_PDP_Promocode_TandC';
    const espotPdpApi = espotAPI + APIType;
    apiManager
      .get(espotPdpApi)
      .then(response => {
        this.setState({
          pdpEspotTandC: response.data,
          espotTandCLoading: false,
        });
      })
      .catch(error => {
        console.log('PDP Espot T & C API Error =>', error);
      });
  }

  render() {
    return (
      <div>
        {!this.state.pdpLoading && !this.state.espotLoading && !this.state.espotTandCLoading && (
            <>
				{ Object.keys(this.state.pdp.data).length > 0 ? (
					<PdpComponent
						data={this.state.pdp.data}
						matchParams={this.props.match.params}
						espot={this.state.pdpEspot}
						espotPromo={this.state.pdpEspotTandC}
						historyData={this.props.history}
					/>
					) : (
						<div><b>Data Not Found</b></div>
					)
				}
            </>
          )}
      </div>
    );
  }
}

export default PdpContainer;
