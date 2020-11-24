import React from "react";
import RSOItem from "./rsoItem";
class RSODetail extends React.Component {
  constructor(props) {
    super(props);
  }
  onCancelPress() {
    this.props.backPress();
  }
  render() {
    const data = this.props.orderData.returnOrder;
    return (
      <div className="trackMyOrder service-request">
        <div className="bottomDivider">
          <button
            className="backBtn"
            onClick={this.onCancelPress.bind(this)}
          >{`< RETURN DETAILS`}</button>
        </div>
        {data &&
          Array.isArray(data) &&
          data.map(item => {
            if (this.props.returnShipmentOrders.includes(item.returnId)) {
              return <RSOItem data={item} />;
            }
          })}
      </div>
    );
  }
}
export default RSODetail;
