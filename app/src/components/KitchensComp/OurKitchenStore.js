import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import '../../../public/styles/content.scss';

class OurKitchenStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: "GI_EXPERIENCE_OUR_KITCHENS_STORE ",
      pageLayoutEspot: null,
      isLoading: true,
      error: null,
    };
  }

  getEspotData() {
    apiManager
      .get(espotAPI + this.state.espotName)
      .then(response => {
        console.log('our kitchen', response)
        const {data} = response || {};
        this.setState({
          pageLayoutEspot: data && data.data,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
        console.log('Homepage Layout Espot Data ERROR');
      });
  }

  componentDidMount() {
    this.getEspotData();
  }

  render() {
    const { pageLayoutEspot, index } = this.state;
    if(!pageLayoutEspot) return null;
    return (
		!!pageLayoutEspot && (
			<div>
				<div dangerouslySetInnerHTML={{ __html: pageLayoutEspot.content }} />
			</div>
		)
    );
  }
}

export default OurKitchenStore;