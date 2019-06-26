import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';
import { Row, Col,Grid } from 'react-bootstrap';

import close from '../../../public/images/close.svg';
import Link from 'react-router-dom/Link';
import { RemoveProduct } from '../../containers/PlpContainer/actions';

function TopContainer(props) {
    console.log(props, "props in top container");
     
    function removePrd() {
      console.log("remove prd called");
      if(props.count == 2) {
        alert("Cannot remove Product. Need atleast two products to compare");
      } else {
        props.remove(props.product.uniqueID)
      }
    }

    function renderSwatches() {
      console.log("render swatches called")
      if(props.product.swatches && props.product.swatches.length > 0) {

        var swatches = [];
        props.product.swatches.forEach((swatch) => {
          if(swatch.colorCode) {
            swatches.push(<li><a href="#" style={{background: `${swatch.colorCode}`}}></a></li>)
          } else if(swatch.facetImage) {
            swatches.push(<li><a href="#"><img src={`https://192.168.0.36:8443${swatch.facetImage}`}/></a></li>)
          } else {
            swatches.push(<li><a href="#">{swatch.name}</a></li>)
          }
        });
        return swatches;
      } else {
        console.log("no swatches found")
      }
    }
  return (
    <Col xs={12} sm={4} md={4} className='comp-list-item'>
    <div className='img-box'>
      <img src={`https://192.168.0.36:8443${props.product.thumbnail}`} />
    </div>

    <div className='product-desc'>
      <h4 className='product-name'>{props.product.name} </h4>
      <p className='description-text'>{props.product.shortDescription}</p>
      {props.product.price[1].value ? <Price
        actualPrice={props.product.price[0].value}
        offerPrice={props.product.price[1].value}
      /> : 0}
      <p className='emi-desc'>EMI Starting from {props.product.minimumEMI ? props.product.minimumEMI : 0}</p>
    </div> 

    <div className='remove-box'>
      <button className='remove-btn' onClick={removePrd}>Remove</button>
      <Link to={`/pdp/${props.product.parentProductId}/${props.product.uniqueID}`} className='view-product-btn'>View Product</Link>
    </div> 

    <div className='product-attr'>
    <ul>
        {renderSwatches()}
      </ul>
    </div>
  </Col>
  );
}

export default TopContainer;
