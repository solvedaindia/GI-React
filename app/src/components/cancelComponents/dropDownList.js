import React from "react";
import {
  MESSAGE_CANCEL,
  DROPDOWN_OPTIONS_COMMON,
  DROPDOWN_OPTIONS_ITEM,
  MESSAGE_TEXTBOX
} from "../../constants/app/cancelConstants";
import { Dropdown } from "react-bootstrap";
debugger;
class DropDownList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelOrderDrop: false,
      cancelLineDrop: false,
      value: "Please choose reason",
      text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleChangeText(event) {
    this.setState({ text: event.target.value });
  }
  handleState() {
    //  this.props.handleParentState(this.state.value,this.state.text);
    console.log(this.state.value, this.state.text);
  }

  render() {
    const { cancelOrderType } = this.props;
    let options = [...DROPDOWN_OPTIONS_COMMON];
    if (cancelOrderType === "item") {
      options = DROPDOWN_OPTIONS_ITEM.concat(options);
    }
    const text = (
      <textarea
        placeholder={MESSAGE_TEXTBOX}
        value={this.state.text}
        onChange={this.handleChangeText}
        rows="1"
        cols="29"
        maxLength="100"
      />
    );

    return (
      <>
        <p>{MESSAGE_CANCEL}</p>
        <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">
              {this.state.value}
              <span className="caret" />
            </button>
            <ul className="dropdown-menu">
              {options.map(myOptions => {
                return (
                  <li className='select-item' value={myOptions} onClick={this.handleChange}>
                    <option>{myOptions}</option>
                  </li>
                );
              })}
            </ul>
           
          {/* <select  className="mdb-select md-form" onChange={this.handleChange} >
                        <option disabled selected value="">Please choose reason</option>
                      { options.map((myOptions)=> {
                          return (
                            <option  value={myOptions}>{myOptions}</option>
                          )}
                        )}
                      
                    </select> */}
        </div>
        <br />
        {this.state.value === "Other" && text}
      </>
    );
  }
}

export default DropDownList;