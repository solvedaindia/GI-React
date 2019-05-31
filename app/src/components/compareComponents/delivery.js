import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';
import { Row, Col,Grid } from 'react-bootstrap';

import close from '../../../public/images/close.svg';
import Link from 'react-router-dom/Link';

function DelContainer(props) {
    
  return (
    <Col  xs={12} sm={4} md={4}>
        Delivery Between: <strong>6th Jan - 10th Jan</strong>
    </Col>
  );
}

export default DelContainer;
