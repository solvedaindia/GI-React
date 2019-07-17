import React from 'react';
import apiManager from '../../utils/apiManager';
import {
    trackOrderMiniAPI,
} from '../../../public/constants/constants';
import { getCookie } from '../../utils/utilityManager';

class TrackOrder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            errors: null
        } 
    }

    getTracOrderDetails() {
        apiManager
        .get(trackOrderMiniAPI)
        .then(response => {
            const {data} = response || {};
            this.setState({
                recoData: data && data.data,
                isLoading: false,
            });
            console.log(' Mini Cart Data', data.data);
        })
        .catch(error => {
            this.setState({
            error,
            isLoading: false,
            });
            console.log('ERROR');
        });
    }
    componentDidMount() {
        if (getCookie('isLoggedIn') === 'true') {
            this.getTracOrderDetails();
        }
    }
    render() {
        return <p>Hi there!</p>
    }
}

export default TrackOrder;