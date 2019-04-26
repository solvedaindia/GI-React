import React from 'react';
import axios from 'axios';
import {
  pdpApi,
  pdpApi2,
  espotAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import PdpComponent from '../../components/PdpComponent/pdpComponent';

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
    const productId = 'TEST_PDP';
    axios
      .get(pdpApi2 + productId, {
        headers: { store_id: storeId, access_token: accessToken },
      })
      .then(response => {
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
    axios
      .get(espotPdpApi, {
        headers: { store_id: storeId, access_token: accessToken },
      })
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
            />
        )}
      </div>
    );
  }
}

export default PdpContainer;
