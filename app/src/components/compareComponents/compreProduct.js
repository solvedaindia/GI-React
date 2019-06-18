import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';
import { Row, Col,Grid } from 'react-bootstrap';

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
      this.props.data.map((element, index) => {
        prds.push(<TopContainer key={index} product={element} remove={this.props.remove} count={this.props.data.length} />)
      });
      return prds;
    }

    renderDims = () => {
      var dims = [];
      var weights = [];
      var heights = [];
      var Depth = [];
      this.props.data.map((elem, index) => {
        var wt = elem.attributes.find((att) => {
          return att.uniqueID == "7000000000000001002"
        })
        var ht = elem.attributes.find((att) => {
          return att.uniqueID == "7000000000000001011"
        })
        var dp = elem.attributes.find((att) => {
          return att.uniqueID == "7000000000000001012"
        })
        weights.push(
            <Col className={index == 0 ?"col-md-6 attr-dims" : index ==1 ? 'col-md-4 attr-desc' : "col-md-2 attr-desc"}>
              {index == 0 ? <div><span className="col-md-5">Weight</span> <span className="col-md-7">{wt && wt.values[0] ? wt.values[0].value : 'NA'}</span></div> : <p>{wt && wt.values[0] ? wt.values[0].value : 'NA'}</p>}
            </Col>)
        heights.push(
          <Col className={index == 0 ?"col-md-6 attr-dims" : index ==1 ? 'col-md-4 attr-desc' : "col-md-2 attr-desc"}>
              {index == 0 ?  <div><span className="col-md-5">Height</span> <span className="col-md-7">{ht && ht.values[0] ? ht.values[0].value : 'NA'}</span></div> : <p>{ht && ht.values[0] ? ht.values[0].value : 'NA'}</p>}
            </Col>)
        Depth.push(
          <Col className={index == 0 ?"col-md-6 attr-dims" : index ==1 ? 'col-md-4 attr-desc' : "col-md-2 attr-desc"}>
              {index == 0 ?  <div><span className="col-md-5">Depth</span> <span className="col-md-7">{dp && dp.values[0] ? dp.values[0].value : 'NA'}</span></div> : <p>{dp && dp.values[0] ? dp.values[0].value : 'NA'}</p>}
            </Col>)
      })

      dims.push(<Row>{weights}</Row>)
      dims.push(<Row>{heights}</Row>)
      dims.push(<Row>{Depth}</Row>)

      return dims;
    }

    renderImages = () => {
      var images = [];
      this.props.data.map(elem => {
        images.push(
          <Col xs={12} sm={4} md={4}  className="comp-list-item">
              <div className="img-box">  
              <img src={`https://192.168.0.36:8443${elem.thumbnail}`} />
              </div>
        </Col>)
      })
      return images;
    }

    renderPayment = () => {
      var payments = [];
      this.props.data.map(elem => {
        payments.push(
          <Col xs={12} sm={4} md={4} className='comp-cod-option text-center'>
            <h4>COD available</h4>
          </Col>
        )
      });
      return payments;
    }

    renderSpecs = () => {
      var specs = [];
      this.props.data[0].specs.map((att, index) => {
        if(this.props.data.length > 1) {
          var second_att = this.props.data[1].specs.find(s_att => {
            return s_att.uniqueID == att.uniqueID
          })
        }
        if(this.props.data.length > 2) {
          var third_att = this.props.data[2].specs.find(t_att => {
            return t_att.uniqueID == att.uniqueID
          })
        }
        specs.push(
          <Row className='specifec-detail'>
            <Col xs={12} sm={4} md={6} className='attr-details'>
              <span className="col-md-5">{att.name}</span> <span className="col-md-7">{att.value}</span>
            </Col>
 
            <Col xs={12} sm={4} md={4} className='attr-desc'>
              {this.props.data.length > 1 ? second_att ? <p>{second_att.value}</p> : 'NA' : ''}
            </Col>
            <Col xs={12} sm={4} md={2} className='attr-desc'>
              {this.props.data.length > 2 ? third_att ? <p>{third_att.value}</p> : 'NA' : ''}
            </Col>
          </Row>
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
          <Row>{this.renderProducts()}</Row>
         
          <Row><h2 className="title-text">Delivery</h2></Row>
          <Row className="prod-delivery-slot">
            {this.renderDelivery()}
          </Row>

          <Row>
            <h2 className="title-text">Dimensions</h2>
            {this.renderImages()}</Row>
          <div className="dims-detail">{this.renderDims()}</div>

          <Row><h2 className="title-text">Specifications</h2></Row>
          {this.renderSpecs()}
          
          <Row>
            <h2 className="title-text">Payment</h2>
            {this.renderPayment()}
          </Row>
        </div>
      );
    }
}

export default CompPrd;
