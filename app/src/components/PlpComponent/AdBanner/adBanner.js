import React from 'react';
//Redux Imports
import { connect } from 'react-redux';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import { getReleventReduxState } from '../../../utils/utilityManager';

import { Link, Route } from 'react-router-dom';

class AdBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adBannerItem: null,
    };
  }

  componentDidUpdate() {
    this.initializeAdBanner();
  }

  componentDidMount() {
    this.initializeAdBanner();
  }

  initializeAdBanner() {
    if (this.props.indexPro) {
      let bannerItem = null;
      if (this.props.indexPro === this.props.bannerPosIndex && (this.props.bannerData.length > this.props.bannerCurrentIndex)) {
        bannerItem = <a href={this.props.bannerData[this.props.bannerCurrentIndex].onClickUrl}>
        <img className='adBannerWidth' src={this.props.bannerData[this.props.bannerCurrentIndex].imageSrc} />
      </a>
        this.props.onAdBannerIndexUpdate(this.props.indexPro, this.props.bannerCurrentIndex);
        this.setState({
          adBannerItem: bannerItem
        });
      }
    }
  }

  render() {
    return (
      <>
        {this.state.adBannerItem}
      </>
    );
  }
}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => {
  return {
    onAdBannerIndexUpdate: (currentIndex, currentShowIndex) => dispatch(actionCreators.adBannerAction(currentIndex, currentShowIndex)),
  }
};

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {
    bannerPosIndex: stateObj.adBannerPos,
    bannerCurrentIndex: stateObj.adBannerCurrentIndex,
    bannerData: stateObj.adBannerData,
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
)(AdBanner);


