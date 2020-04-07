import React from 'react';
import apiManager from '../../../utils/apiManager';
import { orderListAPI } from '../../../../public/constants/constants';
import '../../../../public/styles/myAccount/myOrder/myOrder.scss';
import OrderItem from './orderItem';
import TrackOrder from './TrackMyOrder/trackOrder';
import CancelComponents from '../../cancelComponents/index';


class MyOrder extends React.Component {
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
      pageSize: 20,
    };
    this.renderSelection = this.renderSelection.bind(this)
    this.onscroll = this.onscroll.bind(this);
  }

  componentDidMount() {
    addEventListener('scroll', this.onscroll);
    if(this.props.isGuestTrackOrderPro) {
      this.setState({
        orderListData: this.props.guestOrderDataPro,
        hasMore: false,
        isLoading: false,
      });
    }
    else {
      this.getOrderList();
    }
    
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.onscroll);
  }

  getOrderList(isFromScroll) {
    this.setState({ isLoading: true }, () => {


      let orderAPI =
        `${orderListAPI}?` +
        `pagenumber=${this.state.pageNumber}&` +
        `pagesize=${this.state.pageSize}&`;
      
      apiManager.get(orderAPI)
        .then(response => {
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
    this.setState({
      isTrackOrder: !this.state.isTrackOrder,
      updatedTrackOrderData: trackOrderData
    });
  }

  onscroll = () => {
    const { state: { error, isLoading, hasMore }, } = this;

    var scrollYindex;
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) { //Safari browser
      scrollYindex = window.innerHeight + document.body.scrollTop;
    } else if (window.navigator.userAgent.indexOf("Edge") > -1){ //Edge browser
      scrollYindex = window.innerHeight + window.pageYOffset;
    } else { //All other browsers
      scrollYindex = window.innerHeight + document.documentElement.scrollTop;
    }

    if (error || isLoading || !hasMore) return;
    const adjustedHeight = 600;
    const windowHeight = scrollYindex
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
      var isInstallationRequired = true;
      data.orderItems.map(item => {
        
        if (item.installationRequired === 'N') {
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
  }

  loadingbar() {
    return (
      <div className="lazyloading-Indicator">
          <img
            id="me"
            className="loadingImg"
            src={require('../../../../public/images/plpAssests/lazyloadingIndicator.svg')}
			 alt='Loading Orders'
          />
        </div>
    )
  }

  render() {
    this.state.isOnGoingOrderShown = false;
    this.state.isPastOrdeShown = false;
    return (
      <div className="myOrder">
        {this.state.isTrackOrder ? (
          <TrackOrder renderSelectionPro={this.renderSelection.bind(this)} trackOrderDataPro={this.state.updatedTrackOrderData} />
        ) :
          this.state.orderListData.length !== 0 ? this.state.orderListData.map((data, key) => {
            return (
              <>
                {this.displayOnGoingPastOrder(data)}
                <OrderItem
                  renderSelectionPro={this.renderSelection.bind(this)}
                  isGuestTrackOrderPro={this.state.isGuestTrackOrder}
                  orderItemData={data}
                />
              </>
            )
          }) : this.state.isLoading ? this.loadingbar() : <div className='noOrder'>No Orders to Show</div>
        }

      <CancelComponents/>
      </div>
    );
  }
}

export default MyOrder;
