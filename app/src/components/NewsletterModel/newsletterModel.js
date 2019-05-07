/**
 *
 * newsletterModel
 *
 */

import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  FormGroup,
  Label,
} from 'react-bootstrap';
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

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount () {
    let now = new Date();
      var minutes = 21600; // -> 21600 minuts equals to 15 days
      now.setTime(now.getTime() + (minutes * 60 * 1000));

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
        errorMessage: 'Pleaes enter New Password',
      });
      return;
    }

    if (!regexEmail.test(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: 'Invalid Email address',
      });
      return
    }

    this.setState({ error: false })

    let data = {
      'email_id': this.state.inputText,
    }
    apiManager.post(newsletterAPI, data).then(response => {
      const data = response.data;

      let now = new Date();
      var minutes = 21600; // -> 21600 minuts equals to 15 days
      now.setTime(now.getTime() + (minutes * 60 * 1000));

      document.cookie = `${newsletterTokenCookie}=${getCookie(accessTokenCookie)};path=/;expires=${now.toGMTString()}`;
      this.setState({ inputText: '' })
      this.toggle();
      alert(`Newsletter Subscription - ${data.status}`);
    }).catch(error => {
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
      errorItem = <p className='error-msg'>{this.state.errorMessage}</p>
    } else {
      errorItem = null;
    }
    return (
      <Modal className='newsletter-Wrapper' show={this.state.modal} onHide={this.toggle}>
        <Modal.Body>
          <Button className="close" onClick={this.toggle}></Button>
          <Row className='no-margin'>
            <Col xs={12} md={5} className='no-padding'>
              <div className='Thumbnailbox'>
                <img className='imgfullwidth' src={NewsletterThumbnailImg} />
              </div>
            </Col>

            <Col xs={12} md={7}>
              <div className='form_newsletter'>
                <h3 className="heading">Have you joined our mailing list yet?</h3>
                <Form>
                  <p className='signup-text'>Sign up to be the first to recieve updates and ongoing offers!</p>
                  <FormGroup className='email'>
                    <input onChange={this.handleInputChange.bind(this)} type={this.state.inputType} name="text" id="exampleEmail" className='form-control newinputmargin' placeholder='Your Email' />
                    {errorItem}
                  </FormGroup>
                  <FormGroup>
                    <Button onClick={this.doneBtnPressed.bind(this)} className='btn-block btn-bg'>Submit</Button>
                  </FormGroup>
                </Form>
              </div>
            </Col>
          </Row>                      
            
        </Modal.Body >
      </Modal >
    );
  }
}

export default NewsletterModel;
