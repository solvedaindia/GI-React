import React from 'react';
import { generateOTPAPI, accessToken, registartionAPI  } from '../../../public/constants/constants';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { validateEmptyObject, validateOTPDigit } from '../../utils/validationManager';
import '../../../public/styles/registerComponent/registerComponent.scss';
import { resendOtp, otpConfirmed } from './constants';

class GenerateOtp extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            errorMessage: null,
            inputText: null,
        }
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
        this.props.handleApi(registartionAPI, data, accessToken, otpConfirmed);       
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
        this.props.handleApi(generateOTPAPI, data, accessToken, resendOtp);
    }

    /*Back on registration component */
    backToRegistrationForm() {
        this.props.componentData('registerWithMobileNum', this.props.userdata);
    }

    render() {
        let errorItem = null;

        if (this.state.error) {
            errorItem = <p className='error-msg otperrorwidth'>{this.state.errorMessage}</p>
        }
        return (
            <div  className='otp_screen'>
            <div className='form_register'>
                <h3 className="heading">Enter One Time Password</h3>
                <Form>
                    <FormGroup>
                        <Button onClick={this.backToRegistrationForm.bind(this)} className='btn-back'>&lt; Back</Button>
                        <p className='text otp-text text-center'>Enter the verification code that has been OTP sent to your mobile number</p>
                        <div className='form-div clearfix'>
                            <input onChange={this.handleInputChange.bind(this)} type="number" name="text" className='form-control margin-none' placeholder="Enter OTP" />
                            {errorItem}
                            <Button onClick={this.resendOTP.bind(this)} className='resend-otp'>Resend OTP</Button>
                        </div>
                    </FormGroup>
                    <FormGroup className='text-center'>
                        <Button onClick={this.handleSubmit.bind(this)} className='btn-bg btn-register'>Register</Button>
                    </FormGroup>
                </Form>
            </div>
            </div>
        )
    }
}

export default GenerateOtp;