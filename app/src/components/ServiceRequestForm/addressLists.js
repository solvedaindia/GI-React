import React from "react";

class AddressList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_add: 0,
      more: false,
    };
  }

  handleAddressChange(index) {
    this.setState({
      selected_add: index
    });
    this.props.onSelection(this.props.data[index]);
  }
  toggleViewMore() {
    this.setState({
      more: !this.state.more,
    });
  }

  renderAddressList = () => {
    if (this.props.data !== null) {
      var flag = true;
      var list = [];
      this.props.data.forEach((add, index) => {
        list.push(
          <li
            style={{display: (index>2 ? this.state.more ?'block':'none':'block')}}
            className={(add.isDefault && flag) || add.default === 'true' ? "list defaultAddress" : "list"}
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
        if (add.default === 'true') {
          flag = false;
        }
      });
      return <ul className="saveAddress customradio clearfix">{list}</ul>;
    }
  };

  render() {
    return (
      <>
        {this.renderAddressList()}
        {Array.isArray(this.props.data) && this.props.data.length >= 4 &&
         <a href="javascript:void(0)" className="text-uppercase viewMoreAddress" onClick={this.toggleViewMore.bind(this)}>
         {this.state.more ? 'View Less' : 'View More'}
       </a>
        }
       
      </>
    );
  }
}
export default AddressList;
