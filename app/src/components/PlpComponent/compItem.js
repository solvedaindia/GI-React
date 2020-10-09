import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';
import {
  imagePrefix,
} from '../../../public/constants/constants';
import close from '../../../public/images/close.svg';
import appCookie from '../../utils/cookie';

function CompItem(props) {
  function handleRemove() {
    let compData = JSON.parse(appCookie.get('compareProduct'));
    compData = compData.filter(el => el.skuId !== props.product.skuId);
    appCookie.set('compareProduct', JSON.stringify(compData), 365 * 24 * 60 * 60 * 1000);
    props.remove(props.product.skuId);
    props.filterCookie();
  }
  return (
    <li className="list">
      <div className="imgBox">
        <img
          className="imgfullwidth"
          src={`${imagePrefix}${props.product.thumbnail}`}
        />
      </div>

      <div className="textBox">
        <h4 className="productName">{props.product.title} </h4>
        <Price
          offerPrice={props.product.offerPrice}
        />
      </div>
      <button className="close" onClick={handleRemove}>
        <img src={close} alt="close" />
      </button>
    </li>
  );
}

export default CompItem;
