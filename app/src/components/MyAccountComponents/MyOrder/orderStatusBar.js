import React from 'react';
import apiManager from '../../../utils/apiManager';
import { changePasswordAPI } from '../../../../public/constants/constants';

class OrderStatusBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingStatusArr: [],
      isInCurrenStatus: false,
    };
  }

  componentDidMount() {
    this.filterShippingData();
  }

  filterShippingData() {
    if (this.props.shipmentDataPro) {
      var statusArr = this.props.shipmentDataPro.statusLine.split(',');
      console.log('ddddd -- ', statusArr)
      this.setState({
        shippingStatusArr: statusArr,
      })
    }
  }

  getStatusBarCustomClassname(item, index) {
    var customClassName = 'list';
    if (index === 0) {
      customClassName += ' first';
    }

    if (index + 1 === this.state.shippingStatusArr.length) {
      customClassName += ' last'
    }

    if (item === this.props.shipmentDataPro.status) {
      this.state.isInCurrenStatus = true;
      customClassName += ' active'
    }
    else {
      if (this.state.isInCurrenStatus) {
        customClassName += ''
      }
      else {
        customClassName += ' visited'
      }
    }
    return customClassName;
  }

  getStatusBarDate(item) {
    var statusDate;
    if (item === 'Created') {
      statusDate = this.props.shipmentDataPro.createdDate
    }
    else if (item === 'Packed') {
      statusDate = this.props.shipmentDataPro.packedDate
    }
    else if (item === 'Shipped' || item === 'Shipping') {
      statusDate = this.props.shipmentDataPro.shippedDate
    }
    else if (item === 'Delivered' || item === 'Delivery') {
      statusDate = this.props.shipmentDataPro.deliveryDate
    }
    else if (item === 'Installed' || item === 'Installation') {
      statusDate = this.props.shipmentDataPro.installationDate
    }
    return statusDate.split(',')[1];
  }

  render() {
    var statusBarItem = this.state.shippingStatusArr.map((item, index) => {
      return (
        <li class={this.getStatusBarCustomClassname(item, index)}><div className="status">{item}</div><div className="deliveryDate">{this.getStatusBarDate(item)}</div></li>
      )
    })

    return (
      <div class={this.props.customClassPro}>
        <ul class="track-bar">
		  {this.state.isInCurrenStatus = false}
          {statusBarItem}

          {/* <li class="list visited first"><div className="status">Ordered</div><div className="deliveryDate">21 June 2018</div></li>
          <li class="list previous visited  "><div className="status">Packed</div><div className="deliveryDate">21 June 2018</div></li>
          <li class="list active"> <div className="status"> Shipping</div><div className="deliveryDate">21 June 2018</div></li>
          <li class="list "> <div className="status">Delivery</div><div className="deliveryDate">21 June 2018</div></li>
          <li class="list last"><div className="status">Installation</div><div className="deliveryDate">21 June 2018</div></li> */}
        </ul>
      </div>
    );
  }
}

export default OrderStatusBar;
