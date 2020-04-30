import React from 'react';
import RWDSingleProduct from './RWDSingleProduct';


class RWDMultiTrack extends React.Component {
  constructor(props) {
    super(props);
  }

  showCancelModal(orderData,orderItem)
  {
    this.porps.showCancelModal(orderData,orderItem)
  }




  render() {
    const productData = this.props.orderDataPro;
    return (
      <>
        {productData.shipmentData.map((item, index) => {
          return (
            <RWDSingleProduct
              orderDataPro={productData}
              shipmentDataPro={item}
              isMultiTrackPro={true} 
              showCancelModal={this.showCancelModal.bind(this)}
              currentCompleteData={this.props.currentCompleteData}
              myOrderCallbackPro={this.props.myOrderCallbackPro}
              onReturn = {this.props.onReturn}/>
          )
        })}
      </>
    );
  }
}

export default RWDMultiTrack;
