import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Grid } from 'react-bootstrap';
import apiManger from '../../utils/apiManager';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import axios from 'axios';
import { compareAPI, storeId, accessToken, pinCodeAPI, findinventoryAPI } from '../../../public/constants/constants';
import * as actionCreators from '../PlpContainer/actions';
import Link from 'react-router-dom/Link';
import {
  getReleventReduxState
} from '../../utils/utilityManager';
import CompPrd from '../../components/compareComponents/compreProduct';
import appCookie from '../../utils/cookie';

export class ComparePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      prds: null,
      compCount: null,
      compWidgetData: [],
      loading: true,
      isRouteUpdated: false
    }
  }

  componentDidMount() {
    this.state.compWidgetData = [];
    this.props.updatedCompData.forEach(element => {
      this.state.compWidgetData.push(element.skuId);
    });
    //this.state.compWidgetData = this.props.updatedCompData
    this.callCompareApi();

  }

  componentWillReceiveProps(nextProps) {
    console.log('icicic --- ', nextProps);
    if (nextProps.updatedCompData !== this.props.updatedCompData) {
      this.state.compWidgetData = [];
      nextProps.updatedCompData.forEach(element => {
        this.state.compWidgetData.push(element.skuId);
      });
      //this.state.compWidgetData = nextProps.updatedCompData
      this.renderPrd()
    }
  }

  callCompareApi = () => {
    var ids = this.state.compWidgetData;
    var token = appCookie.get('accessToken');
    // this.state.compWidgetData.forEach(element => {
    //   ids.push(element.skuId);
    // });

    let params = new URLSearchParams(this.props.location.search);
    const compIdStr = params.get('ids');
    if (compIdStr != null) { //Load page from Route search params
      const compIdArr = compIdStr.split('/');
      if (compIdArr.length !== 0) {
        ids = compIdArr
        this.state.compWidgetData = compIdArr;
      }
    }
    else {
      //this.updateRoute();
    }



    apiManger.get(`${compareAPI}?ids=${ids}`, {
      headers: {
        store_id: storeId,
        access_token: token
      }
    }).then(response => {

      this.setState({
        data: response.data.data.reverse(),
        loading: false
      });
      console.log(response.data.data, 'data from api')
      this.renderPrd();
    }).catch(error => {
      console.log(error);
      this.setState({
        loading: false
      })
    })
  }

  updateRoute() {
    let params = new URLSearchParams(this.props.location.search);
    var searchParam = '';
    this.state.compWidgetData.reverse().map((skuId, index) => {
      searchParam += `${skuId}${this.state.compWidgetData.length === index + 1 ? '' : '/'}`
    })
    this.setState({
      isRouteUpdated: true
    })
    params.set(`ids`, searchParam);
    let finalMap = params.toString();
    this.props.history.push({ search: finalMap });
  }

  goBack = () => {
    if (this.state.isRouteUpdated === true) {
      window.history.go(-2)
    } else {
      window.history.go(-1)
    }
  }

  renderPrd = () => {
    var prds = [];

    var skuIdsArr = [];
    var reverse_data = this.state.data;
    if (!reverse_data) {
      return
    }
    reverse_data.forEach(data => {
      var sku1 = data.sKUs.find(sKU => {
        return sKU.uniqueID == this.state.compWidgetData[0];
      });
      if (sku1) {
        sku1.parentProductId = data.uniqueId;
        sku1.specs = data.attributes;
        sku1.swatches = data.swatches;

        if (!skuIdsArr.includes(sku1.uniqueID)) {
          skuIdsArr.push(sku1.uniqueID);
          prds.push(sku1)
        }

      }
      if (this.state.compWidgetData.length > 1) {
        var sku2 = data.sKUs.find(sku => {
          return sku.uniqueID == this.state.compWidgetData[1];
        })
        if (sku2) {
          sku2.parentProductId = data.uniqueId;
          sku2.specs = data.attributes;
          sku2.swatches = data.swatches;

          if (!skuIdsArr.includes(sku2.uniqueID)) {
            skuIdsArr.push(sku2.uniqueID);
            prds.push(sku2)
          }

        }
      }
      if (this.state.compWidgetData.length > 2) {
        var sku3 = data.sKUs.find(sku => {
          return sku.uniqueID == this.state.compWidgetData[2]
        })
        if (sku3) {
          sku3.parentProductId = data.uniqueId;
          sku3.specs = data.attributes;
          sku3.swatches = data.swatches;

          if (!skuIdsArr.includes(sku3.uniqueID)) {
            skuIdsArr.push(sku3.uniqueID);
            prds.push(sku3);
          }

        }
      }

    })

    this.setState({
      prds: prds,
      compCount: prds.length,
    })
  }

  updateSingleCompProduct(index) {

    var prds = this.state.prds;

    var skuIdsArr = [];
    var reverse_data = this.state.data;
    if (!reverse_data) {
      return
    }
    reverse_data.forEach(data => {
      var sku1 = data.sKUs.find(sKU => {
        return sKU.uniqueID == this.state.compWidgetData[index];
      });
      if (sku1) {
        sku1.parentProductId = data.uniqueId;
        sku1.specs = data.attributes;
        sku1.swatches = data.swatches;

        if (!skuIdsArr.includes(sku1.uniqueID)) {
          skuIdsArr.push(sku1.uniqueID);
          prds[index] = sku1;
        }
      }
    })

    this.setState({
      prds: prds,
      compCount: prds.length,
    })
  }

  swatchHandle = (id, index, name) => {

    if (!this.state.compWidgetData.includes(id)) {
      this.state.compWidgetData[index] = id;
      //this.renderPrd()
      this.updateSingleCompProduct(index);
      //this.updateRoute();
    }

    // var obj = {
    //   id: id,
    //   index: index,
    //   name: name
    // };

    // if (index == 0) {

    // }
    // this.props.updateSKU(obj);
  }

  loadingbar() {
    return (
      <div className="lazyloading-Indicator">
        <img
          id="me"
          alt='loader'
          className="loadingImg"
          src={require('../../../public/images/plpAssests/lazyloadingIndicator.svg')}
        />
      </div>
    )
  }

  removeCompareId(data) {
    console.log('remev data ----- ', data);
    this.state.compWidgetData = this.state.compWidgetData.filter(el => el !== data);
    this.renderPrd()
    this.updateRoute();
  }

  render() {
    return (
      <div className="container compare-product">
        <Row>
          <Col xs={12} sm={12} md={12} className="back-btn-box">
            <button to="#" className="back-btn" onClick={this.goBack}><img
              className="backlogoImg"
              src={require('../../../public/images/LeftArrow.svg')}
              alt='logo'
            /> Go Back</button>
          </Col>
        </Row>
        {this.state.loading ? this.loadingbar() : <>{this.state.data ? <Row><h1 className="heading">Compare Products {this.state.compCount}/3</h1></Row> : null}
          {this.state.prds ? <CompPrd data={this.state.prds} remove={this.removeCompareId.bind(this)} swatchHandle={this.swatchHandle} /> : ''}</>}

      </div>
    )
  }
}

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {
    updatedCompData: stateObj.compWidgetData
  };
};

const mapDispatchToProps = dispatch => ({
  removeProduct: id => dispatch(actionCreators.RemoveProduct(id)),
  updateSKU: obj => dispatch(actionCreators.updateSKU(obj))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

//   const withReducer = injectReducer({ key: 'plpContainer', reducer });
//   const withSaga = injectSaga({ key: 'plpContainer', saga });

export default compose(
  withConnect,
)(ComparePageContainer);