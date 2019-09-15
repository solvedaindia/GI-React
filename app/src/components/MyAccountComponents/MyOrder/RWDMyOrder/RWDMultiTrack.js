import React from 'react';
import RWDSingleProduct from './RWDSingleProduct';


class RWDMultiTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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
              myOrderCallbackPro={this.props.myOrderCallbackPro}/>
          )
        })}
      </>
    );
  }
}

export default RWDMultiTrack;
