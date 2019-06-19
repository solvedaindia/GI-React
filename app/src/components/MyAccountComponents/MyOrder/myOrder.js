import React from 'react';
import apiManager from '../../../utils/apiManager';
import { changePasswordAPI } from '../../../../public/constants/constants';
import '../../../../public/styles/myAccount/myOrder/myOrder.scss';
import OrderItem from './orderItem';
import TrackOrder from './TrackMyOrder/trackOrder';

class MyOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrackOrder: false,
      isGuestTrackOrder: this.props.isGuestTrackOrderPro,
    };
    // this.renderSelection = this.renderSelection.bind(this)
  }

  renderSelection() {
    console.log('back tro rnder seldelt');
    this.setState({
      isTrackOrder: !this.state.isTrackOrder,
    });
  }

  componentWillReceiveProps() {
    console.log('in the Track order --- ', this.state.isTrackOrder);
  }

  render() {
    return (
      <div className="myOrder">
        {this.state.isTrackOrder ? (
          <TrackOrder renderSelectionPro={this.renderSelection.bind(this)} />
        ) : (
          <OrderItem
            renderSelectionPro={this.renderSelection.bind(this)}
            isGuestTrackOrderPro={this.state.isGuestTrackOrder}
          />
        )}
      </div>
    );
  }
}

export default MyOrder;
