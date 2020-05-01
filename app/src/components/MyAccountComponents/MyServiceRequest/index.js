import React from 'react';
import TrackServiceRequest from './trackServiceRequest';
import '../../../../public/styles/myAccount/myOrder/myOrder.scss';

class ServiceRequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTrackDetails: false,

    };
  }

  renderSelection() {
    this.setState({
      showTrackDetails: !this.state.showTrackDetails,
    });
  }

  render() {
    return (
      <div className="myOrder">
        {this.state.showTrackDetails ?
          <TrackServiceRequest renderSelectionPro={this.renderSelection.bind(this)} /> :
          <>
            {this.renderHeader()}
            {this.renderProducts()}
          </>
        }

      </div>
    );
  }

  renderHeader() {
    return (
      <div className="tabBar clearfix">
        <ul className="heading clearfix">
          <li className="list">
            <span className="heading-top">Request ID</span>{' '}
            <span className="heading-sub">110248890</span>
          </li>
          <li className="list">
            <span className="heading-top">Requested On</span>{' '}
            <span className="heading-sub">Tue, 8 April 2020</span>
          </li>
        </ul>
      </div>
    )
  }

  renderProducts() {
    return (
      <div className="itemBox">
        <div className="clearfix" />
        <div className="orderProduct clearfix removeBorder" /* className={this.props.totalItems - 1 === this.props.itemIndex ? "orderProduct clearfix removeBorder" : "orderProduct clearfix"} */>
          <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img /* alt={productData.productName} */ src={require('../../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
            </div>
            <div className="product-text">
              <p className="heading">Product Name</p>
              <p className="description">(Shor Description)</p>
            </div>
          </div>

          <div className="orderbtn">
            <button className="btn-borderwhite" onClick={evt => this.renderSelection()} >
              Track My Service
            </button>
          </div>
          <div className='clearfix'></div>

        </div>
      </div>
    )
  }

}



export default ServiceRequestPage;
