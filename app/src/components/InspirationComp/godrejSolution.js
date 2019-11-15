import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI
} from '../../../public/constants/constants';
import '../../../public/styles/content.scss';

class GodrejSolutionEspot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: "GI_Homepage_Godrej_Solution",
      pageLayoutEspot: null,
      isLoading: true,
      error: null,
    };
  }

  getEspotData() {
    apiManager
      .get(espotAPI + this.state.espotName)
      .then(response => {
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
		      <div dangerouslySetInnerHTML={{ __html: pageLayoutEspot.content }}/>
			</div>
		)
    );
  }
}

export default GodrejSolutionEspot;
