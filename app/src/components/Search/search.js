import React from 'react';
//Redux Imports
import { connect } from 'react-redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from '../../containers/PlpContainer/reducer';
import saga from '../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../containers/PlpContainer/actions';
import { createCategoryPlpURL, getReleventReduxState, fetchReleventSortingValue, fetchReleventSortingValueByIndex, formateSearchKeyword } from '../../utils/utilityManager';
import { SUGGESTIONS } from '../../constants/app/primitivesConstants';

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
      categorySearchData: [],
    };
    this.handleClick = this.handleChange.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.showButton = this.showButton.bind(this);
    this.searchResultClick = false;
  }

  handleChange = event => {
    const searchText = event.target.value;
    if (event.target.value === '') {
      var crossbtn = document.getElementById('clearField');
      crossbtn.style.display = 'none';
    }
    this.setState({
      searchData: [],
    });

    if (searchText.length > 1) {
      if (searchText) {
        apiManager
          .get(autoSuggestAPI + searchText)
          .then(response => {
            document.addEventListener('click', this.handleOutsideClick, false);
            searchStr =
              this.setState({
                searchData: response.data.data.suggestionView[0].entry,
                categorySearchData: response.data.data.categorySuggestionView ? response.data.data.categorySuggestionView : [],
              });
          })
          .catch(error => {
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
        this.onSearchResultClick(e);
      }
    });
  }

  onSearchResultClick(e) {
    const text = formateSearchKeyword(e.target.value.trim(), true);
    if (text !== '') {
      this.props.history.push({ pathname: '/search', search: `keyword=${text}` });
      this.props.plpReduxStateReset();
      
      this.setState({
        searchData: [],
      });
      this.searchResultClick = true;
    }

  }

  onLinkNavigation = (e) => {
	if (e.target.getAttribute('name') !== '') {
		document.getElementById("searchInput").value = e.target.getAttribute('name');
	}
    this.props.plpReduxStateReset();
    this.setState({
      searchData: [],
    });
  }

  clearFields(e) {
    document.getElementById("searchInput").value = '';
    const crossbtn = document.getElementById('clearField');
    crossbtn.style.display = 'none'
    document.getElementById("searchInput").focus();
  }

  showButton(e) {
    if (this.searchResultClick === false) {
      const crossbtn = document.getElementById('clearField');
      crossbtn.style.display = 'block'
    } else {
      this.searchResultClick = false;
    }
  }

  renderCategorySuggestions() {
    
    if (this.state.categorySearchData.length !== 0) {
      var catSuggestionItem = this.state.categorySearchData.map((item, index) => {
        const searchItem = document.getElementById("searchInput").value;
        var categoryRoutePath = createCategoryPlpURL(item.categoryIdentifier);
        
        var searchStr = item.categoryName;
        if(searchStr !== item.parentRoom){
          searchStr += ` in ${item.parentRoom}`;
        } 
        var filterStr = searchStr.replace(new RegExp(searchItem, 'gi'), str => { return str.bold()});
        if (index < 4) {
          return (
            <li className="list" key={index}>
              <Link name={searchStr} className="link" onClick={this.onLinkNavigation} to={categoryRoutePath} dangerouslySetInnerHTML={{ __html: filterStr}}>
              </Link>
            </li>
          );
        }
      })

      return catSuggestionItem;
    }
    
    
    
  }

  render() {
    const searchData = this.state.searchData;
    return (
      <div className='searchBar'>
        <SearchLogo />
        <input className='searchInput' id='searchInput' onKeyPress={this.showButton} onChange={this.handleChange} onClick={this.handleChange} type='text' autoComplete='off' placeholder='What are you looking for?' />
        <a className='clearField' id='clearField' role='button' onClick={this.clearFields}>X</a>
        {searchData.length > 0 &&
          <div id='autoSuggestDiv' ref={node => { this.node = node; }}>
            <ul className='auto-search'>
              <li className='list'><a className='link' href='#'><strong>{SUGGESTIONS}</strong></a></li>
              {searchData.map((item, index) => {
                const searchItem = document.getElementById("searchInput").value;
                var categoryRoutePath;
                var searchStr = item.term;
                if (index < 6) {
                  return (
                    <li className="list" key={index}>
                      <Link name={searchStr} className="link" onClick={this.onLinkNavigation} to={{ pathname: '/search', search: `keyword=${searchStr}`, }} >
                        <strong>{searchStr.substr(0, searchItem.length)}</strong>{searchStr.substr(searchItem.length).replace(' ', '')}
                      </Link>
                    </li>
                  );
                }
              })
              }
              {this.renderCategorySuggestions()}
            </ul>
          </div>
        }
        
      </div>
    );
  }
}

//export default withRouter(SearchBar);
// export default SearchBar;

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => {
  return {
    plpReduxStateReset: () => dispatch(actionCreators.resetPLPReduxState()),
  }
};

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {

  }
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'plpContainer', reducer });
const withSaga = injectSaga({ key: 'plpContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(SearchBar);
