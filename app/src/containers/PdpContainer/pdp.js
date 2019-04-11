import React from 'react';
import axios from 'axios';
import {
  pdpApi,
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
    axios
      .get(pdpApi, {
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
    const APIType = 'GI_PDP_OUR_PROMISES';
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
              espot={this.state.pdpEspot}
            />
          )}
      </div>
    );
  }
}

export default PdpContainer;
