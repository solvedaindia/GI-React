import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI
} from '../../../public/constants/constants';
import DescriptionBanner from '../PlpComponent/DescriptionBanner/descriptionBanner';
import '../../../public/styles/readMore.scss';

class CLPReadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readableData: null,
      error: false,
      hasMore: true,
      isLoading: false,
    };
  }

  	getReadMoreData(id) {
    apiManager
      	.get(`${espotAPI}GI_CLP_ROOMS_DESCRIPTION_${id}`)
		.then(response => {
			const {data} = response || {};
			this.setState({
				readableData: data && data.data,
			});
		})
		.catch(error => {
			this.setState({
			error,
			isLoading: false,
			});
		});
  	}
    
  componentWillReceiveProps(nextProps) {
    if(this.props.id !== nextProps.id){
      console.log('Next Props ID', nextProps);
      this.getReadMoreData(nextProps.id);
    }
  }

  componentDidMount() {
  	this.getReadMoreData(this.props.id);
  }

  render() {
    const { readableData } = this.state;
    return (
      !!readableData && (
        <div className="readMore">
          <DescriptionBanner
            descriptionDataPro={this.state.readableData}
            ref={divElement => (this.divElement = divElement)}
          />
        </div>
      )
    );
  }
}

export default CLPReadMore;
