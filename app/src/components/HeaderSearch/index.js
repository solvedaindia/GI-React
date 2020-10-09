/**
 *
 * HeaderSearch
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, FormControl, FormGroup, InputGroup, Glyphicon } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form/immutable';
import { autoSuggestApi } from '../../../public/constants/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHeaderSearch from '../../selectors/components/headerSearch/selectors';
import reducer from '../../reducers/components/headerSearch/reducer';
import saga from '../../saga/components/headerSearch/saga';
import '../../../public/styles/headerSearch/headerSearch.css';

export class HeaderSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchData: null,
      searchItems: [],
      searchPlaceholder: null,
      searchTextInput: null,
      searchFirstText: null
    };
    
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  getAutoSuggestResults(searchTxt) {
    this.setState({ isLoading: true });
    fetch(autoSuggestApi + searchTxt)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong ...');
      })
      .then(data => {
        this.parseSearchData(data.suggestion_view);
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  parseSearchData(data) {
    if (data[0].entry.length != 0) {
      const items = (
        <div class="autoSearch clearfix">
          <ul>
            {data[0].entry.map(item => {
              return (
                <li><a>{item.term}</a></li>
              )
            })}
          </ul>
        </div>
      )
      this.setState({ searchItems: items })
    }
    else {
      this.setState({ searchItems: null })
    }
  }

  onInputChange(event) {
    if (event.target.value.length >= 3) {
      this.getAutoSuggestResults(event.target.value)
    }
    else {
      this.setState({ searchItems: null })
    }
    event.preventDefault();
  }

  onSearchEnter() {
    event.preventDefault();
  }

  searchInputBlur() {
    this.setState({ searchItems: null })
  }


  render() {
    const { searchItems } = this.state;
    return (
      <div className='searchbar'>
        <form onSubmit={this.onSearchEnter.bind(this)}>
          <div className='headersearch'>
            <input id='search' onChange={this.onInputChange.bind(this)} onBlur={this.searchInputBlur.bind(this)} type='text' className='form-control' placeholder='Search' autoComplete='off' />
            {searchItems}
          </div>
        </form>
      </div>
    );
  }
}

HeaderSearch.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  headerSearch: makeSelectHeaderSearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'headerSearch', reducer });
const withSaga = injectSaga({ key: 'headerSearch', saga });
const withForm = reduxForm({ form: 'headerSearch' });

export default compose(
  withReducer,
  withForm,
  withSaga,
  withConnect,
)(HeaderSearch);
