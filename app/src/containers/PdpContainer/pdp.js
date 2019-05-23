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
    apiManager
      .get(pdpApi2 + productId)
      .then(response => {
        //console.log(response.data, 'datadatadatadat');
        //console.log(JSON.stringify(response.data), 'response.dataresponse.data');
        this.setState({
          pdp: response.data,
          pdpLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          pdpError: error.message,
          pdpLoading: false,
        });
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
        this.setState({
          espotError: error.message,
          espotLoading: false,
        });
      });
  }

  render() {
    return (
      <div>
        {!this.state.pdpLoading &&
          !this.state.espotLoading && (
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
