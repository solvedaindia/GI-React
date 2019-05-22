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
      var prds = [];
      this.props.data.map(element => {
        prds.push(<TopContainer product={element} />)
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
            <div className="col-md-4">
              {index == 0 ? <p>Weight<span>80 cm</span></p> : <p>80 cm</p>}
            </div>)
        heights.push(
          <div className="col-md-4">
              {index == 0 ? <p>Height<span>120 cm</span></p> : <p>120 cm</p>}
            </div>)
        Depth.push(
          <div className="col-md-4">
              {index == 0 ? <p>Depth<span>100 cm</span></p> : <p>100 cm</p>}
            </div>)
      })

      dims.push(<li className="container">{weights}</li>)
      dims.push(<li className="container">{heights}</li>)
      dims.push(<li className="container">{Depth}</li>)

      return dims;
    }

    renderImages = () => {
      var images = [];
      this.props.data.map(elem => {
        images.push(<div className="col-md-4 comp-list-item">
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
          <div className="col-md-4">
            <h4>COD available</h4>
          </div>
        )
      });
      return payments;
    }

    renderSpecs = () => {
      var specs = [];
      this.props.data[0].attributes.map((att, index) => {
        var second_att = this.props.data[1].attributes.find(s_att => {
          return s_att.uniqueID == att.uniqueID
        })
        if(this.props.data.length > 2) {
          var third_att = this.props.data[2].attributes.find(t_att => {
            return t_att.uniqueID == att.uniqueID
          })
        }
        specs.push(
          <li className="container">
            <div className="col-md-4">
              <p>{att.name} <span>{att.value}</span></p>
            </div>
            <div className="col-md-4">
              {second_att ? <p>{second_att.value}</p> : 'NA'}
            </div>
            <div className="col-md-4">
              {third_att ? <p>{third_att.value}</p> : 'NA'}
            </div>
          </li>
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
        <div>
          {this.renderProducts()}
          <h2>Delivery</h2>
          {this.renderDelivery()}
          <h2>Dimensions</h2>
          {this.renderImages()}
          <ul>{this.renderDims()}</ul>

          <h2>Specifications</h2>
          <ul>{this.renderSpecs()}</ul>
          <h2>Payment</h2>
          {this.renderPayment()}
        </div>
      );
    }
}

export default CompPrd;
