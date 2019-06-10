import React from 'react';
import apiManager from '../../../utils/apiManager';
import {
  changePasswordAPI
} from '../../../../public/constants/constants';
import '../../../../public/styles/myAccount/trackMyOrder.scss';
import OrderItem from './orderItem';

class TrackOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className='trackMyOrder'>
      <div className='bottomDivider'>
      <button className='backBtn' onClick={this.props.renderSelectionPro}>{`< Back`}</button>
      </div>
        
        <h3>Track My Order</h3>
      </div>
    );
  }
}

export default TrackOrder;
