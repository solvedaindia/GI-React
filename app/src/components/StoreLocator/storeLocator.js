import React from 'react';
import apiManager from '../../utils/apiManager';
import {
    storeAPI,
} from '../../../public/constants/constants';
export class StoreLocator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeData: null,
            isLoading: false,
            error: null,
            ipData: null
        };
    }
    
    getStoreData() {
        apiManager.get(storeAPI)
        .then( response => {
            this.setState({
                storeData: response.data.data,
                isLoading: false
            })
            console.log('@@@@ Store Locator Data @@@@@', response.data);
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            });
        });
    }
    

	componentDidMount() {
		this.getStoreData();
	}

	render() {
		const { homepageLayout } = this.state;
		return (
            !!homepageLayout && homepageLayout.map((widget, i) => (
                <div className='homePage'>
                    <WidgetList
                        {...widget}
                        key={`${widget.title}_widget_${i}`}
                        index={`${widget.title}_widget_${i}`}
                    />
                </div>
            ))
		);
	}
}

export default StoreLocator;
