/**
 *
 * newsletterModel
 *
 */

import React from 'react';
import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  FormGroup,
  Label,
} from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/newsletterModel/newsletterModel.scss';
import {
  newsletterAPI,
  storeId,
  newsletterTokenCookie,
  accessToken,
  accessTokenCookie,
} from '../../../public/constants/constants';
import { getCookie } from '../../utils/utilityManager';
import { regexEmail, validateEmptyObject } from '../../utils/validationManager';

import NewsletterThumbnailImg from '../../../public/images/newsletter_thumbnail.png';
import newsLetterMobPopupImg from '../../../public/images/news-letter_01.png';
import { isMobile } from '../../utils/utilityManager';
class NewsletterModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      data: {},
      loading: true,
      error: false,
      errorMessage: null,
      inputText: null,

      show: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) { }

  componentDidMount() {
    const now = new Date();
    const minutes = 21600; // -> 21600 minuts equals to 15 days
    now.setTime(now.getTime() + minutes * 60 * 1000);

    document.cookie = `${newsletterTokenCookie}=${null};path=/;expires=${now.toGMTString()}`;
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  doneBtnPressed() {
    if (!validateEmptyObject(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: 'This field is required',
      });
      return;
    }

    if (!regexEmail.test(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: 'Invalid Email address',
      });
      return;
    }

    this.setState({ error: false });

    const data = {
      email_id: this.state.inputText,
    };
    apiManager
      .post(newsletterAPI, data)
      .then(response => {
        const data = response.data;

        const now = new Date();
        const minutes = 21600; // -> 21600 minuts equals to 15 days
        now.setTime(now.getTime() + minutes * 60 * 1000);

        document.cookie = `${newsletterTokenCookie}=${getCookie(
          accessTokenCookie,
        )};path=/;expires=${now.toGMTString()}`;
        this.setState({ inputText: '' });
        this.toggle();
        alert(`Thanks for Subscribing`);
      })
      .catch(error => {
        console.log('newsError---', error);
      });
  }

  handleInputChange(text) {
    this.setState({
      error: false,
      inputText: text.target.value,
    });
  }

  render() {
    let errorItem;
    if (this.state.error) {
      errorItem = <p className="error-msg">{this.state.errorMessage}</p>;
    } else {
      errorItem = null;
    }
    return (
      <Modal
        className="newsletter-Wrapper"
        show={this.state.modal}
        onHide={this.toggle}
      >
        <Modal.Body>
          <Button className="close" onClick={this.toggle} />
          <Row className="no-margin">
            <Col xs={12} md={5} className="no-padding">
              <div className="Thumbnailbox">
                {!isMobile() ? <img className="imgfullwidth" src={NewsletterThumbnailImg} /> : <img className="imgfullwidth" src={newsLetterMobPopupImg} />}
              </div>
            </Col>

            <Col xs={12} md={7} className='newsletter-form-box'>
              <div className="form_newsletter">
                {!isMobile() ? <h3 className="heading">
                  Have you joined our mailing list yet?
                </h3> : ''}
                <Form className='news-letter-form'>
                  {!isMobile() ? <p className="signup-text">
                    'Be the first to receive updates on offers, new arrivals and more.'
                  </p> : ''}
                  {isMobile() ? <h3 className="heading">
                    Have you joined our mailing list yet?
                  </h3> : ''}
                  <FormGroup className="email">
                    {isMobile() ? <label className='form-label'>Email Address</label> : ''}
                    <input
                      onChange={this.handleInputChange.bind(this)}
                      type={this.state.inputType}
                      name="text"
                      id="exampleEmail"
                      className="form-control newinputmargin"
                      placeholder={!isMobile() ? 'Email Address' : ''}
                    />
                    {errorItem}
                  </FormGroup>
                  <FormGroup className='news-letter-btn'>
                    <Button
                      onClick={this.doneBtnPressed.bind(this)}
                      className="btn-block btn-bg"
                    >
                      Submit
                    </Button>
                  </FormGroup>
                </Form>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewsletterModel;
