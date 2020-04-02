import React from 'react';

class Checkboxes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      optionsChecked: [],
      showTextview: false,
      characterCount: 100,
      characterLimit: 100
    };
  }

  changeEvent(event) {
    let checkedArray = this.state.optionsChecked;
    let selectedValue = event.target.value;

    if (event.target.checked === true) {
      if (selectedValue === 'Other') {
        this.state.showTextview = true;
      }
      checkedArray.push(selectedValue);
      this.setState({
        optionsChecked: checkedArray
      });
    }
    else {
      if (selectedValue === 'Other') {
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
      characterCount: 100 - document.getElementById('textareaSR').value.length,
    })
    this.props.onSelection([document.getElementById('textareaSR').value]);
  }

  renderTextField() {
    return (
      <div>
        <h5>{this.props.title}</h5>
        <textarea onChange={() => this.onTextareaInput()} style={{ 'border-color': '#dfe0de', padding: '5px', outline: 'none', resize: 'none' }} name="the-textarea" id="textareaSR" maxlength={this.state.characterLimit} placeholder="Please Specify" autofocus rows='4' cols='50'></textarea>
        <label>{this.state.characterCount} Character{this.state.characterCount <= 1 ? '' : 's'} remaining</label>
      </div>
    )
  }

  render() {
    let outputCheckboxes = this.props.data.map(function (string, i) {
      return (
        <div>
          <input type="checkbox" id={'string_' + i} value={string} onChange={this.changeEvent.bind(this)} />
          <label htmlFor={'string_' + i}> {string}</label>
        </div>
      )
    }, this);

    return (
      <div>
        {outputCheckboxes}
        {this.state.showTextview ? this.renderTextField() : null}
      </div>
    )
  }
}
export default Checkboxes;
