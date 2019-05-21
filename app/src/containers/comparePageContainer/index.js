import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import axios from 'axios';
import { compareAPI, storeId, accessToken } from '../../../public/constants/constants';
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
      console.log(this.props, "these are props on compare page");
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
        console.log(response.data, "response--")
        this.setState({data: response.data.data});
      }).catch(error => {
        console.log(error);
      })
    }

    renderPrd() {
      console.log(this.state, "state data in compcontainer")
      return <CompPrd product={this.state.data[0].sKUs[0]}/>
    }

    render() {
      console.log(this.state.data);
      return (
        <div className="container">
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

const withConnect = connect(
    mapStateToProps
  );
  
//   const withReducer = injectReducer({ key: 'plpContainer', reducer });
//   const withSaga = injectSaga({ key: 'plpContainer', saga });
  
  export default compose(
    withConnect,
  )(ComparePageContainer);