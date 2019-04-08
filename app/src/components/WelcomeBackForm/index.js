import React, { Component } from "react";
/* Import Components */
import Input from "../Input/input";
import Button from "../Button/button";
import { regexEmail, regexMobileNo, validateEmptyObject } from '../../utils/validationManager';
import Forgotpassowrd from "../ForgotPasswordComponent/forgotpassword";

class WelcomeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: '',
            shown: true,
            errorMessageUserId: null,
            errorMessagePassword: null
        };
    }

    /* Handle Change */
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    /* Handle Validation */
    handleValidation(obj, errorType) {

        let isValidate = errorType;
        const input = String(obj.userId);
        const firstChar = Number(input.charAt(0));

        this.setState({
            errorMessageUserId: null,
            errorMessagePassword: null,
        });
 
        if (!validateEmptyObject(obj.userId)) {
            this.setState({
                errorMessageUserId: 'Please enter valid Email Id/Mobile number'
            });
            isValidate = false;

        } else if (!input.includes('@') && Number.isInteger(firstChar)) {
            if (!regexMobileNo.test(obj.userId)) {
                this.setState({
                    errorMessage: 'Please enter valid Email Id/Mobile number',
                });
                isValidate = false;
            }
            
        } else if (!regexEmail.test(obj.userId)) {
            this.setState({
                errorMessageUserId: 'Please enter valid Email Id/Mobile number',
            });
            isValidate = false;
        }

        if (!validateEmptyObject(obj.password)) {
            this.setState({
                errorMessagePassword: 'Enter a valid password ',
            });
            isValidate = false;
        }

        return isValidate;
    }

    /* Handle Submit */
    handleFormSubmit = (e) => {
        e.preventDefault();
        const isValidate = this.handleValidation(this.state, true);

        if(isValidate === false) {
            return false;
        }

        const data = {
            'user_id': this.state.userId,
            'password': this.state.password
        }
        this.props.handleUserData(data);
    }

    /* Error Messgae */
    errorMessage = (message) => {
        return <p className='error-msg'>{message}</p>
    }
    // handleHide = (e) => {
    //     e.preventDefault();
        
    // }
    render() {
        let errorMessageUserId = null;
        let errorMessagePassword = null;
        if (this.state.errorMessageUserId) {
            errorMessageUserId = this.errorMessage(this.state.errorMessageUserId);
        }
    
        if (this.state.errorMessagePassword) {
            errorMessagePassword = this.errorMessage(this.state.errorMessagePassword);
        }
        return (
            <form className="loginForm" onSubmit={this.handleFormSubmit}>
                <Input
                    type={"text"}
                    title={"ENTER EMAIL/MOBILE NUMBER"}
                    name={"userId"}
                    placeholder={""}
                    onChange={this.handleChange}
                />
                {errorMessageUserId}
                {/* Name or email of the user */}
                <Input
                    type={"password"}
                    name={"password"}
                    title={"PASSWORD"}
                    placeholder={""}
                    onChange={this.handleChange}
                />
                {errorMessagePassword}
                {/* Password of the user */}
                <Forgotpassowrd/>
                <Button
                    type={"primary"}
                    title={"Submit"}
                />
                {/*Submit */}
            </form>
        );
    }
}

export default WelcomeForm;
