import React from 'react';

class Dropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownValue: this.props.title
    };
  }

  onSelection = (value) => {
    this.setState({
      dropdownValue: value
    })
    this.state.dropdownValue = value;
    this.props.onSelection(value);
  }

  render() {
    console.log('ddkk')
    return (
      <div>
        <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{this.state.dropdownValue}<span class="caret"></span></button>
          <ul class="dropdown-menu">
            {this.props.data.map(data => {
              return (
                <li onClick={() => this.onSelection(data)}><a>{data}</a></li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default Dropdown;
