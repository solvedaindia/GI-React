import React from 'react';
import { generateOTPAPI, registartionAPI  } from '../../../public/constants/constants';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { validateEmptyObject, validateOTPDigit } from '../../utils/validationManager';
import '../../../public/styles/registerComponent/registerComponent.scss';
import { resendOtp, otpConfirmed } from './constants';

const LeftArrow = (
    <img className='leftArrow'
      src={require('../../../public/images/left-arrow.png')}
    />
  );

class GenerateOtp extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            errorMessage: null,
            inputText: null,
        }
        this.callbackFunc = this.callbackFunc.bind(this);
    }

    /* Handle Submit */
    handleSubmit() {
        if (!validateEmptyObject(this.state.inputText)) {
            this.setState({
                error: true,
                errorMessage: 'Please enter OTP',
            });
            return;
        }

        if (!validateOTPDigit(this.state.inputText)) {
            this.setState({
                error: true,
                errorMessage: 'Pleaes enter 4 digit OTP',
            });
            return;
        }
        
        let data = this.props.userdata;
        Object.assign(data, {'otp': String(this.state.inputText)});
        this.props.handleApi(registartionAPI, data, otpConfirmed, this.callbackFunc);       
    }

    handleInputChange(text) {
        this.setState({
            inputText: text.target.value,
        });
    }

    /* Resend OTP */
    resendOTP() {
        let data = {
            'user_id': this.props.userdata.user_id,
            'resend': true
        }
        this.props.handleApi(generateOTPAPI, data, resendOtp, this.callbackFunc);
    }

    /*Back on registration component */
    backToRegistrationForm() {
        this.props.componentData('registerWithMobileNum', this.props.userdata);
    }

    callbackFunc(errorMsg) {
        this.setState({
            error: true,
            errorMessage: errorMsg,
        });
    }

    render() {
        let errorItem = null;
        let isErrorExist = false;
        if (this.state.errorMessage && this.state.errorMessage.includes("maximum")) {
            isErrorExist = this.state.errorMessage.includes("maximum");
        } 
        
        
        if (this.state.error) {
            errorItem = <p className='error-msg otperrorwidth'>{this.state.errorMessage}</p>
        }
        return (
            <div  className='otp_screen'>
            <div className='form_register'>
           
                { isErrorExist === true ? (
                    <>
                        <h3 className="heading"></h3>
                        <Form>
                            <div className='form-div clearfix'>{errorItem}</div>
                            <FormGroup className='text-center'>
                                <Button onClick={this.backToRegistrationForm.bind(this)} className='btn-bg btn-register btn-block'>Back</Button>
                            </FormGroup>
                        </Form>
                    </>
                ):(
                <>
                    <h3 className="heading">Enter One Time Password</h3>
                    <Form>
                        <FormGroup>
                            <Button onClick={this.backToRegistrationForm.bind(this)} className='btn-back'>{LeftArrow}</Button>
                            <p className='text otp-text text-center'>Enter the verification code that has been OTP sent to your mobile number</p>
                            <div className='form-div clearfix'>
                                <input onChange={this.handleInputChange.bind(this)} type="number" name="text" className='form-control margin-none' placeholder="Enter OTP" />
                                {errorItem}
                                <Button onClick={this.resendOTP.bind(this)} className='resend-otp'>Resend OTP</Button>
                            </div>
                        </FormGroup>
                        <FormGroup className='text-center'>
                            <Button onClick={this.handleSubmit.bind(this)} className='btn-bg btn-register btn-block'>Register</Button>
                        </FormGroup>
                    </Form>
                </>
                )}
            </div>
            </div>
        )
    }
}

export default GenerateOtp;