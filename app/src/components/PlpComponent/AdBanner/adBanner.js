import React from "react";
//Redux Imports
import { connect } from "react-redux";
import injectSaga from "../../../utils/injectSaga";
import injectReducer from "../../../utils/injectReducer";
import reducer from "../../../containers/PlpContainer/reducer";
import saga from "../../../containers/PlpContainer/saga";
import { compose } from "redux";
import * as actionCreators from "../../../containers/PlpContainer/actions";
import { getReleventReduxState } from "../../../utils/utilityManager";

import { Link, Route } from "react-router-dom";

class AdBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adBannerItem: null
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
      if (
        this.props.indexPro === this.props.bannerPosIndex &&
        this.props.bannerData.length > this.props.bannerCurrentIndex
      ) {
        // <li style ={{height:'0px',position:'relative',marginTop:'-17px'}}></li>
        let count = 0;
        let emptyItem = null;
        if (this.props.columnCount === 3 || this.props.fromWishList === true) {
          count = 3;
          emptyItem = (
            <>
              <li />
              <li />
            </>
          );
          if (this.props.isMobile) {
            count = 2;
            emptyItem = <li />;
          }
        } else {
          count = 2;
          emptyItem = <li />;
          if (this.props.isMobile) {
            count = 1;
            emptyItem = null;
          }
        }

        //'https://uatinterio.godrej.com/imagestore/B2C/EspotImages/Images/Banners/Products_wardrobes_bottom_banner.png'
        bannerItem = (
          <>
            {emptyItem}
            <a
              href={
                this.props.bannerData[this.props.bannerCurrentIndex].onClickUrl
              }
            >
              <img
                className="adBannerWidth"
                src={
                  this.props.bannerData[this.props.bannerCurrentIndex].imageSrc
                }
                alt={
                  this.props.bannerData[this.props.bannerCurrentIndex].alt !==
                  undefined
                    ? this.props.bannerData[this.props.bannerCurrentIndex].alt
                    : "SsS"
                }
              />
            </a>
          </>
        );

        this.props.onAdBannerIndexUpdate(
          this.props.indexPro,
          this.props.bannerCurrentIndex
        );
        this.setState({
          adBannerItem: bannerItem
        });
      }
    }
  }

  render() {
    return <>{this.state.adBannerItem}</>;
  }
}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => {
  return {
    onAdBannerIndexUpdate: (currentIndex, currentShowIndex) =>
      dispatch(actionCreators.adBannerAction(currentIndex, currentShowIndex))
  };
};

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, "plpContainer");
  return {
    bannerPosIndex: stateObj.adBannerPos,
    bannerCurrentIndex: stateObj.adBannerCurrentIndex,
    bannerData: stateObj.adBannerData
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "plpContainer", reducer });
const withSaga = injectSaga({ key: "plpContainer", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(AdBanner);
