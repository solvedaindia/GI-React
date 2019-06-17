import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import { searchPageAPI } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import SearchPage from '../../components/Search Component/searchPage';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
    };

  }

  componentDidMount() {
    this.handleState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleState(nextProps);
  }

  handleState(customState) {
    const params = new URLSearchParams(customState.location.search);
    const keywoard = params.get('keyword');
    console.log('Search Container --- ', keywoard);
    this.getSearchKeywordResult(keywoard)
  }

  getSearchKeywordResult(keywoard) {
    apiManager.get(searchPageAPI + keywoard)
    .then(response => {
      console.log('Search page Response --- ',response.data);
    }).catch(error => {
      console.log(error.message);
      console.log('Search page Error --- ',error.message);
    });
  }

  render() {

    return (
      <>
        <SearchPage />
      </>
    );
  }
}

export default SearchContainer;
