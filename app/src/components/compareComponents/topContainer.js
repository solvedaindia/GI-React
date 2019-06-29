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
  return (
    <Col xs={12} sm={4} md={4} className='comp-list-item'>
    <div className='img-box'>
      <img src={`${imagePrefix}${props.product.thumbnail}`} />
    </div>

    <div className='product-desc'>
      <h4 className='product-name'>{props.product.name} </h4>
      <p className='description-text'>(With Locker, Mirror, OHU & Drawer) (Ivory Red Finish)</p>
      <Price
        actualPrice='20000'
        offerPrice={props.product.price[1].value}
      />
      <p className='emi-desc'>EMI Starting from 399</p>
    </div> 

    <div className='remove-box'>
      <button className='remove-btn' onClick={removePrd}>Remove</button>
      <Link to={`/pdp/${props.product.uniqueID}`} className='view-product-btn'>View Product</Link>
    </div> 

    <div className='product-attr'>
    <ul>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
      </ul>
    </div>
  </Col>
  );
}

export default TopContainer;
