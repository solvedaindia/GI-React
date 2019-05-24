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
        this.setState({
          homePageData: response.data.data.GI_Homepage_Static_Content,
          isLoading: false,
        });
        console.log('@@@@@@@@@@@@@@', response.data);
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
          <div>Something Went Wrong</div>
        )}
      </div>
    );
  }
}

export default HomePageStatic;
