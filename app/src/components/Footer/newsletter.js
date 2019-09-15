import React from 'react';
import { Col, Form, FormControl, Button } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import { newsletterAPI } from '../../../public/constants/constants';
import { validateEmptyObject, regexEmail } from '../../utils/validationManager';
import Socialicon from './socialicons';

class newsletter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      successFailItem: null,
    };
  }

  submitNewsLetter() {
    if (!validateEmptyObject(this.state.inputText)) {
      this.setState({
        successFailItem: this.successFailMessageItem('Fail', 'This field is required')
      });
      return;
    }
    if (!regexEmail.test(this.state.inputText)) {
      this.setState({
        successFailItem: this.successFailMessageItem('Fail', 'Invalid Email address')
      });
      return;
    }

    const data = {
      email_id: this.state.inputText,
    };
    apiManager
      .post(newsletterAPI, data)
      .then(response => {
        const data = response.data;
        this.setState({
          inputText: '',
          successFailItem: this.successFailMessageItem('Success')
        });
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        this.setState({
          successFailItem: this.successFailMessageItem('Fail', errorMessage)
        });
      });
  }

  successFailMessageItem(message, erroMsg) {
    setTimeout(() => {
      this.setState({
        successFailItem: null,
      });
    }, 2500);
    if (message === 'Success') {
      return (
        <div className='successMsg'>Thank you for subscribing!</div>
      )
    }
    else {
      return (
        <div className='successMsg'>{erroMsg}</div>
      )
    }
    
  }

  handleInputChange(text) {
    this.setState({
      inputText: text.target.value,
    });
  }

  render() {
    const newsletterHtml = (
      <Col md={12} sm={12} className="newsletter_section">
        {this.props.isFromMobile ? null : (
          <h6 className="heading news_heading">{this.props.name.text}</h6>
        )}
        <ul className="newsletterList">
          {this.props.name.children.map((newsletterDesc, index) => {
            return(<li className="list" key={index}>
              <h6 className="newsletter-heading">{newsletterDesc.text}</h6>
            </li>);
          })}
          <li>
            <Form inline>
              <FormControl
                onChange={this.handleInputChange.bind(this)}
                type="email"
                placeholder="Your email"
                className="email_input"
                value={this.state.inputText}
              />
              <Button
                onClick={this.submitNewsLetter.bind(this)}
                type="button"
                className="btn btn-emailsubmit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="25"
                  viewBox="0 0 29 25"
                >
                  <g fill="none" fillRule="evenodd" stroke="#ffffff">
                    <path strokeWidth="1.892" d="M27 12.7H.2 27z" />
                    <path strokeWidth="1.89" d="M16.7 1.4l10.6 11.3L16.7 24" />
                  </g>
                </svg>
              </Button>
            </Form>
          </li>
          {this.state.successFailItem}
        </ul>
        {this.props.isFromMobile ? null : (
          <ul className="social-Link clearfix">
            <Socialicon name={this.props.socialicon} />
          </ul>
        )}

      </Col>
    );
    return <>{newsletterHtml}</>;
  }
}

export default newsletter;
