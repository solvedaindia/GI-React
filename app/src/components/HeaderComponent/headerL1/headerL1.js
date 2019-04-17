import React from 'react';
import axios from "axios";
import '../../../../public/styles/headerContainer/headerL1.scss';
import { headerStatic, storeId, accessToken } from '../../../../public/constants/constants';

class HeaderL1 extends React.Component{
    state = {
        layer1Data:[],
        isLoading: true,
        errors: null
    };

    getHeaderLayer1() {
        axios.get(headerStatic, { 'headers': { 'store_id': storeId, 'access_token': accessToken } })
        .then(response => {
            this.setState({
                layer1Data: response.data.data.Header_Static_Links,
                isLoading: false
            });
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.getHeaderLayer1();
    }

    render() {
        const { isLoading, layer1Data } = this.state;
        return (
            <ul className='layer1'>
                {!isLoading ? (
                    layer1Data.map((linkData, index) => {
                        return (
                            <li className='listItems' key={index}>
                                <a className='action' href={linkData.action}>
                                    {linkData.text}
                                </a>
                            </li>
                        );
                    })
                ) : (
                    <div>Something Went Wrong</div>
                )}
            </ul>
        );
    }
}  

export default HeaderL1;
