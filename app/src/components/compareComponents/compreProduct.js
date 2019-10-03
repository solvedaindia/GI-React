import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';
import { Row, Col, Grid } from 'react-bootstrap';
import {
  imagePrefix
} from '../../../public/constants/constants';
import close from '../../../public/images/close.svg';
import Link from 'react-router-dom/Link';
import TopContainer from './topContainer'
import DelContainer from './delivery'
import { WIDTH, HEIGHT, DEPTH, DELIVERY, DIMENSIONS, SPECIFICATIONS, PAYMENT } from '../../constants/app/compareConstants'

class CompPrd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: true
    }
  }
  renderProducts = () => { 
    var prds = [];
    this.props.data.map((element, index) => {
      prds.push(<TopContainer key={index} product={element} isRouteUpdated={this.props.isRouteUpdated} history={this.props.history} remove={this.props.remove} count={this.props.data.length} handleSwatch={this.handleSwatch} index={index} />)
    });
    return prds;
  }

  handleSwatch = (id, index, name) => {
    this.props.swatchHandle(id, index, name);
  }

  renderDims = () => {
    var dims = [];
    var width = [];
    var heights = [];
    var Depth = [];
    this.props.data.map((elem, index) => {
      width.push(
        <Col className={index == 0 ? "col-md-6 attr-dims" : index == 1 ? 'col-md-4 attr-desc' : "col-md-2 attr-desc"}>
          {index == 0 ? <div><span className="col-md-5">{WIDTH}</span> <span className="col-md-7">{elem.width}</span></div> : <p>{elem.width}</p>}
        </Col>)
      heights.push(
        <Col className={index == 0 ? "col-md-6 attr-dims" : index == 1 ? 'col-md-4 attr-desc' : "col-md-2 attr-desc"}>
          {index == 0 ? <div><span className="col-md-5">{HEIGHT}</span> <span className="col-md-7">{elem.height}</span></div> : <p>{elem.height}</p>}
        </Col>)
      Depth.push(
        <Col className={index == 0 ? "col-md-6 attr-dims" : index == 1 ? 'col-md-4 attr-desc' : "col-md-2 attr-desc"}>
          {index == 0 ? <div><span className="col-md-5">{DEPTH}</span> <span className="col-md-7">{elem.depth}</span></div> : <p>{elem.depth}</p>}
        </Col>)
    })

    dims.push(<Row>{width}</Row>)
    dims.push(<Row>{heights}</Row>)
    dims.push(<Row>{Depth}</Row>)

    return dims;
  }

  renderImages = () => {
    var images = [];
    this.props.data.map(elem => {
      images.push(
        <Col xs={12} sm={4} md={4} className="comp-list-item">
          <div className="img-box">
            <img src={`${imagePrefix}${elem.dimensionThumbnail}`} alt='img' />
          </div>
        </Col>)
    })
    return images;
  }

  renderPayment = () => {
    var payments = [];
    var emis = [];
    this.props.data.map(elem => {

      payments.push(
        <Col xs={12} sm={4} md={4} className='comp-cod-option text-center'>
          <h4>{elem.emiData !== '' && elem.emiData !== null && elem.emiData !== undefined && elem.emiData !== 0 ? 'EMI available' : 'EMI not available'}</h4>
        </Col>
      )
    });
    return payments;

  }

  renderSpecs = () => {
    var specs = [];
    if (this.props.data === undefined || this.props.data === null || this.props.data === '' || this.props.data.length === 0) {
      return <></>
    }
    this.props.data[0].attributes.map((att, index) => {
      if (this.props.data.length > 1) {
        var second_att = this.props.data[1].attributes.find(s_att => {
          return s_att.uniqueID == att.uniqueID
        })
      }
      if (this.props.data.length > 2) {
        var third_att = this.props.data[2].attributes.find(t_att => {
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
      dels.push(<DelContainer skuData={elem} />)
    })
    return dels;
  }

  render() {
    return (
      <div className="compare-product-list">
        <Row>{this.renderProducts()}</Row>

        <Row><h2 className="title-text">{DELIVERY}</h2></Row>
        <Row className="prod-delivery-slot">
          {this.renderDelivery()}
        </Row>

        <Row>
          <h2 className="title-text">{DIMENSIONS}</h2>
          {this.renderImages()}</Row>
        <div className="dims-detail">{this.renderDims()}</div>

        <Row><h2 className="title-text">{SPECIFICATIONS}</h2></Row>
        {this.renderSpecs()}

        {this.state.payment ? <Row>
          <h3 className="title-text">{PAYMENT}</h3>
          {this.renderPayment()}
        </Row> : ''}
      </div>
    );
  }
}

export default CompPrd;