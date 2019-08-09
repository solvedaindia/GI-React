import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI
} from '../../../public/constants/constants';
import DescriptionBanner from '../PlpComponent/DescriptionBanner/descriptionBanner';
import '../../../public/styles/readMore.scss';

let catID;
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

  	getReadMoreData() {
    apiManager
      	.get(`${espotAPI}GI_CLP_ROOMS_DESCRIPTION_${catID}`)
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

  componentDidMount() {
    const path = String(window.location.pathname);
    const idStr = path.split('/')[2];
    const categoryName = idStr;
    if (idStr != undefined && idStr !== catID) {
      catID = categoryName;
    }
    this.getReadMoreData();
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
