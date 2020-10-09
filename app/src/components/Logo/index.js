/**
 *
 * Logo
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

class Logo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      textImage: null,
      logoImage: null,
    };

  }

  render() {
    return (
      <div className="logo">
        <Link to="/">
          <figure className="header__topBar_logo">
            <img className='logo-with-gradient' src={this.props.logoImage}  alt='Godrej Interio'/>
            <img className='logo-text' src={this.props.textImage}  alt='Godrej Interio'/>
          </figure>
        </Link>
      </div>
    );

  }

}

Logo.propTypes = {};

export default Logo;
