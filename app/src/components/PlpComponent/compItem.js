import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';

function CompItem(props) {
  function handleRemove() {
    props.remove(props.product.id)
  }
  console.log('frd', props); 
  return <li>
      <div className="cItem">
      <img className="cImage" src={`https://192.168.0.36:8443${props.product.thumbnail}`} />
      <div className="cContent">
        <h4>{props.product.title}
        </h4>
          <Price
          actualPrice={props.product.actualPrice}
            offerPrice={props.product.offerPrice}
          />
          <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  </li>
}

export default CompItem;
