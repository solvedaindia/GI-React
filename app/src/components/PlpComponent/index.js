/**
 *
 * PlpComponent
 *
 */

import React from 'react';
//Redux Imports
import { connect } from 'react-redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from '../../containers/PlpContainer/reducer';
import saga from '../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../containers/PlpContainer/actions';
import { getReleventReduxState } from '../../utils/utilityManager';

import ProductItem from '../GlobalComponents/productItem/productItem';
import AdBanner from './AdBanner/adBanner';
import Sort from '../../components/PlpComponent/Sorting/sort';
import LoadingIndicator from '../../utils/loadingIndicator';

class PlpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plpItem: null,
      adBannerIndex: 12,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.parsePLPData(nextProps, true);
  }

  componentDidMount() {
    this.parsePLPData(this.props, false);
  }

  parsePLPData(data) {
    if (data) {
      const plpData = data.plpDataPro;
      const item = plpData.map((item, index) => {
        return (
          <>
            <ProductItem key={index} data={item} />
            <AdBanner indexPro={index + 1} />
            {/* {index === this.props.bannerPosIndex ? <AdBanner indexPro={index} dataPro={isAdBanner ? data.adBannerDataPro[0] : null} /> : null } */}
          </>
        );
      });
      this.setState({ plpItem: item });
    }
  }

  render() {

    var coloumnLayout;
    if (this.props.coloumnLayout === 3) {
      coloumnLayout = 'plp-products grid3';
    }
    else {
      coloumnLayout = 'plp-products grid2';
    }

    return (
      <div className="row no-padding">
        <ul className={coloumnLayout}>{this.state.plpItem}</ul>
      </div> 
    );
  }
}


/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => {
  return {
    //onAdBannerIndexUpdate: (currentIndex) => dispatch(actionCreators.adBannerAction(currentIndex)),
  }
};

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {
    bannerPosIndex: stateObj.adBannerPos,
    bannerCurrentIndex: stateObj.adBannerCurrentIndex,
    coloumnLayout: stateObj.columnLayout,
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
)(PlpComponent);

