import React from 'react';
import CategoryNavigation from 'containers/CategoryNavigation';
import FeaturedLinkBar from 'components/FeaturedLinkBar';
import TopHeader from 'components/TopHeader';
import LoadingIndicator from '../../utils/loadingIndicator';
// import MobileHeader from './MobileHeader/index';
import { catApi, headerApi2, mwApi } from '../../../public/constants/constants';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerData: {},
      headerL2Data: {},
      categoryData: {},
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(headerApi2)
      .then(response => {
        if (response.ok) {
          this.fetchNavCatData();
          return response.json();
        }
        throw new Error('Something went wrong ...');
      })
      .then(data => {
        this.setState({ headerData: data.data, isLoading: false })
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  fetchNavCatData() {
    fetch(catApi)
    .then(response => {
      if (response.ok) {
        this.fetchMinicartWishlisthCount();
        return response.json();
      }
      throw new Error('Something went wrong ...');
    })
    .then(data => {
      this.setState({ categoryData: data.catalogGroupView, isLoading: false })
    })
    .catch(error => this.setState({ error, isLoading: false }));

  }

  fetchMinicartWishlisthCount() {
    fetch(mwApi)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong ...');
    })
    .then(data => {
      this.setState({ headerL2Data: data.data, isLoading: false })
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { headerData, headerL2Data, isLoading, error, categoryData } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return (
        <LoadingIndicator />
      )
    }

    const { isMobile } = this.props;

    return (
      <header>
        <FeaturedLinkBar featuredData={headerData.layer1} />
        <TopHeader
          topHeaderData={headerData.layer2}
          wishListCountData={headerL2Data.wislist_data}
          miniCartCountData={headerL2Data.minicart_data} 
          />
        <CategoryNavigation isMobile={isMobile} catNavData={categoryData} />
      </header>
    );
  }
}

export default Header;
