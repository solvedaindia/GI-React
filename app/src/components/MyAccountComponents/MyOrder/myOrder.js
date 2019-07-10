import React from 'react';
import apiManager from '../../../utils/apiManager';
import { orderListAPI } from '../../../../public/constants/constants';
import '../../../../public/styles/myAccount/myOrder/myOrder.scss';
import OrderItem from './orderItem';
import TrackOrder from './TrackMyOrder/trackOrder';

class MyOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrackOrder: false,
      isGuestTrackOrder: this.props.isGuestTrackOrderPro,
      orderListData: [],
      isLoading: true,
      updatedTrackOrderData: null,
    };
    this.renderSelection = this.renderSelection.bind(this)
  }

  componentDidMount() {
    this.getOrderList();
  }

  getOrderList() {
    apiManager.get(orderListAPI)
      .then(response => {
        console.log('OrderList Response --- ', response.data);
        this.setState({
          orderListData: response.data.data.orderList,
          isLoading: false,
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        })
      });
  }

  renderSelection(trackOrderData) {
    console.log('back tro rnder seldelt', trackOrderData);
    this.setState({
      isTrackOrder: !this.state.isTrackOrder,
      updatedTrackOrderData: trackOrderData
    });
  }

  componentWillReceiveProps() {
    console.log('in the Track order --- ', this.state.isTrackOrder);
  }

  render() {
    console.log('is Show TrackOrder --- ', this.state.isTrackOrder)
    return (
      <div className="myOrder">
        <div className="ongoingOrder">Ongoing Orders</div>
        {this.state.isTrackOrder ? (
          <TrackOrder renderSelectionPro={this.renderSelection.bind(this)} trackOrderDataPro={this.state.updatedTrackOrderData} />
        ) :
          this.state.orderListData.length !== 0 ? this.state.orderListData.map((data, key) => {
            return (
              <OrderItem
                renderSelectionPro={this.renderSelection.bind(this)}
                isGuestTrackOrderPro={this.state.isGuestTrackOrder}
                orderItemData={data}
              />
            )
          }) : this.state.isLoading ? null : <div className='noOrder'>No Orders to Show</div>
        }
      </div>
    );
  }
}

export default MyOrder;
