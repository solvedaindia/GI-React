import React from 'react';
import '../../../public/styles/covid19awareness.scss';
import apiManager from '../../utils/apiManager';
import { espotAPI } from '../../../public/constants/constants';

class Covid19Awareness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: 'GI_Covid19_Health_Safety_Initiatives',
      pageLayoutEspot: null,
      isLoading: true,
      error: null,
    };
  }

  getEspotData() {
    apiManager
      .get(espotAPI + this.state.espotName)
      .then(response => {
        const { data } = response || {};
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
      });
  }

  componentDidMount() {
    this.getEspotData();
  }

  render() {
    const { isLoading, error, pageLayoutEspot } = this.state;
    if (!isLoading && !error) {
      return (
        <div dangerouslySetInnerHTML={{ __html: pageLayoutEspot.content }} />
      );
    }
    return null;
  }
}

export default Covid19Awareness;
