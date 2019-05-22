import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';

import close from '../../../public/images/close.svg';
import Link from 'react-router-dom/Link';

function DelContainer(props) {
    
  return (
    <div className="col-md-4">
      <div className="container">
        <h4>Delivery Between: <span>6th Jan - 10th Jan</span></h4>
      </div>
    </div>
  );
}

export default DelContainer;
