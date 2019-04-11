import React from 'react';
//Redux Imports
import { connect } from 'react-redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from '../../reducers/plpContainer/reducer';
import saga from '../../saga/plpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../actions/plpContainer/actions';
import { getReleventReduxState } from '../../utils/utilityManager';

import { Link, Route } from 'react-router-dom';

const bannerImg = <img className='adBannerWidth' src={require('../../../public/images/plpAssests/mask@3x.png')} />
class AdBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adBannerIndex: 12,
            adBannerItem: null,
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     //console.log('---- In The Banner ----');
    //     if (nextProps) {
    //         let bannerItem = null;
    //         if (nextProps.indexPro === this.state.adBannerIndex) {
    //             bannerItem = bannerImg
    //             //Increase the Count in Redux state for ADBANNERCOUNT
    //             console.log('Its Dispatching');
    //             //this.props.onAdBannerIndexUpdate
    //             this.setState({

    //                 adBannerIndex: this.state.adBannerIndex + 12,
    //                 adBannerItem: bannerItem
    //             });
    //         }

    //     }

    // }

    componentDidMount() {
        
        if (this.props.indexPro) {
            let bannerItem = null;
            if (this.props.indexPro === this.props.bannerPosIndex) {
                console.log('---- In The Banner ----', this.props.indexPro);
                bannerItem = bannerImg
                this.props.onAdBannerIndexUpdate(this.props.indexPro);
                this.setState({
                    // adBannerIndex: this.state.adBannerIndex + 12,
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
        onAdBannerIndexUpdate: (currentIndex) => dispatch(actionCreators.adBannerAction(currentIndex)),
    }
};

const mapStateToProps = state => {
    const stateObj = getReleventReduxState(state, 'plpContainer');
    console.log('AdBanner mapStateToProps', stateObj.adBannerPos);
    return {
        bannerPosIndex: stateObj.adBannerPos,
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


