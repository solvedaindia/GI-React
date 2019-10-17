import React from 'react';
import {Helmet} from "react-helmet";
import apiManager from '../../utils/apiManager';
import { pdpApi2, espotAPI, GI_PDP_Promocode_TandC, GI_PDP_Our_Promises } from '../../../public/constants/constants';
import PdpComponent from '../../components/PdpComponent/PdpComponent';
import appCookie from '../../utils/cookie';
import LoadingIndicator from '../../utils/loadingIndicator';
import PDPMeta from './pdpMeta';

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
			this.setState({
        pdp: response.data,
        title: !!response.data.data.skuData && response.data.data.skuData ? response.data.data.skuData[0].pageTitle : '',
				pdpLoading: false,
      });
			if (appCookie.get('isPDPAddToCart') === null) {
				appCookie.set('isPDPAddToCart', '' , 365 * 24 * 60 * 60 * 1000);
			}
		}).catch(error => {
		});
	}

  callPdpEspotApi() {
    const APIType = GI_PDP_Our_Promises;
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
        console.log('Error: ', error);
      });
  }

  callPdpPromoTandC() {
    const APIType = GI_PDP_Promocode_TandC;
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
        console.log('Error: ', error);
      });
  }

  handleTitle = (title) =>  {
    this.setState({title})
  }

  render() {
  const { pdp, title} = this.state;
  return (
		<>
		
		{!!pdp && 
			<PDPMeta
				keywords={!!pdp.data.keywords && pdp.data.keywords} 
				description={!!pdp.data.skuData && pdp.data.skuData ? pdp.data.skuData[0].metaDescription : ''}
				title={title}
				alt={!!pdp.data.skuData && pdp.data.skuData ? pdp.data.skuData[0].imageAltText : ''}
			/>
		}
        <div>
        { !this.state.pdpLoading && !this.state.espotLoading && !this.state.espotTandCLoading ? (
            <>
				{ this.state.pdp.data && Object.keys(this.state.pdp.data).length > 0 ? (
					<PdpComponent
						data={this.state.pdp.data}
						matchParams={this.props.match.params}
						espot={this.state.pdpEspot}
						espotPromo={this.state.pdpEspotTandC}
            historyData={this.props.history}
            handleTitle = {this.handleTitle}
					/>
					) : (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                <div className="notFound">Data Not Found</div>
                </div>
              </div>
            </div>
					)
				}
            </>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="loadingIndicator"><LoadingIndicator /></div>
                </div>
              </div>
            </div>
          )}
      </div>
	  </>
    );
  }
}

export default PdpContainer;
