import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';

import close from '../../../public/images/close.svg';
import Link from 'react-router-dom/Link';
import TopContainer from './topContainer'
import DelContainer from './delivery'
class CompPrd extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }
    renderProducts = () => {
      console.log(this.props, "this is remove function")
      var prds = [];
      this.props.data.map(element => {
        prds.push(<TopContainer product={element} remove={this.props.remove} count={this.props.data.length} />)
      });
      return prds;
    }

    renderDims = () => {
      var dims = [];
      var weights = [];
      var heights = [];
      var Depth = [];
      this.props.data.map((elem, index) => {
        weights.push(
            <div className={index == 0 ?"col-md-6 attr-dims" : index ==1 ? 'col-md-4' : "col-md-2"}>
              {index == 0 ? <div><span className="col-md-5">Weight</span> <span className="col-md-7">80 cm</span></div> : <p>80 cm</p>}
            </div>)
        heights.push(
          <div className={index == 0 ?"col-md-6 attr-dims" : index ==1 ? 'col-md-4' : "col-md-2"}>
              {index == 0 ?  <div><span className="col-md-5">Height</span> <span className="col-md-7">120 cm</span></div> : <p>120 cm</p>}
            </div>)
        Depth.push(
          <div className={index == 0 ?"col-md-6 attr-dims" : index ==1 ? 'col-md-4' : "col-md-2"}>
              {index == 0 ?  <div><span className="col-md-5">Depth</span> <span className="col-md-7">100 cm</span></div> : <p>100 cm</p>}
            </div>)
      })

      dims.push(<div className="row">{weights}</div>)
      dims.push(<div className="row">{heights}</div>)
      dims.push(<div className="row">{Depth}</div>)

      return dims;
    }

    renderImages = () => {
      var images = [];
      this.props.data.map(elem => {
        images.push(
          <div className="col-md-4 comp-list-item">
              <div className="img-box">  
              <img src={`https://192.168.0.36:8443${elem.thumbnail}`} />
              </div>
        </div>)
      })
      return images;
    }

    renderPayment = () => {
      var payments = [];
      this.props.data.map(elem => {
        payments.push(
          <div className="col-md-4 comp-cod-option text-center">
            <h4>COD available</h4>
          </div>
        )
      });
      return payments;
    }

    renderSpecs = () => {
      var specs = [];
      this.props.data[0].attributes.map((att, index) => {
        if(this.props.data.length > 1) {
          var second_att = this.props.data[1].attributes.find(s_att => {
            return s_att.uniqueID == att.uniqueID
          })
        }
        if(this.props.data.length > 2) {
          var third_att = this.props.data[2].attributes.find(t_att => {
            return t_att.uniqueID == att.uniqueID
          })
        }
        specs.push(
          <div className="row specifec-detail">
            <div className="col-md-6 attr-details">
              <span className="col-md-5">{att.name}</span> <span className="col-md-7">{att.value}</span>
            </div>
 
            <div className="col-md-4">
              {this.props.data.length > 1 ? second_att ? <p>{second_att.value}</p> : 'NA' : ''}
            </div>
            <div className="col-md-2">
              {this.props.data.length > 2 ? third_att ? <p>{third_att.value}</p> : 'NA' : ''}
            </div>
          </div>
        )
      });
      return specs;
    }

    renderDelivery = () => {
      var dels = [];
      this.props.data.map(elem => {
        dels.push(<DelContainer />)
      })
      return dels;
    }
    render() {
      return (
        <div className="compare-product-list">
          <div className="row">{this.renderProducts()}</div>
          <h2>Delivery</h2>
          <div className="row prod-delivery-slot">{this.renderDelivery()}</div>
          <h2>Dimensions</h2>
          <div className="row">{this.renderImages()}</div>
          <div className="dims-detail">{this.renderDims()}</div>

          <h2>Specifications</h2>
          {this.renderSpecs()}
          <h2>Payment</h2>
          <div className="row">{this.renderPayment()}</div>
        </div>
      );
    }
}

export default CompPrd;
