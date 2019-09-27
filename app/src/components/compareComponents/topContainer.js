import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';
import { Row, Col,Grid } from 'react-bootstrap';
import close from '../../../public/images/close.svg';
import Link from 'react-router-dom/Link';
import { RemoveProduct } from '../../containers/PlpContainer/actions';
import {
  imagePrefix
} from '../../../public/constants/constants';
import {REMOVE, VIEW_PRODUCT} from '../../constants/app/compareConstants'
import {createPdpURL} from '../../utils/utilityManager';
import appCookie from '../../utils/cookie';

class TopContainer extends React.Component {
    constructor(props) {
      super(props);
    }
     
    removePrd = () => {
      let compData = JSON.parse(appCookie.get('compareProduct'));
      compData = compData.filter(el => el.skuId !== this.props.product.uniqueID);
      appCookie.set('compareProduct', JSON.stringify(compData), 365 * 24 * 60 * 60 * 1000);
       
      if(this.props.count == 2) { 
        this.props.history.goBack();
      }

      this.props.remove(this.props.product.uniqueID);
    }

    renderSwatches() {
      if(this.props.product.swatches && this.props.product.swatches.length > 0) {
        var swatches = [];
        this.props.product.swatches.forEach((swatch) => {
          if(swatch.colorCode) {
            swatches.push(<li onClick={this.props.handleSwatch.bind(this, swatch.skuId, this.props.index, this.props.product.parentProductId)}><a style={{background: `rgb${swatch.colorCode}`}}></a></li>)
          } else if(swatch.facetImage) {
            // src={`${imagePrefix}${this.props.data}`}
            swatches.push(<li><a><img src={`${imagePrefix}${swatch.facetImage}`} alt={swatch.name} /></a></li>)
          } else {
            swatches.push(<li><a>{swatch.name}</a></li>)
          }
        });
        return swatches;
      } else {
      }
    }

    render() {
      var routePath = createPdpURL(this.props.product.productName, this.props.product.partNumber)
      return (
        <Col xs={12} sm={4} md={4} className='comp-list-item'>
        <div className='img-box'>
        <img  alt={this.props.product.productName} src={this.props.product.thumbnail !== '' ? `${imagePrefix}${this.props.product.thumbnail}` : require('../../../public/images/plpAssests/placeholder-image.png')} />
        </div>
    
        <div className='product-desc'>
          <h2 className='product-name'>{this.props.product.productName} </h2>
          <p className='description-text'>{this.props.product.shortDescription}</p>
          <Price actualPrice={this.props.product.actualPrice} offerPrice={this.props.product.offerPrice} />
          <p className='emi-desc'>{this.props.product.emiData ? `EMI Starting from ₹${this.props.product.emiData}` : null }</p>
        </div> 
    
        <div className='remove-box'>
          <button className='remove-btn' onClick={this.removePrd}>{REMOVE}</button>
          <Link to={routePath} className='view-product-btn'>{VIEW_PRODUCT}</Link>
        </div> 
    
        <div className='product-attr'>
        <ul>
            {this.renderSwatches()}
          </ul>
        </div>
      </Col>
      );
    }
}

export default TopContainer;
