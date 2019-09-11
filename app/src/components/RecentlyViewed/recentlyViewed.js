import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import {
  recentlyViewedAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import {RECENTLY_VIEWED} from '../../constants/app/primitivesConstants';

import '../../../public/styles/bestSeller/bestSeller.scss';
class RecentlyViewed extends React.Component {
  state = {
    recentlyViewedData: null,
    isLoading: true,
    errors: null,
  };

  getRecentlyViewed() {
    apiManager
      .get(recentlyViewedAPI)
      .then(response => {
        const {data} = response || {};
        this.setState({
          recentlyViewedData: data && data.data,
          isLoading: false,
        });
        console.log('Recently Viewed', data.data);
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
        console.log('ERROR');
      });
  }

  componentDidMount() {
    this.getRecentlyViewed();
  }

  render() {
  
    return (
      <div className="bestSeller">
        <h3 className="title">{RECENTLY_VIEWED}</h3>
      </div>
    );
  }
}

export default RecentlyViewed;
