import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col,Grid } from 'react-bootstrap';
import apiManger from '../../utils/apiManager';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import axios from 'axios';
import { compareAPI, storeId, accessToken } from '../../../public/constants/constants';
import * as actionCreators from '../PlpContainer/actions';
import Link from 'react-router-dom/Link';
import {
    getReleventReduxState
  } from '../../utils/utilityManager';
import CompPrd from '../../components/compareComponents/compreProduct';

export class ComparePageContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          data: ''
        }
    }

    componentDidMount() {
      this.callCompareApi();
    }

    callCompareApi = () => {
      var ids = [];
      this.props.compWidgetData.forEach(element => {
        ids.push(element.id);
      });
      apiManger.get(`${compareAPI}?ids=${ids}`, {
        headers: { }
      }).then(response => {
        this.setState({data: response.data.data});
        console.log(response.data.data, 'data from api')
      }).catch(error => {
        console.log(error);
      })
    }

    goBack = () => {
      this.props.history.goBack();
    }

    renderPrd = () => {
      var prds = [];
      var reverse_data = this.state.data.reverse();
      reverse_data.forEach(data => {
        var sku1 = data.sKUs.find(sKU => {
          return sKU.uniqueID == this.props.compWidgetData[0].skuId;
        });
        if(sku1) {
          sku1.parentProductId = data.uniqueID;
          sku1.specs = data.attributes
          prds.push(sku1)
        }
        if(this.props.compWidgetData.length > 1) {
          var sku2 = data.sKUs.find(sku => {
            return sku.uniqueID == this.props.compWidgetData[1].skuId;
          })
          if(sku2) {
            sku2.parentProductId = data.uniqueID;
            sku2.specs = data.attributes
            prds.push(sku2)
          }
        }
        if(this.props.compWidgetData.length > 2) {
          var sku3 = data.sKUs.find(sku => {
            return sku.uniqueID == this.props.compWidgetData[2].skuId
          })
          if(sku3) {
            sku3.parentProductId = data.uniqueID;
            sku3.specs = data.attributes
            prds.push(sku3);
          }
        } 
      })
      console.log(prds, 'this is prds ')
      return <CompPrd data={prds} remove={this.props.removeProduct} />
    }

    render() {
      return (
        <div className="container compare-product">
          <Row>
            <Col xs={12} sm={12} md={12} className="back-btn-box">
            <button to="#" className="back-btn" onClick={this.goBack}>Go Back</button>
            </Col>
          </Row>
          <Row><h2 className="heading">Compare Products {this.state.data.length}/3</h2></Row>
          {this.state.data ? this.renderPrd() : ''}
        </div>
      )
    }
}

const mapStateToProps = state => {
    const stateObj = getReleventReduxState(state, 'plpContainer');
    return {
      compWidgetData: stateObj.compWidgetData 
    };
};

const mapDispatchToProps = dispatch => ({
  removeProduct: id => dispatch(actionCreators.RemoveProduct(id))
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