import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI
} from '../../../public/constants/constants';
import '../../../public/styles/content.scss';

class InterioText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: "GI_MODULAR_KITCHEN_INTERIOR",
      pageLayoutEspot: null,
      isLoading: true,
      error: null,
    };
  }

  getEspotData() {
    apiManager
      .get(espotAPI + this.state.espotName)
      .then(response => {
        console.log('respo', response)
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
        console.log('kitchen data');
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

export default InterioText;
