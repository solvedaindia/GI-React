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

class TopContainer extends React.Component {
    constructor(props) {
      super(props);
    }
     
    removePrd = () => {
      console.log("remove prd called");
      if(this.props.count == 2) {
        alert("Cannot remove Product. Need atleast two products to compare");
      } else {
        this.props.remove(this.props.product.uniqueID)
      }
    }

    renderSwatches() {
      console.log("render swatches called")
      if(this.props.product.swatches && this.props.product.swatches.length > 0) {
          console.log(this.props.product.swatches, "swatches data")
        var swatches = [];
        this.props.product.swatches.forEach((swatch) => {
          console.log(swatch, 'swatch')
          if(swatch.colorCode) {
            swatches.push(<li onClick={this.props.handleSwatch.bind(this, swatch.skuId, this.props.index, this.props.product.parentProductId)}><a style={{background: `rgb${swatch.colorCode}`}}></a></li>)
          } else if(swatch.facetImage) {
            // src={`${imagePrefix}${this.props.data}`}
            swatches.push(<li><a><img src={`${imagePrefix}${swatch.facetImage}`}/></a></li>)
          } else {
            swatches.push(<li><a>{swatch.name}</a></li>)
          }
        });
        return swatches;
      } else {
        console.log("no swatches found")
      }
    }

    render() {
      console.log('com pp -- ',this.props);
      var routePath = `/pdp/furniture-${this.props.product.productName.split(' ').join('-')}/${this.props.product.uniqueID}`
      return (
        <Col xs={12} sm={4} md={4} className='comp-list-item'>
        <div className='img-box'>
        <img src={this.props.product.thumbnail !== '' ? `${imagePrefix}${this.props.product.thumbnail}` : require('../../../public/images/plpAssests/placeholder-image.png')} />
        </div>
    
        <div className='product-desc'>
          <h2 className='product-name'>{this.props.product.productName} </h2>
          <p className='description-text'>{this.props.product.shortDescription}</p>
          {/* {this.props.product.price[1].value ? <Price actualPrice={this.props.product.price[0].value} offerPrice={this.props.product.price[1].value} /> : 0} */}
          <Price actualPrice={this.props.product.actualPrice} offerPrice={this.props.product.offerPrice} />
          <p className='emi-desc'>{this.props.product.emiData ? `EMI Starting from ₹${this.props.product.emiData}` : null }</p>
        </div> 
    
        <div className='remove-box'>
          <button className='remove-btn' onClick={this.removePrd}>Remove</button>
          <Link to={routePath} className='view-product-btn'>View Product</Link>
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
