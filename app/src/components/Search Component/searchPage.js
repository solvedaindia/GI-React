import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import {SEARCH_PAGE} from '../../constants/app/primitivesConstants';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <h4>{SEARCH_PAGE}</h4>
      </>
    );
  }
}

export default SearchPage;
