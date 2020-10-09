import React from "react";

class Checkboxes extends React.Component {
  constructor(props) {
    super(props);
    const options = [];
    // props.data.map((data)=>{
    //     const val = {
    //       text:data,
    //       checked:true,
    //     }
    //     options.push(val)
    // })
    this.state = {
      optionsChecked: [],
      showTextview: true,
      characterCount: 50,
      characterLimit: 50
    };
  }

  changeEvent(event) {
    let checkedArray = this.state.optionsChecked;
    let selectedValue = event.target.value;

    if (event.target.checked === true) {
      if (selectedValue === "Other") {
        this.state.showTextview = true;
      }
      checkedArray.push(selectedValue);
      this.setState({
        optionsChecked: checkedArray
      });
    } else {
      if (selectedValue === "Other") {
        this.state.showTextview = false;
      }
      let valueIndex = checkedArray.indexOf(selectedValue);
      checkedArray.splice(valueIndex, 1);
      this.setState({
        optionsChecked: checkedArray
      });
    }
    this.props.onSelection(checkedArray);
  }

  onTextareaInput() {
    this.setState({
      characterCount: 50 - document.getElementById("textareaSR").value.length
    });
    //this.props.onSelection([document.getElementById('textareaSR').value]);
    this.props.onOtherText(document.getElementById("textareaSR").value);
  }

  renderTextField() {
    return (
      <div className="service-request-desc">
        {/* <p className='heading-desc'>{this.props.title}</p> */}
        <textarea
          className="text-area"
          onChange={() => this.onTextareaInput()}
          name="the-textarea"
          id="textareaSR"
          maxlength={this.state.characterLimit}
          placeholder="Please Specify"
          autofocus
          rows="4"
          cols="80"
        />
        {this.props.error && (
          <div className="error-msg">{this.props.error}</div>
        )}
        <label className="label-text">
          {" "}
          {this.state.characterCount} Character
          {this.state.characterCount <= 1 ? "" : "s"} remaining
        </label>
      </div>
    );
  }

  render() {
    // let outputCheckboxes = this.props.data.map(function (string, i) {
    //   return (
    //     <div className='service-request-box'>
    //       <input className='inputCheck' type="checkbox" id={'string_' + i} value={string} onChange={this.changeEvent.bind(this)} />
    //       <label className='label-text' htmlFor={'string_' + i}> {string}</label>
    //     </div>
    //   )
    // }, this);

    return (
      <div className="service-request-text">
        {/* {outputCheckboxes} */}
        {this.state.showTextview ? this.renderTextField() : null}
      </div>
    );
  }
}
export default Checkboxes;
