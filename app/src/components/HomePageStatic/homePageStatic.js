import React from 'react';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/homePageStatic.scss';
import WelcomeBack from '../WelcomeBack/index';
import {
  homePageApi,
  storeId,
  accessToken,
} from '../../../public/constants/constants';

class HomePageStatic extends React.Component {
  state = {
    homePageData: {},
    isLoading: true,
    errors: null,
  };

  getHomePageData() {
    apiManager
      .get(homePageApi)
      .then(response => {
        const {data} = response || {};
        this.setState({
          homePageData: data && data.data.GI_Homepage_Static_Content,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getHomePageData();
  }

  render() {
    const { isLoading, homePageData } = this.state;
    return (
      <div className="homePageStatic">
        {!isLoading ? (
          <div dangerouslySetInnerHTML={{ __html: homePageData.content }} />
        ) : (
          <div>...</div>
        )}
      </div>
    );
  }
}

export default HomePageStatic;
