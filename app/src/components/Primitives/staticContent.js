import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI
} from '../../../public/constants/constants';
import '../../../public/styles/content.scss';

class ContentEspot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staticContent: null,
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
            staticContent: data && data.data,
            isLoading: false,
        });
        this.props.handler()
        
        // alert( this.props.handler())
       
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
    const { staticContent } = this.state;
    if(!staticContent) return null;
    return (
		!!staticContent && (
      <div className={this.props.espotName} dangerouslySetInnerHTML={{ __html: staticContent.content }} />
		)
    );
  }
}

export default ContentEspot;
