/*import React from 'react';
import SearchBar from '../Search/search';
import HeaderRight from '../HeaderRight/headerRight';

import  '../../../public/styles/static-pages/aboutUs.scss'



class MediaPress extends React.Component {
  state = {
    category: null,
    isLoading: true,
    errors: null,
  };

 /* getHeaderLayer2() {
    apiManager
      .get(navigationApi)
      .then(response => {
        this.setState({
          category: response.data.data.categoryArray,
          isLoading: false,
        });
        console.log('Category Navigation Data', response.data.data);
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getHeaderLayer2();
  }

    render() {
        return (
             <div className="container">
                <h1 className="HeaderCopy33">Media/Press</h1>
                <hr className="hr" />

            <h2 className="Wed-love-to-hear-from-you-Copys ">Latest News</h2>
            <div className="row">
              <div className="col-md-6">
                <img
                  className="michaelSplash"
                  src={require('../../../public/images/Bailbrook-House.jpg')}
                  alt="Rectangle"
                />
                <h2 className="Post-title">Impact Of Extrinsic Motivation On Intrinsic Motivation</h2>
              </div>
            </div>
          </div> 
        );
    }
}  

export default MediaPress;*/


import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import '../../../public/styles/content.scss';

class MediaPress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: "GI_MEDIA_PRESS",
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
			<div className="" id={index}>
				{/* <h1 className="title">{pageLayoutEspot.title}</h1> */}
				<div dangerouslySetInnerHTML={{ __html: pageLayoutEspot.content }} />
			</div>
		)
    );
  }
}

export default MediaPress;
