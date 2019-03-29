import React from 'react';
import UserLogo from '../SVGs/user';
import WelcomeBack from '../WelcomeBack/index';
import '../../../public/styles/userInfo/userInfo.scss';
class UserAccInfo extends React.Component{
    state = {
        isLoggedIn:'',
        isLoading: true,
        errors: null
    };
    render() {
        return (
            <li className='user icons'>
                <UserLogo />
                <ul className='welcomeDropDown'>
                    <WelcomeBack />
                </ul>
            </li>
        );
    }
}  

export default UserAccInfo;
