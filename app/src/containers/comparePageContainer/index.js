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
import { compareAPI, storeId, accessToken, pinCodeAPI } from '../../../public/constants/constants';
import * as actionCreators from '../PlpContainer/actions';
import Link from 'react-router-dom/Link';
import {
    getReleventReduxState
  } from '../../utils/utilityManager';
import CompPrd from '../../components/compareComponents/compreProduct';
import appCookie from '../../utils/cookie';

export class ComparePageContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          data: '',
          prds: null,
          loading: true,
        }
    }

    componentDidMount() {
      this.callCompareApi();
    }

    componentWillReceiveProps(prevPorps, currentProp) {
      this.renderPrd()
    }

    callCompareApi = () => {
      var ids = [];
      var token = appCookie.get('accessToken');
      this.props.compWidgetData.forEach(element => {
        ids.push(element.skuId);
      });
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

    goBack = () => {
      this.props.history.goBack();
    }

    callDeliveryDateAPI = (id, partNumber) => {
      var token = appCookie.get('accessToken');
      var defPin = appCookie.get('pincode');
      var url = `${pinCodeAPI}${defPin}?partnumber=${partNumber}&quantity=1&uniqueid=${id}`
      axios.get(url, {
        headers: {
          store_id: storeId,
          access_token: token
        }
      }).then((resp) => {
        console.log(resp, "delivery date response")
      }).catch((err) => {
        console.log(err, "delivery date err")
      })
    }

    renderPrd = () => {
      var prds = [];
      
      var skuIdsArr = [];
      var reverse_data = this.state.data;
      if (!reverse_data) {
        return
      }
      console.log('Reserv Data --- ', reverse_data);
      reverse_data.forEach(data => {
        var sku1 = data.sKUs.find(sKU => {
          return sKU.uniqueID == this.props.compWidgetData[0].skuId;
        });
        if(sku1) {
          this.callDeliveryDateAPI(sku1.uniqueID, sku1.partNumber)
          sku1.parentProductId = data.uniqueID;
          sku1.specs = data.attributes;
          sku1.swatches = data.swatches;
          
          if (!skuIdsArr.includes(sku1.uniqueID)) {
            skuIdsArr.push(sku1.uniqueID);
            prds.push(sku1)
          }
          
        }
        if(this.props.compWidgetData.length > 1) {
          var sku2 = data.sKUs.find(sku => {
            return sku.uniqueID == this.props.compWidgetData[1].skuId;
          })
          if(sku2) {
            sku2.parentProductId = data.uniqueID;
            sku2.specs = data.attributes;
            sku2.swatches = data.swatches;

            if (!skuIdsArr.includes(sku2.uniqueID)) {
              skuIdsArr.push(sku2.uniqueID);
            prds.push(sku2)
            }
            
          }
        }
        if(this.props.compWidgetData.length > 2) {
          var sku3 = data.sKUs.find(sku => {
            return sku.uniqueID == this.props.compWidgetData[2].skuId
          })
          if(sku3) {
            sku3.parentProductId = data.uniqueID;
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
        prds: prds
      })
    }

    swatchHandle = (id, index, name) => {
      var obj = {
        id: id,
        index: index,
        name: name
      };

      if(index == 0) {

      }
      console.log(obj, 'swatch data', this.props.compWidgetData)
      this.props.updateSKU(obj);
    }

    loadingbar() {
      return (
        <div className="lazyloading-Indicator">
            <img
              id="me"
              className="loadingImg"
              src={require('../../../public/images/plpAssests/lazyloadingIndicator.svg')}
            />
          </div>
      )
    }

    render() {
      console.log('Commmmm --- ',this.state.data)
      return (
        <div className="container compare-product">
          <Row>
            <Col xs={12} sm={12} md={12} className="back-btn-box">
            <button to="#" className="back-btn" onClick={this.goBack}>Go Back</button>
            </Col>
          </Row>
          {this.state.loading ? this.loadingbar() : <>{this.state.data ? <Row><h1 className="heading">Compare Products {this.state.data.length}/3</h1></Row> : null }
          {this.state.prds ? <CompPrd data={this.state.prds} remove={this.props.removeProduct} swatchHandle={this.swatchHandle} /> : ''}</> }
          
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