import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col } from 'react-bootstrap';
import apiManger from '../../utils/apiManager';
import { compareAPI, storeId } from '../../../public/constants/constants';
import { COMPARE_SWATCH_SWITCH_ERROR_MSG } from '../../constants/app/primitivesConstants';
import * as actionCreators from '../PlpContainer/actions';
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
      isRouteUpdated: false,
      swatchIndex: [],
    }
  }

  removeSwatchIndex(id,index){
    this.state.swatchIndex.splice(index,1);
  }

  componentDidMount() {
    this.state.compWidgetData = [];
    let updatedCompData = this.props.updatedCompData;
    if (this.props.updatedCompData.length === 0 && appCookie.get('compareProductTemp') && JSON.parse(appCookie.get('compareProductTemp')).length > 0) {
      updatedCompData = JSON.parse(appCookie.get('compareProductTemp'));
    }
    if(!updatedCompData || updatedCompData.length <2){
      this.props.history.push('/');
    }
    updatedCompData.forEach(element => {
      this.state.compWidgetData.push(element.skuId);
      this.state.swatchIndex.push(element.skuId);
    });
    
    this.callCompareApi();
  }


  componentWillUnmount() {
    let updatedCompData = this.props.updatedCompData;
    if (this.props.updatedCompData.length === 0 && appCookie.get('compareProductTemp') && JSON.parse(appCookie.get('compareProductTemp')).length > 0) {
      updatedCompData = JSON.parse(appCookie.get('compareProductTemp'));
      updatedCompData.map(data => {
        this.props.addProduct(data);
      })
    }
  }

  componentWillReceiveProps(nextProps) {
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
    let cookieIdArray = new Array();
    if (ids.length === 0 && appCookie.get('compareProductTemp') && JSON.parse(appCookie.get('compareProductTemp'))) {
      JSON.parse(appCookie.get('compareProductTemp')).map(dataId => {
        cookieIdArray.push(dataId.skuId);
      });
      ids = cookieIdArray;
    }

    apiManger.get(`${compareAPI}?ids=${ids}`, {
      headers: {
        store_id: storeId,
        access_token: token
      }
    }).then(response => {
      this.setState({
        data: response.data.data,
        loading: false
      });
      this.renderPrd();
    }).catch(error => {
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
    this.props.history.goBack();
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
        return sKU.uniqueID == this.state.swatchIndex[0];
      });
      if (sku1) {
        sku1.parentProductId = data.uniqueId;
        sku1.specs = data.attributes;
        sku1.swatches = data.swatches;

        if (!skuIdsArr.includes(sku1.uniqueID)) {
          skuIdsArr.push(sku1.uniqueID);
          prds.push(sku1)
          return;
        }

      }
      if (this.state.compWidgetData.length > 1) {
        var sku2 = data.sKUs.find(sku => {
          return sku.uniqueID == this.state.swatchIndex[1];
        })
        if (sku2) {
          sku2.parentProductId = data.uniqueId;
          sku2.specs = data.attributes;
          sku2.swatches = data.swatches;

          if (!skuIdsArr.includes(sku2.uniqueID)) {
            skuIdsArr.push(sku2.uniqueID);
            prds.push(sku2)
            return;
          }

        }
      }
      if (this.state.compWidgetData.length > 2) {
        var sku3 = data.sKUs.find(sku => {
          return sku.uniqueID == this.state.swatchIndex[2];
        })
        if (sku3) {
          sku3.parentProductId = data.uniqueId;
          sku3.specs = data.attributes;
          sku3.swatches = data.swatches;

          if (!skuIdsArr.includes(sku3.uniqueID)) {
            skuIdsArr.push(sku3.uniqueID);
            prds.push(sku3);
            return;
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
    var cookieData = JSON.parse(appCookie.get('compareProductTemp'));
    var skuIdsArr = [];
    var reverse_data = this.state.data;
    if (!reverse_data) {
      return
    }
    reverse_data.forEach( (data,index) => {
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
        
          if(cookieData!=null && index<cookieData.length)
          {
            
            cookieData[index].actualPrice=sku1.actualPrice;
            cookieData[index].offerPrice=sku1.offerPrice;
            cookieData[index].skuId=sku1.uniqueID;
            cookieData[index].thumbnail=sku1.thumbnail;
          }

        }
      }
    })
    
    appCookie.set('compareProductTemp', JSON.stringify(cookieData), 365 *24 *60 *60 *1000);
    this.setState({
      prds: prds,
      compCount: prds.length,
    })
  }

  swatchHandle = (id, index, name) => {
    const indexOf = this.state.compWidgetData.findIndex(value=>id===value);
    if(indexOf==index)
      return;
    else if(indexOf>=0)
    {
      alert(COMPARE_SWATCH_SWITCH_ERROR_MSG);
      return;
    }
    else{
       this.state.compWidgetData[index] = id;
       this.state.swatchIndex[index] = id;
       this.updateSingleCompProduct(index);
    }
     
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
    this.state.compWidgetData = this.state.compWidgetData.filter(el => el !== data);   

    this.state.data = this.state.data.filter(element=>element.uniqueId!==data)
    this.renderPrd();
    this.props.removeProduct(data);
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
          {this.state.prds ? <CompPrd 
                              compWidgetData={this.state.compWidgetData}
                              data={this.state.prds} 
                              isRouteUpdated={this.state.isRouteUpdated} 
                              remove={this.removeCompareId.bind(this)} 
                              history={this.props.history}  
                              removeSwatchIndex = {(id,index)=>this.removeSwatchIndex(id,index)} 
                              swatchHandle={this.swatchHandle} /> : ''}</>}

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
  updateSKU: obj => dispatch(actionCreators.updateSKU(obj)),
  addProduct: product => dispatch(actionCreators.AddProduct(product))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
)(ComparePageContainer);