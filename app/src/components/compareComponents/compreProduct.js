import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';

import close from '../../../public/images/close.svg';
import Link from 'react-router-dom/Link';

function CompPrd(props) {
    console.log(props, "props in comp prd");
  return (
    <div className="col-md-4">
      <div>
        <img style={{width: '65%'}}
          src={`https://192.168.0.36:8443${props.product.thumbnail}`}
        />
      </div>

      <div className="textBox">
        <h4 className="productName">{props.product.name} </h4>
        <p>(With Locker, Mirror, OHU & Drawer) (Ivory Red Finish)</p>
        <Price
          actualPrice='20000'
          offerPrice={props.product.price[1].value}
        />
        <p>EMI Starting from 399</p>
        <hr/>
        <button>Remove</button>
        <Link to="#">View Product</Link>
      </div>
    </div>
  );
}

export default CompPrd;
