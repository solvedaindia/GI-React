import React from 'react';
import axios from 'axios';
import {
	espotAPI,
	storeId,
	accessToken,
} from '../../../public/constants/constants';
import '../../../public/styles/readMore.scss';

// const strData =
//   'Godrej Interio is India’s largest furniture brand. From manufacturing the humble Storwel culiboard 80 years back to being a vibrant, innovative brand with a diverse liortfolio – it’s been a brilliant, exciting journey for us. <p /> We love bringing alive your dream space. We emphasize comfort and aesthetics while delivering well designed, fun and functional furniture solutions to you. <p />True to the Godrej mission to conserve the environment, we design products, set up processes and use raw materials that are eco-friendly to do our bit to preserve natural resources.<p />We offer our customers home and office furniture, along with solutions for laboratories, hospitals and healthcare establishments, education and training institutes, shipyards and navy, auditoriums and stadiums. We are present across India through our 50 exclusive showrooms in 18 cities and through 800 dealer outlets.<p />Godrej Interio is a business unit of Godrej & Boyce Mfg. Co. Ltd. - part of the Godrej Group, one of India’s largest engineering and consumer product groups.';
class ReadMore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            espotName: this.props.espotName,
            readMoreData: null,
            splitData: null,
            fullData: '',
            finalData: null,
            isReadMore: false,
            readMoreTitle: 'Read More',
            isLoading: false,
            error: null
        };
    }
    getReadMoreData() {
		axios
			.get(espotAPI + this.props.espotName, {
				headers: { store_id: storeId, access_token: accessToken },
			})
			.then(response => {
                this.setState({
                    readMoreData: response.data.data,
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

    // readMoreClicked() {
    //     if (this.state.isReadMore) {
    //     console.log('Hide');
    //     this.setState({
    //         isReadMore: false,
    //         finalData: this.state.splitData,
    //         readMoreTitle: 'Read More',
    //     });
    //     } else {
    //     console.log('Show');
    //     this.setState({
    //         isReadMore: true,
    //         finalData: strData,
    //         readMoreTitle: 'Read Less',
    //     });
    //     }
    // }

    render() {
        const { readMoreData } = this.state;
        return !!readMoreData && (
            <div className='readMore'>
                <div className='rmDetails'>
                    <h1 className='rmTitle'>{readMoreData.title}</h1>
                </div>
            </div>
        );
    }
}

export default ReadMore;
