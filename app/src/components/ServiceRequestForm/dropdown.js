import React from "react";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownValue: this.props.title
    };
  }

  onSelection = (value, index) => {
    this.setState({
      dropdownValue: value
    });
    this.state.dropdownValue = value;
    this.props.onSelection(value, index);
  };

  render() {
    return (
      <div>
        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            {this.state.dropdownValue}
            <span className="caret" />
          </button>
          <ul className="dropdown-menu">
            {Array.isArray(this.props.data) &&
              this.props.data.map((data, i) => {
                return (
                  <li onClick={() => this.onSelection(data, i)}>
                    <a>{data}</a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}
export default Dropdown;
