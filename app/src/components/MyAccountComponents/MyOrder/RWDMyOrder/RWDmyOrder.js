import React from 'react';
import apiManager from '../../../../utils/apiManager';
import { orderListAPI } from '../../../../../public/constants/constants';
import '../../../../../public/styles/myAccount/RWDMyOrder/rwdMyOrder.scss';
import RWDOrderItem from './RWDOrderItem';
import TrackOrder from '../TrackMyOrder/trackOrder';
import RWDSingleProduct from './RWDSingleProduct';

class RWDMyOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrackOrder: false,
      isGuestTrackOrder: this.props.isGuestTrackOrderPro,
      orderListData: [],
      isLoading: true,
      updatedTrackOrderData: null,
      isOnGoingOrderShown: false,
      isPastOrdeShown: false,

      //Lazy Load Vars
      error: false,
      hasMore: true,
      isLoading: false,
      pageNumber: 1,
      pageSize: 4,

      currentComponent: null,
    };
    this.renderSelection = this.renderSelection.bind(this)
    this.onscroll = this.onscroll.bind(this);
    this.myOrderCallback = this.myOrderCallback.bind(this);
  }

  componentDidMount() {
    addEventListener('scroll', this.onscroll);
    this.getOrderList();
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.onscroll);
  }

  myOrderCallback(compName, data) {
    console.log('ddddd -- ', compName, data);
    this.setState({
      currentComponent: compName,
    })
  }

  getOrderList(isFromScroll) {
    this.setState({ isLoading: true }, () => {
      let orderAPI =
        `${orderListAPI}?` +
        `pagenumber=${this.state.pageNumber}&` +
        `pagesize=${this.state.pageSize}&`;
      console.log('order API --- ', orderAPI);
      apiManager.get(orderAPI)
        .then(response => {
          console.log('OrderList Response --- ', response.data);
          this.setState({
            orderListData: isFromScroll ? [...this.state.orderListData, ...response.data.data.orderList] : response.data.data.orderList,
            hasMore: response.data.data.orderList.length !== 0, // Now only show on 0 Products and disable it for lazyload
            isLoading: false,
          });
        })
        .catch(error => {
          this.setState({
            isLoading: false,
            error: error.message,
          })
        });
    });
  }

  renderSelection(trackOrderData) {
    console.log('back tro rnder seldelt', trackOrderData);
    this.setState({
      isTrackOrder: !this.state.isTrackOrder,
      updatedTrackOrderData: trackOrderData
    });
  }

  onscroll = () => {
    const { state: { error, isLoading, hasMore }, } = this;
    console.log('is Has more --- ', hasMore);
    if (error || isLoading || !hasMore) return;
    const adjustedHeight = 600;
    const windowHeight =
      window.innerHeight + document.documentElement.scrollTop;
    const windowOffsetHeight =
      document.documentElement.offsetHeight - adjustedHeight;

    if (
      windowHeight >= windowOffsetHeight &&
      windowHeight - 300 <= windowOffsetHeight
    ) {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
      this.getOrderList(true);
    }
  };

  displayOnGoingPastOrder(data) {
    // Loop data.orderItems -> if any order has installation required true
    // True -> Final Status should be Installed
    // False -> Final Status should be Deliverd
    // If Final Status === Deleiverd -> show Past Orders on Deliver status
    // Else if Final Status === Installed -> show Past Orders on Installed status
    // else -> show OnGoing Orders

    if (!this.state.isPastOrdeShown && !this.state.isOnGoingOrderShown) {
      var tagOutput;
      var isInstallationRequired = false;
      data.orderItems.map(item => {
        if (item.installationRequired) {
          isInstallationRequired = true;
        }
      })

      if (isInstallationRequired) {
        if (data.orderStatus === 'Installed') {
          tagOutput = 'Past Orders';
          this.state.isPastOrdeShown = true;
        }
        else {
          tagOutput = 'Ongoing Orders'
          this.state.isOnGoingOrderShown = true;
        }
      }
      else {
        if (data.orderStatus === 'Delivered') {
          tagOutput = 'Past Orders';
          this.state.isPastOrdeShown = true;
        }
        else {
          tagOutput = 'Ongoing Orders'
          this.state.isOnGoingOrderShown = true;
        }
      }

      return <div className="ongoingOrder">{tagOutput}</div>
    }
    else {
      return null;
    }
  }

  componentWillReceiveProps() {
    console.log('in the Track order --- ', this.state.isTrackOrder);
  }

  loadingbar() {
    return (
      <div className="lazyloading-Indicator">
        <img
          id="me"
          className="loadingImg"
          src={require('../../../../../public/images/plpAssests/lazyloadingIndicator.svg')}
        />
      </div>
    )
  }

  render() {
    if (this.state.currentComponent === 'SingleProduct') {
      return (
        <div className="myOrder">
          <RWDSingleProduct
            myOrderCallbackPro={this.myOrderCallback} />
        </div>
      );
    }
    else {
      return (
        <div className="myOrder">
          {this.state.orderListData.length !== 0 ? this.state.orderListData.map((data, key) => {
            return (
              <>
                {this.displayOnGoingPastOrder(data)}
                <RWDOrderItem
                  renderSelectionPro={this.renderSelection.bind(this)}
                  isGuestTrackOrderPro={this.state.isGuestTrackOrder}
                  orderItemData={data}
                  myOrderCallbackPro={this.myOrderCallback}
                />
              </>
            )

          }) : this.state.isLoading ? this.loadingbar() : <div className='noOrder'>No Orders to Show</div>
          }

        </div>
      );
    }


  }
}

export default RWDMyOrder;
