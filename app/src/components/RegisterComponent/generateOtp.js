import React from 'react';
import { generateOTPAPI, registartionAPI  } from '../../../public/constants/constants';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { validateEmptyObject, validateOTPDigit } from '../../utils/validationManager';
import '../../../public/styles/registerComponent/registerComponent.scss';
import { resendOtp, otpConfirmed } from './constants';
import { isMobile } from '../../utils/utilityManager';
import {ENTER_OTP ,RESEND_OTP, VERIFICATION_CODE, XXXX_SENT,REGISTER} from '../../constants/app/primitivesConstants';

const LeftArrow = (
    <img className='leftArrow'
      src={require('../../../public/images/left-arrow.png')}  alt="Left"
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
    handleSubmit(e) {
        e.preventDefault();
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
                errorMessage: 'OTP entered is incorrect',
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
            'resend': 'true'
        }
        this.props.handleApi(generateOTPAPI, data, resendOtp, this.callbackFunc);
    }

    /*Back on registration component */
    backToRegistrationForm() {
        this.props.componentData('registerWithMobileNum', this.props.userdata);
    }

    backToGenerateOtp() {
        this.setState({
            errorMessage: null
        })
        this.props.componentData('generateOtp', this.props.userdata);
    }

    callbackFunc(errorMsg) {
        this.setState({
            error: true,
            errorMessage: errorMsg,
        });
    }

    render() { 
        const userId = this.props.userdata.user_id;
        let errorItem = null;
        let isErrorExist = false;
        let content = null;
        if (this.state.errorMessage && this.state.errorMessage.includes("maximum")) {
            isErrorExist = this.state.errorMessage.includes("maximum");
        }
        
        if (this.state.error) 
        {
            if(isMobile())
            {
                errorItem = <p className='error-msg otperrorwidth'>{this.state.errorMessage}</p>
            }
            else{
                errorItem = <div className='col-md-7'><p className='error-msg-otp-web'>{this.state.errorMessage}</p></div>
            }
               
        }
        if(isMobile())
        {
            content = (<>{errorItem}<Button onClick={this.resendOTP.bind(this)} className='resend-otp'>{RESEND_OTP}</Button></>)
        }
        else{
            if(errorItem==null)
                errorItem = (<div className="col-md-7"><p className='error-msg-otp-web'> </p></div>)
            
            content = (<div className="row">
                        {errorItem}
                        <div className="col-md-5">
                            <Button onClick={this.resendOTP.bind(this)} className='resend-otp-web'>{RESEND_OTP}</Button>
                        </div>
                       </div>)   
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
                                <Button onClick={this.backToGenerateOtp.bind(this)} className='btn-bg btn-register btn-block'>Back</Button>
                            </FormGroup>
                        </Form>
                    </>
                ):(
                <>
                    <h3 className="heading">{ENTER_OTP}</h3>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormGroup className='otp-verification'>
                            <Button onClick={this.backToRegistrationForm.bind(this)} className='btn-back'>{LeftArrow}</Button>
                            <p className='text otp-text'>{VERIFICATION_CODE}</p>
                            <div className='form-div clearfix'>
                                <label for="otp" className="form-label">{XXXX_SENT}{userId.substr(userId.length - 4)}</label>
                                <input onChange={this.handleInputChange.bind(this)} type="number" name="text" className='form-control margin-none' placeholder="Enter OTP" />
                                {/* {errorItem}
                                <Button onClick={this.resendOTP.bind(this)} className='resend-otp'>{RESEND_OTP}</Button> */}
                                {content}
                            </div>
                        </FormGroup>
                        <FormGroup className='text-center'>
                            <Button onClick={this.handleSubmit.bind(this)} className='btn-bg btn-register btn-block'>{REGISTER}</Button>
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