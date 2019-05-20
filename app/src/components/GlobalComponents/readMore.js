import React from 'react';
import apiManager from '../../utils/apiManager';
import {
	espotAPI,
	storeId,
	accessToken,
} from '../../../public/constants/constants';
import DescriptionBanner from '../PlpComponent/DescriptionBanner/descriptionBanner';
import '../../../public/styles/readMore.scss';
class ReadMore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readableData: null,
            error: false,
            hasMore: true,
            isLoading: false
        };
    }
    
    getReadMoreData() {
		apiManager
			.get(espotAPI + 'GI_Homepage_About_Godrej')
			.then(response => {
                this.setState({
                    readableData: response.data.data,
                    isLoading: false
                });
                console.log('#####Read More Data######', response.data.data);
            })
			.catch(error => {
                this.setState({
                    error,
                    isLoading: false
                });
                console.log('@@@@@Espot Data Error');
            });
	}
    componentDidMount() {
       this.getReadMoreData();
    }
    render() {
        const { readableData } = this.state;
        return !!readableData && (
            <div className='readMore'>
                {/* <div className='rmDetails'>
                    <h1 className='rmTitle'>{readableData.title}</h1>
                    <p>{readableData.description}</p>
                </div> */}
                <DescriptionBanner
                    descriptionDataPro={this.state.readableData}
                    ref={divElement => (this.divElement = divElement)}
                />
            </div>
        );
    }
}

export default ReadMore;
