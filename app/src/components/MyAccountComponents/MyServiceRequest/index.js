import React from 'react';
import TrackServiceRequest from './trackServiceRequest';
import '../../../../public/styles/myAccount/myOrder/myOrder.scss';
import apiManager from '../../../utils/apiManager';
import { serviceRequestListAPI } from '../../../../public/constants/constants';

class ServiceRequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTrackDetails: false,
      serviceListData: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchServiceRequestData();
  }

  fetchServiceRequestData() {
    apiManager
      .get(serviceRequestListAPI)
      .then(response => {
        if (response.data.data.serviceListData) {
          this.setState({
            serviceListData: response.data.data.serviceListData,
            isLoading: false
          })
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: error.message,
        })
      });
  }

  renderSelection() {
    window.scrollTo(0, 0);
    this.setState({
      showTrackDetails: !this.state.showTrackDetails,
    });
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
    return (
      <div className="myOrder">
        {this.state.serviceListData.length !== 0 && this.state.showTrackDetails ?
          this.renderBackNavigation()
          : null}

        {this.state.serviceListData.length !== 0 ? this.state.serviceListData.map((data, key) => {
          return (
            <>
              {this.state.showTrackDetails ?
                <TrackServiceRequest renderSelectionPro={this.renderSelection.bind(this)} dataPro={data} /> :
                <>
                  {this.renderHeader(data.serviceRequestMetaData)}
                  {this.renderProducts(data)}
                </>
              }
            </>
          )
        }) : this.state.isLoading ? this.loadingbar() : <div className='noOrder'>No Orders to Show</div>
        }
      </div>
    );
  }

  renderBackNavigation() {
    return (
      <>
        <div className="bottomDivider">
          <button className="backBtn" onClick={this.renderSelection.bind(this)} >{`< Back`}</button>
        </div>
        <h4>Track Service Request</h4>
      </>
    )
  }

  renderHeader(data) {
    return (
      <div className="tabBar clearfix">
        <ul className="heading clearfix">
          <li className="list">
            <span className="heading-top">Request ID</span>{' '}
            <span className="heading-sub">{data.serviceRequestId}</span>
          </li>
          <li className="list">
            <span className="heading-top">Requested On</span>{' '}
            <span className="heading-sub">{data.serviceBookedDate}</span>
          </li>
        </ul>
      </div>
    )
  }

  renderProducts(data) {
    return (
      <div className="itemBox">
        <div className="clearfix" />
        <div className="orderProduct clearfix removeBorder" /* className={this.props.totalItems - 1 === this.props.itemIndex ? "orderProduct clearfix removeBorder" : "orderProduct clearfix"} */>
          <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img /* alt={productData.productName} */ src={require('../../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
            </div>
            <div className="product-text">
              <p className="heading">{data.productName}</p>
              <p className="description">{data.shortDescription}</p>
            </div>
          </div>
          {data.serviceRequestMetaData.serviceRequestTrackButtonEnable !== 'N' ?
            <div className="orderbtn">
              <button className="btn-borderwhite" onClick={evt => this.renderSelection()} >
                Track My Service
          </button>
            </div> :
            <div className="orderbtn">
              <button className="btn-borderDisable" >
                {data.serviceRequestMetaData.serviceRequestTrackButtonText}
              </button>
            </div>}


          <div className='clearfix'></div>

        </div>
      </div>
    )
  }

}



export default ServiceRequestPage;
