import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import axios from 'axios';
import { compareAPI, storeId, accessToken } from '../../../public/constants/constants';
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
      axios.get(`${compareAPI}?ids=${ids}`, {
        headers: { store_id: '10151', access_token: accessToken }
      }).then(response => {
        this.setState({data: response.data.data});
      }).catch(error => {
        console.log(error);
      })
    }

    renderPrd = () => {
      console.log(this.props.compWidgetData, "frd---")
      var prds = [];
      this.state.data.forEach(data => {
        var sku1 = data.sKUs.find(sKU => {
          return sKU.uniqueID == this.props.compWidgetData[0].skuId;
        });
        if(sku1) {
          console.log("sky1 found frd");
          prds.push(sku1)
        }
        var sku2 = data.sKUs.find(sku => {
          return sku.uniqueID == this.props.compWidgetData[1].skuId;
        })
        if(sku2) {
          prds.push(sku2)
        } 
      })
      return <CompPrd data={prds}/>
    }

    render() {
      console.log(this.state.data);
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
            <Link to="#" className="back-btn">Go Back</Link>
            </div>
          </div>
          <h2>Compare Products {this.state.data.length}/3</h2>
          <div className="row compare-product-list">{this.state.data ? this.renderPrd() : ''}</div>
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

const withConnect = connect(
    mapStateToProps
  );
  
//   const withReducer = injectReducer({ key: 'plpContainer', reducer });
//   const withSaga = injectSaga({ key: 'plpContainer', saga });
  
  export default compose(
    withConnect,
  )(ComparePageContainer);