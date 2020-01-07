import React from 'react';
//Redux Imports
import { connect } from 'react-redux';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import {createCategoryPlpURL, getReleventReduxState, fetchReleventSortingValue, fetchReleventSortingValueByIndex } from '../../../utils/utilityManager';

import { Link, withRouter, NavLink, Redirect } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../../../utils/imageLoader';
import {
  imagePrefix,
} from '../../../../public/constants/constants';

class SubCatImage extends React.Component {

  onLinkNavigation = () => {
    this.props.plpReduxStateReset();
  }

  render() {
    var subcatName = String(this.props.categoryNamePro).toLowerCase()
    var routePath = createCategoryPlpURL(this.props.uniqueIdPro);
    return (
      <Link className="link" to={routePath} onClick={this.onLinkNavigation}>
        <div className="Imgbox">
          {' '}
          <ImageLoader
            className="imgfullwidth"
            // src={`${imagePrefix}/${this.props.imageData}`}
            src={this.props.imageData !== '' ? `${imagePrefix}/${this.props.imageData}` : require('../../../../public/images/plpAssests/placeholder-image.png')} onError={require('../../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth"
            alt={this.props.altImage ? this.props.altImage : ''}
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
