import React from 'react';

class Promotions extends React.Component {
  render() {
    return (
      <p className="emi-text text">
        {this.props.data}
        <br />
        <span className="bold">10% Off</span> Free accessories
      </p>
    );
  }
}

export default Promotions;
