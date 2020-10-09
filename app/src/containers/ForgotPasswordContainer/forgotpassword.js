/**
 *
 * Forgot Password
 *
 */

import React from 'react';
import { compose } from 'redux';
import Forgotpassword from '../../components/ForgotPasswordComponent/forgotpassword';
import '../../../public/styles/forgotpassword/forgotpass.scss';

/* eslint-disable react/prefer-stateless-function */
export class ForgotPasswordContainer extends React.Component {
  render() {
    return <Forgotpassword />;
  }
}

export default compose( 
)(ForgotPasswordContainer);
