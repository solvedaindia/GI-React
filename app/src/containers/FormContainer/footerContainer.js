import React, { Component } from 'react';

/* Import Components */
import Input from '../../components/Primitives/input';
import Button from '../components/Button';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        name: '',
        password: '',
      },
    };
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleFullName = this.handleFullName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleFullName(e) {
    const value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          name: value,
        },
      }),
      () => console.log(this.state.newUser),
    );
  }

  handleInput(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value,
        },
      }),
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const userData = this.state.newUser;

    fetch('http://example.com', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      response.json().then(data => {
      });
    });
  }

  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <Input
          inputType="text"
          title="Full Name"
          name="name"
          value={this.state.newUser.name}
          placeholder="Enter your name"
          handleChange={this.handleInput}
        />{' '}
        {/* Name of the user */}
        <Input
          inputType="password"
          name="age"
          title="Age"
          value={this.state.newUser.age}
          placeholder="Enter your age"
          handleChange={this.handleAge}
        />{' '}
        {/* Age */}
        <Button
          action={this.handleFormSubmit}
          type="primary"
          title="Submit"
          style={buttonStyle}
        />{' '}
        {/* Submit */}
      </form>
    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px',
};

export default FormContainer;
