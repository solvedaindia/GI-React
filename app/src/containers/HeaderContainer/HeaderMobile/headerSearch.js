import React from 'react';
import { Link } from 'react-router-dom';
import apiManager from '../../../utils/apiManager';
import { autoSuggestAPI } from '../../../../public/constants/constants';
import '../../../../public/styles/RWDStyle/mobileHeader.scss';
// import '../../../../public/styles/RWDStyle/sideNavigation.scss';

export class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      searchData: [],
    };
  }

  onBackBtn() {
    this.props.headerCallbackPro();
  }

  onClearClick() {
    this.setState({
      inputText: '',
      searchData: [],
    });
  }

  onSearchClick() {}

  onLinkNavigation(searchTxt) {
    // this.props.plpReduxStateReset();
    this.setState({
      inputText: searchTxt,
      searchData: [],
    });
  }

  handleInputChange(event) {
    this.setState({
      inputText: event.target.value,
    });

    const searchText = event.target.value;
    this.setState({
      searchData: [],
    });

    if (searchText.length > 1) {
      if (searchText) {
        apiManager
          .get(autoSuggestAPI + searchText)
          .then(response => {
            this.setState({
              searchData: response.data.data.suggestionView[0].entry,
            });
          })
          .catch(error => {
            console.log(error.message);
          });
      } else {
      }
    }
  }

  render() {
    const searchData = this.state.searchData;
    return (
      <>
        <div className="searchBackBtn">
          <button onClick={this.onBackBtn.bind(this)} className="menuBtn">
            <img
              className="logoImg"
              src={require('../../../../public/images/LeftArrow.svg')}
            />
          </button>
          <input
            id="searchInput"
            className="searchField"
            placeholder="Search for Rooms, Products, etc "
            value={this.state.inputText}
            onChange={this.handleInputChange.bind(this)}
            type="text"
          />
          {this.state.inputText !== '' ? (
            <button onClick={this.onClearClick.bind(this)}>
              <img src={require('../../../../public/images/close.svg')} />
            </button>
          ) : (
            <button onClick={this.onSearchClick.bind(this)}>
              <img
                src={require('../../../../public/images/rwd-assets/search.svg')}
              />
            </button>
          )}
        </div>

        <div className="searchBarHeader">
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
                            onClick={() => this.onLinkNavigation(item.term)}
                          >
                            <strong>
                              {' '}
                              {item.term.substr(0, searchItem.length)}{' '}
                            </strong>{' '}
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
      </>
    );
  }
}

export default HeaderSearch;
