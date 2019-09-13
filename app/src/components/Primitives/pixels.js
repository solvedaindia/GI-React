import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI
} from '../../../public/constants/constants';
import '../../../public/styles/content.scss';

class Pixels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pixelData: null,
      isLoading: true,
      error: null,
    };
  }

  getEspotData() {
    apiManager
      .get(espotAPI + this.props.espotName)
      .then(response => {
        const {data} = response || {};
        this.setState({
            pixelData: data && data.data,
            isLoading: false,
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
    this.getEspotData();
  }

  render() {
    const { pixelData } = this.state;
    if(!pixelData) return null;
    return (
		!!pixelData && (
      		<> {dangerouslySetInnerHTML={ __html: pixelData.content }}</>
		)
    );
  }
}

export default Pixels;
