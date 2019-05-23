import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';

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
  return (
    <div className="col-md-4 comp-list-item">
    <div className="img-box">
      <img src={`https://192.168.0.36:8443${props.product.thumbnail}`} />
    </div>

    <div className="product-desc">
      <h4 className="product-name">{props.product.name} </h4>
      <p className="description-text">(With Locker, Mirror, OHU & Drawer) (Ivory Red Finish)</p>
      <Price
        actualPrice='20000'
        offerPrice={props.product.price[1].value}
      />
      <p className="emi-desc">EMI Starting from 399</p>
    </div> 

    <div className="remove-box">
      <button className="remove-btn" onClick={removePrd}>Remove</button>
      <Link to="#" className="view-product-btn">View Product</Link>
    </div> 

    <div className="product-attr">
    <ul>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
      </ul>
    </div>
  </div>
  );
}

export default TopContainer;
