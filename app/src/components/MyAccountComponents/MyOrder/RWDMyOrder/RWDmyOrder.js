import React from 'react';
import { connect } from 'react-redux';
import { getReleventReduxState } from '../../../../utils/utilityManager';
import apiManager from '../../../../utils/apiManager';
import { orderListAPI } from '../../../../../public/constants/constants';
import '../../../../../public/styles/myAccount/RWDMyOrder/rwdMyOrder.scss';
import RWDOrderItem from './RWDOrderItem';
import TrackOrder from '../TrackMyOrder/trackOrder';
import RWDSingleProduct from './RWDSingleProduct';
import RWDMultiTrack from './RWDMultiTrack';
import RWDCompleteOrder from './RWDCompleteOrder';
import { updateTheRWDHeader } from '../../../../actions/app/actions';

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
      pageSize: 20,

      currentComponent: null,
      currentComponentData: null,
      currentCompleteData: null,
    };
    this.renderSelection = this.renderSelection.bind(this)
    this.onscroll = this.onscroll.bind(this);
    this.myOrderCallback = this.myOrderCallback.bind(this);
    this.orderDetailCallback = this.orderDetailCallback.bind(this);
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedHeaderReturnVal !== this.props.updatedHeaderReturnVal) {
      if (nextProps.updatedHeaderReturnVal === 'MyOrder Return') {
        this.setState({
          currentComponent: '',
          currentComponentData: null,
        })
        this.props.updateTheRWDHeader('');
      }
    }
  }

  myOrderCallback(compName, data, completeData) {
    console.log('ddddd -- ', compName, data);
    if (compName === 'ViewOrder') {
      this.props.updateTheRWDHeader('My Order Redirect');
    }
    else {
      this.props.updateTheRWDHeader('Track Order');
    }

    this.setState({
      currentComponent: compName,
      currentComponentData: data,
      currentCompleteData: completeData,
    })
  }

  orderDetailCallback(data) {
    this.props.updateTheRWDHeader('My Order Redirect');
    this.setState({
      currentComponent: 'ViewOrder',
      currentComponentData: data
    })
  }

  viewOrderTrackbtnCallback(data) {
    console.log('mmmmmm----',data)
    this.props.updateTheRWDHeader('Track Order');
    this.setState({
      currentComponent: 'MultiProduct',
      currentComponentData: data
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

      return <h2 className='heading-text'>{tagOutput}</h2>
    }
    else {
      return null;
    }
  }

  loadingbar() {
    return (
      <div className="lazyloading-Indicator">
        <img
          id="me"
          className="loadingImg"
          src={require('../../../../../public/images/plpAssests/lazyloadingIndicator.svg')}
          alt='Loading Orders'
        />
      </div>
    )
  }

  render() {
    this.state.isOnGoingOrderShown = false;
    this.state.isPastOrdeShown = false;
    if (this.state.currentComponent === 'SingleProduct') {
      return (
        <div className="myOrder single-item-order">
          <RWDSingleProduct
            orderDataPro={this.state.currentComponentData}
            myOrderCallbackPro={this.myOrderCallback}
            orderDetailCallbackPro={this.orderDetailCallback}
            orderCompleteDataPro={this.state.currentCompleteData}/>
        </div>
      );
    }
    else if (this.state.currentComponent === 'MultiProduct') {
      return (
        <div className="myOrder multi-item-order">
          <RWDMultiTrack
            orderDataPro={this.state.currentComponentData}
            myOrderCallbackPro={this.myOrderCallback} />
        </div>
      );
    }
    else if (this.state.currentComponent === 'ViewOrder') {
      return (
        <div className="myOrder View-Order">
          <RWDCompleteOrder
            orderDataPro={this.state.currentComponentData}
            myOrderCallbackPro={this.myOrderCallback}
            viewOrderTrackCallbackPro={this.viewOrderTrackbtnCallback.bind(this)}/>
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

function mapStateToProps(state) {
  const stateObj = getReleventReduxState(state, 'global');
  const updatedHeaderReturn = getReleventReduxState(stateObj, 'updatedRWDHeader');
  console.log('Mobile Header Subscription RWD --- ', updatedHeaderReturn);

  return {
    updatedHeaderReturnVal: updatedHeaderReturn
  };
}

export default connect(mapStateToProps, { updateTheRWDHeader })(RWDMyOrder);
// export default RWDMyOrder;
