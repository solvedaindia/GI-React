import React from 'react';
import axios from 'axios';
import { pdpApi, storeId, accessToken } from '../../../public/constants/constants';
import PdpComponent from '../../components/PdpComponent/pdpComponent';

class PdpContainer extends React.Component {
    constructor() {
        super();
        this.callPdpApi = this.callPdpApi.bind(this);
        this.state = {
            loading: true,
            error: false,
        }
    }

    componentDidMount() {
        this.callPdpApi();
    }

    callPdpApi() {
        axios.get(pdpApi, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
            console.log(response, 'responseresponse');
            this.setState({
                pdp: response.data,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: error.message,
                loading: false
            });
        });
    }
    
    render() {
        return(
            <div>
            { !this.state.loading &&
                <PdpComponent
                    imagesAndVideos={this.state.pdp.data.imagesAndVideos}
                    featureProduct={this.state.pdp.data.features}
                />
            }
            </div>
        )
    }
}

export default PdpContainer;