import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

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
      axios.get(`${compareAPI}?ids=${ids}`, {
        headers: { store_id: '10151', access_token: accessToken }
      }).then(response => {
        this.setState({data: response.data.data});
      }).catch(error => {
        console.log(error);
      })
    }

    renderPrd = () => {
      var prds = [];
      var reverse_data = this.state.data.reverse();
      reverse_data.forEach(data => {
        var sku1 = data.sKUs.find(sKU => {
          return sKU.uniqueID == this.props.compWidgetData[0].skuId;
        });
        if(sku1) {
          prds.push(sku1)
        }
        if(this.props.compWidgetData.length > 1) {
          var sku2 = data.sKUs.find(sku => {
            return sku.uniqueID == this.props.compWidgetData[1].skuId;
          })
          if(sku2) {
            prds.push(sku2)
          }
        }
        if(this.props.compWidgetData.length > 2) {
          var sku3 = data.sKUs.find(sku => {
            return sku.uniqueID == this.props.compWidgetData[2].skuId
          })
          if(sku3) {
            prds.push(sku3);
          }
        } 
      })
      return <CompPrd data={prds} remove={this.props.removeProduct} />
    }

    render() {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
            <Link to="#" className="back-btn">Go Back</Link>
            </div>
          </div>
          <h2>Compare Products {this.state.data.length}/3</h2>
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