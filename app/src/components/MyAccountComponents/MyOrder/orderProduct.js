import React from 'react';
import apiManager from '../../../utils/apiManager';
import {
  changePasswordAPI
} from '../../../../public/constants/constants';

class ProductOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className='orderProduct'>
        <h2>Product Order</h2>
      </div>
    );
  }
}

export default ProductOrder;
