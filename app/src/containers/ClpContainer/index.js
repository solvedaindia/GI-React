/**
 *
 * ClpContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectClpContainer from '../../selectors/clpContainer/selectors';

import reducer from '../../reducers/clpContainer/reducer';
import saga from '../../saga/clpContainer/saga';
import '../../../public/styles/clpContainer/clpContainer.scss';
import ClpComponent from '../../components/ClpComponent/index';
import '../../../public/styles/app.scss';

export class ClpContainer extends React.Component {
  render() {
    return (
      <ClpComponent />
    );
  }
}

ClpContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  clpContainer: makeSelectClpContainer(),
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

const withReducer = injectReducer({ key: 'clpContainer', reducer });
const withSaga = injectSaga({ key: 'clpContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ClpContainer);
