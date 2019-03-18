
import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup} from 'react-bootstrap';
import { forgotPasswordAPI, storeId, accessToken } from '../../../public/constants/constants';
import { regexPw, validateEmptyObject } from '../../utils/validationManager';

class ForgotPasswordNewPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            loading: true,
            error: false,
            errorMessage: null,
            inputText: null,
            isShowPass: false,
            inputType: 'password',
            validationImage: ''
        }
    }
    doneBtnPressed() {

        if (!validateEmptyObject(this.state.inputText)) {
            this.setState({
                error: true,
                errorMessage: 'Pleaes enter New Password',
            });
            return;
        }

        if (!regexPw.test(this.state.inputText)) {
            this.setState({
                error: true,
                errorMessage: 'Invalid password',
            });
            return;
        }

        this.setState({error: false })
        
        let data = {
            'user_id': this.props.userIdPro,
            'otp': this.props.otpPro,
            'new_password': this.state.inputText
        }
        axios.post(forgotPasswordAPI, data, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {

            const passData = response.data.data;
            alert('Password changed successfully!');
            const nextComp = 'NewPasswordSuccess'
            this.props.handlerPro(nextComp, null, null)

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

    showHidePass() {
        if (this.state.isShowPass) {
            this.setState({
                isShowPass: false,
                inputType: 'password'
            });
        }
        else {
            this.setState({
                isShowPass: true,
                inputType: 'text'
            });
        }
    }

    render() {
        let errorItem;
        if (this.state.error) {
            errorItem = <p className='error-msg'>{this.state.errorMessage}</p>
        } else {
            errorItem = null;
        }

        return (
            <div className='rightAnim'>
                <h3 className="heading">Set New Password</h3>
                <Form>
                    <FormGroup>
                        <p className='text'>ENTER NEW PASSWORD</p>
                        <div className='form-div clearfix'>
                            <input onChange={this.handleInputChange.bind(this)} type={this.state.inputType} name="text" id="exampleEmail" className='form-control newinputmargin' placeholder="Enter New Password" />
                            {errorItem}
                            <span onClick={this.showHidePass.bind(this)} className='valiationPosition-NewPassword'>{<img src={require('../../../public/images/eye.svg')} />}</span>
                        </div>                        
                        <Button onClick={this.doneBtnPressed.bind(this)} className='btn-block btn-bg'>DONE</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}



export default ForgotPasswordNewPassword;