
import React from 'react';
import axios from 'axios';
import { generateOTPAPI, storeId, accessToken } from '../../../public/constants/constants';
import { Button, Form, FormGroup, Label } from 'react-bootstrap';
import { regexEmail, regexMobileNo, validateEmptyObject } from '../../utils/validationManager';
import LoadingIndicator from '../../utils/loadingIndicator';

class ForgotPasswordEmailMobile extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            loading: true,
            error: false,
            errorMessage: null,
            inputText: null,
            isValidate: false,
        }
    }

    proceedBtnPressed() {
        if (!validateEmptyObject(this.state.inputText)) {
            this.setState({
                error: true,
                errorMessage: 'Please enter Email or Mobile Number',
                isValidate: false,
            });
            return;
        }

        var input = String(this.state.inputText);
        var firstChar = Number(input.charAt(0));
        if (!input.includes('@') && Number.isInteger(firstChar)) {
            if (!regexMobileNo.test(this.state.inputText)) {
                this.setState({
                    error: true,
                    errorMessage: 'Invalid Mobile Number',
                    isValidate: false,
                });
                return;
            }
        }
        else {
            if (!regexEmail.test(this.state.inputText)) {
                this.setState({
                    error: true,
                    errorMessage: 'Invalid Email address',
                    isValidate: false,
                });
                return;
            }
        }

        this.setState({
            isValidate: true,
        });

        let data = {
            'user_id': this.state.inputText,
            'forgot_password': 'true'
        }
        axios.post(generateOTPAPI, data, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
            const otpValue = response.data.data;
            alert('OTP - ' + otpValue.otpVal);
            const nextComp = 'ForgotPasswordOTP'
            this.props.handlerPro(nextComp, this.state.inputText, null);
        }).catch(error => {
            const errorData = error.response.data
            const errorMessage = errorData.error.error_message
            this.setState({
                error: true,
                errorMessage: errorMessage,
            });
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

        let validateImg;
        if (this.state.isValidate) {
            validateImg = <img className='checkmarkImg' src={require('../../../public/images/checkmark.svg')} />
        } else {
            validateImg = null;
        }

        return (
            <>
                <h3 className="heading">Forgot password</h3>
                <Form >
                    <FormGroup>
                        <Label className='label' htmlFor="exampleEmail">Enter Email id/mobile number</Label>
                        <div className='form-div clearfix'>
                            <input onChange={this.handleInputChange.bind(this)} type="email" name="email" id="exampleEmail" className='form-control' placeholder="example@mail.com/9999999999" />
                            <span className='valiationPosition'>{validateImg}</span>
                            {errorItem}
                        </div>
                        {/* <p className='text'>An OTP will be sent to this email address </p> */}
                        {/* <Button onClick={this.proceedBtnPressed.bind(this)} className='btn btn-block btn-bg'>Proceed</Button> */}
                    </FormGroup>
                    <FormGroup>
                        <p className='text text-emailotp'>An OTP will be sent to this email address </p>
                        <Button onClick={this.proceedBtnPressed.bind(this)} className='btn-block btn-bg'>Proceed</Button>
                    </FormGroup>
                </Form>
            </>
        )
    }



}



export default ForgotPasswordEmailMobile;