import React from 'react';
import { Route, NavLink, Link, withRouter } from 'react-router-dom';

import apiManager from '../../utils/apiManager';
import SearchLogo from '../SVGs/search';
import {
  autoSuggestAPI
} from '../../../public/constants/constants';
import '../../../public/styles/headerContainer/search.scss';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchData: [],
    };
    this.handleClick = this.handleChange.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleChange = event => {
    const searchText = event.target.value;
    this.setState({
      searchData: [],
    });

    if (searchText.length > 1) {
      if (searchText) {
        apiManager
          .get(autoSuggestAPI + searchText)
          .then(response => {
            document.addEventListener('click', this.handleOutsideClick, false);
            this.setState({
              searchData: response.data.data.suggestionView[0].entry,
            });
          })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  };

  handleOutsideClick(e) {
    if (this.state.searchData.length > 0) {
      if (this.node.contains(e.target)) {
        return;
      }
      this.setState({
        searchData: [],
      });
    }
  }

  componentDidMount() {
    const wage = document.getElementById('searchInput');
    wage.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        this.validate(e);
      }
    });
  }

  validate(e) {
    const text = e.target.value;
    console.log('dd -- ', this.props);
    this.props.history.push({ pathname: '/search', search: `keyword=${text}` });
  }

  onSearchResultClick() {}

  render() {
    const searchData = this.state.searchData;
    return (
      <div className="searchBar">
        <SearchLogo />
        <input
          className="searchInput"
          id="searchInput"
          onChange={this.handleChange}
          onClick={this.handleChange}
          type="text"
          autoComplete="off"
          placeholder="search for products"
        />
        {searchData.length > 0 && (
          <div
            id="autoSuggestDiv"
            ref={node => {
              this.node = node;
            }}
          >
            <ul className="auto-search">
              <li className="list">
                <a className="link" href="#">
                  Suggestions
                </a>
                {searchData.map((item, index) => {
                  const searchItem = document.getElementById('searchInput')
                    .value;
                  if (index < 6) {
                    return (
                      <li className="list" key={index}>
                        <Link
                          className="link"
                          to={{
                            pathname: '/search',
                            search: `keyword=${item.term}`,
                          }}
                        >
                          <strong>
                            {item.term.substr(0, searchItem.length)}
                          </strong>
                          {item.term.substr(searchItem.length)}
                        </Link>
                      </li>
                    );
                  }
                })}
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(SearchBar);
// export default SearchBar;
