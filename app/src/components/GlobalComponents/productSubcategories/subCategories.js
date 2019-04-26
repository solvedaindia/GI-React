import React from 'react';
import axios from 'axios';
import {
  subCatAPI,
  storeId,
  accessToken,
} from '../../../../public/constants/constants';
export class SubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subCatData: null,
      isLoading: false,
      error: null,
    };
  }

  getPageLayout() {
    axios
      .get(subCatAPI, {
        headers: { store_id: storeId, access_token: accessToken },
      })
      .then(response => {
        this.setState({
          subCatData: response.data.data,
          isLoading: false,
        });
        console.log('HomepageData', response.data.data);
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    this.getPageLayout();
  }

  render() {
    <p>Some Sub Cat</p>;
    const { subCatData } = this.state;
    return (
      !!subCatData &&
      subCatData.map((subCatListData, i) => {
        <p>Some Text</p>;
      })
    );
  }
}

export default SubCategory;
