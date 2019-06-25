import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import '../../../public/styles/content.scss';
import '../../../public/styles/homePageStatic.scss';

class EspotContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: this.props.espotName,
      pageLayoutEspot: null,
      isLoading: true,
      error: null,
    };
  }

  getEspotData() {
    apiManager
      .get(espotAPI + this.state.espotName)
      .then(response => {
        this.setState({
          pageLayoutEspot: response.data.data,
          isLoading: false,
        });
        console.log(
          '##########Homepage Layout espot##########',
          response.data.data,
        );
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
			<div className="espotContent" id={index}>
				<h1 className="title">{pageLayoutEspot.title}</h1>
				<div dangerouslySetInnerHTML={{ __html: pageLayoutEspot.content }} />
			</div>
		)
    );
  }
}

export default EspotContent;
