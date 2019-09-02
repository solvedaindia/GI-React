import React from 'react';
import {Helmet} from "react-helmet";
import apiManager from '../../utils/apiManager';
import { pdpApi2, espotAPI, GI_PDP_Promocode_TandC, GI_PDP_Our_Promises } from '../../../public/constants/constants';
import PdpComponent from '../../components/PdpComponent/PdpComponent';
import appCookie from '../../utils/cookie';
import LoadingIndicator from '../../utils/loadingIndicator';

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
        console.log('PDP Espot API Error =>', error);
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
        console.log('PDP Espot T & C API Error =>', error);
      });
  }

  render() {
    return (
      <div>
        	<Helmet>
				{/* Twitter Tags */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@godrejinterio" />
				<meta name="twitter:title" content="Display Units and Display Cabinets - Godrej Interio" />
				<meta name="twitter:description" content=" Godrej Interio services, office furniture, modern office furniture, latest design office furniture, interior office furniture, Desking Furnitures, chairs, comfortable seating chairs, modern storage furniture, latest design workstations, lab solutions, marine solutions, Godrej Interio, lab solution products, marine solutions products, innovative home furniture, latest design furniture, living room furniture, bedroom furniture and kids room furniture, aesthetic design furniture, durable furniture" />
				<meta name="twitter:image" content="http://www.godrejinterio.com/GodrejInterio/ProductImages/Fab_Fiesta_Media_Unit_1.jpg" />
				<meta name="twitter:image:alt" content="FAB FIESTA MEDIA UNIT" />
				{/* OG Tags */}

				<meta property="og:url" content="http://www.godrejinterio.com/GodrejInterio/products.aspx?id=29&amp;menuid=310&amp;catid=41&amp;subcatid=43&amp;sec=det&amp;prodid=4305" />
				<meta property="og:type" content="Website" />
				<meta property="og:title" content="Place Page Meta Title" />
				<meta property="og:description"content="Place Meta Description " />
				<meta property="og:image" content="Add Image URL" />

			</Helmet>
        { !this.state.pdpLoading && !this.state.espotLoading && !this.state.espotTandCLoading ? (
            <>
				{ this.state.pdp.data && Object.keys(this.state.pdp.data).length > 0 ? (
					<PdpComponent
						data={this.state.pdp.data}
						matchParams={this.props.match.params}
						espot={this.state.pdpEspot}
						espotPromo={this.state.pdpEspotTandC}
						historyData={this.props.history}
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
    );
  }
}

export default PdpContainer;
