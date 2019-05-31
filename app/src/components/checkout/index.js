import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import '../../../public/styles/checkout.scss';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import axios from 'axios';
import Link from 'react-router-dom/Link';
import { Step1Component } from './step1';
import { Step2Component } from './step2';
import { Step3Component } from './step3';
import { OrderSummaryComponent } from './orderSummary'
import loadable from 'loadable-components';
import {
    getReleventReduxState
  } from '../../utils/utilityManager';
import { blue } from 'ansi-colors';

export class CheckoutComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          has_pass: false,
          same_bill: true,
          step: 1,
          showGift: false,
          loggedIn: false
        }
    }

    componentDidMount() {
        var coke = document.cookie;
        if(coke.isLoggedIn == true) {
            this.setState({
                loggedIn: true
            })
        }
    }

    handleHasPass = () => {
      if(this.state.has_pass == false) {
        this.setState({
          has_pass: true
        })
      } else {
        this.setState({
          has_pass: false
        })
      }
    }

    handleChange = () => {
      if(this.state.step == 2) {
        this.setState({
          step: 1
        })
      } else {
        this.setState({
          step: 2
        })
      }
    }

    handleSameBill = () => {
      if(this.state.same_bill == false) {
        this.setState({
          same_bill: true
        })
      } else {
        this.setState({
          same_bill: false
        })
      }
    }

    showGiftCard = () => {
        
    }

    handleChangeMobile = () => {
      this.setState({
        step: 1
      })
    }

    handleStep = () => {
        if(this.state.step == 3) {
            return <Step3Component back={this.handleChange} backtoMobile={this.handleChangeMobile} />             
        } else if(this.state.step == 2) {
            return <Step2Component proceed={this.handleProceed} back={this.handleChange} />
        } else {
            return <Step1Component proceed={this.handleProceed} />
        }
    }

    handleProceed = () => {
      if(this.state.step == 1) {
        this.setState({
          step: 2,
          has_pass: false
        })
      } else if(this.state.step == 2) {
        this.setState({
          step: 3
        })
      }
    }

    render() {
      return (
        <div className="container" style={{marginBottom: '100px'}}>
          <div className="row">
            <h2 style={{fontWeight: "bold"}}>Checkout</h2>
            {this.handleStep()}
            <div className="col-md-4">
              <OrderSummaryComponent />
            </div>
          </div>
        </div>
      )
    }
}