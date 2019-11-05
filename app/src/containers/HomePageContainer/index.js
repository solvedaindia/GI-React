/**
 *
 * HomePageContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectHomePageContainer from '../../selectors/homePageContainer/selectors';
import reducer from '../../reducers/homePageContainer/reducer';
import saga from '../../saga/homePageContainer/saga';
import HomePageStatic from '../../components/HomePageStatic/homePageStatic';

export class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: {},
      isLoading: false,
      error: null,
    };
  }

  
  render() {
    return (
      <HomePageStatic />
    );
  }
}

HomePageContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePageContainer: makeSelectHomePageContainer(),
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

const withReducer = injectReducer({ key: 'homePageContainer', reducer });
const withSaga = injectSaga({ key: 'homePageContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePageContainer);
