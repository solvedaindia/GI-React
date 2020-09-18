import React from "react";

class AddressList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_add: 0
    };
  }

  handleAddressChange(index) {
    this.setState({
      selected_add: index
    });
    this.props.onSelection(this.props.data[index]);
  }

  renderAddressList = () => {
    if (this.props.data !== null) {
      var list = [];
      this.props.data.forEach((add, index) => {
        list.push(
          <li
            className={add.isDefault ? "list defaultAddress" : "list"}
            onClick={this.handleAddressChange.bind(this, index)}
          >
            <div className="inputBox">
              <input
                className="input"
                type="radio"
                name="optradio"
                value={index}
                checked={this.state.selected_add == index}
              />
              <label className="labelchecked" />
            </div>
            <div className="addressText">
              {add.address1}
              <br />
              {add.address2}
              <br />
              {add.address3 && (
                <>
                  {add.address3}
                  <br />
                </>
              )}
              {`${add.city}, ${add.state}, ${add.pincode}`}
            </div>
          </li>
        );
      });
      return <ul className="saveAddress customradio clearfix">{list}</ul>;
    }
  };

  render() {
    return <>{this.renderAddressList()}</>;
  }
}
export default AddressList;
