import React from 'react';
import RWDSingleProduct from './RWDSingleProduct';


class RWDMultiTrack extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount()
  {
      console.log("MultiOR",this.props.currentCompleteData);
      console.log("MultiORI",this.props.orderDataPro);
  }
  onReturn(shipmentData)
  {
    this.props.onReturn(this.props.orderDataPro,this.props.currentCompleteData,shipmentData)    
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
              onReturn = {this.onReturn.bind(this)}/>
          )
        })}
      </>
    );
  }
}

export default RWDMultiTrack;
