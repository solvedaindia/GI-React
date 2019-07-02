import React from 'react';
//Redux Imports
import { connect } from 'react-redux';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import { getReleventReduxState, fetchReleventSortingValue, fetchReleventSortingValueByIndex } from '../../../utils/utilityManager';

import { Link, withRouter, NavLink, Redirect } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../../../utils/imageLoader';
import {
  newMachineUrl,
  store,
  catalog,
  imagePrefix,
} from '../../../../public/constants/constants';

class SubCatImage extends React.Component {

  onLinkNavigation = () => {
    this.props.plpReduxStateReset();
  }

  render() {
    console.log('Subcatttt---', this.props);
    var subcatName = String(this.props.categoryNamePro).toLowerCase()
    var routePath = `/furniture-${subcatName.split(' ').join('-')}/${this.props.uniqueIdPro}`;
    return (
      <Link className="link" to={routePath} onClick={this.onLinkNavigation}>
        <div className="Imgbox">
          {' '}
          <ImageLoader
            className="imgfullwidth"
            src={`${imagePrefix}/${this.props.imageData}`}
            alt="mattresses"
          />
        </div>
      </Link>
    );
  }
}

// export default withRouter(SubCatImage);

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
)(SubCatImage);
