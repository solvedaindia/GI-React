import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import apiManager from '../../../utils/apiManager';
import { autoSuggestAPI } from '../../../../public/constants/constants';
import '../../../../public/styles/RWDStyle/mobileHeader.scss';
// import '../../../../public/styles/RWDStyle/sideNavigation.scss';
import { connect } from 'react-redux';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import {createCategoryPlpURL, getReleventReduxState, fetchReleventSortingValue, fetchReleventSortingValueByIndex, formateSearchKeyword } from '../../../utils/utilityManager';

export class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      searchData: [],
      categorySearchData: [],
    };
  }

  componentDidMount() {
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
    this.props.plpReduxStateReset();
    this.setState({
      inputText: searchTxt,
      searchData: [],
    });
    document.body.classList.remove('lock-screen');
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
              categorySearchData: response.data.data.categorySuggestionView ? response.data.data.categorySuggestionView : [],
            });
          })
          .catch(error => {
          });
      } else {
      }
    }

  }


  onkeydownclick(text) {
  
    console.log(event);
    if (event.key === 'Enter') {
     
      if (text !== '') {
        this.props.history.push({ pathname: '/search', search: `keyword=${formateSearchKeyword(text, true)}` });
        this.onLinkNavigation(this.state.inputText);
      }
      else{
        //this.props.history.push({ pathname: '/search', search: `keyword=${formateSearchKeyword(text, true)}` });
        //this.onLinkNavigation(this.state.inputText);
       // Keyboard.dismiss();
        event.preventDefault();
      }
    }
  }

  renderCategorySuggestions() {
    if (this.state.categorySearchData.length !== 0) {
      var catSuggestionItem = this.state.categorySearchData.map((item, index) => {
        const searchItem = document.getElementById("searchInput").value;
        const routePath = createCategoryPlpURL(item.categoryIdentifier);
        var searchStr = item.categoryName;
        searchStr += ` in ${item.parentRoom}`;
        if (index < 4) {
          return (
            <li className="list" key={index}>
              <Link name={searchStr} className="link" onClick={this.onLinkNavigation} to={routePath} >
                <strong>{searchStr.substr(0, searchItem.length)}</strong>{searchStr.substr(searchItem.length)}
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

    if (searchData.length > 0) {
      document.body.classList.add('lock-screen');
    } else {
      document.body.classList.remove('lock-screen');
    }

    return (
      <form action=".">
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
            type="search"
            onKeyPress={() => this.onkeydownclick(document.getElementById('searchInput').value)}

          />
          {this.state.inputText !== '' ? (
            <button className='search-sm-btn' onClick={this.onClearClick.bind(this)}>
              <img src={require('../../../../public/images/close.svg')} />
            </button>
          ) : (
              // <button >
              <img className='search-sm-btn'
                alt='search'
                src={require('../../../../public/images/rwd-assets/search.svg')}
              />
              // </button>
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
                          <Link className="link" to={{ pathname: '/search', search: `keyword=${item.term}`, }} onClick={() => this.onLinkNavigation(item.term)} >
                            <strong>{item.term.substr(0, searchItem.length)}</strong>{item.term.substr(searchItem.length).replace(' ', '')}
                          </Link>
                        </li>
                      );
                    }
                  })}
                </li>
                {this.renderCategorySuggestions()}
              </ul>
            </div>
          )}
        </div>
      </form>
    );
  }
}

//export default HeaderSearch;
// export default withRouter(HeaderSearch);

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
)(HeaderSearch);

