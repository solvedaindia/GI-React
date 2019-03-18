import React from 'react';
// import axios from "axios";
import { Switch, Route } from 'react-router-dom';
import RegisterNow from '../RegisterComponent/registerModalData';
// import { cartCountApi, storeId, accessToken } from '../../../public/constants/constants';
import UserLogo from '../SVGs/user';

class UserAccInfo extends React.Component{
    state = {
        isLoggedIn:'',
        isLoading: true,
        errors: null
    };

    getCartCount() {
        // axios
		// .get(cartCountApi, { 'headers': { 'store_id': storeId, 'access_token': accessToken } })
		// .then(response => {
        //     var count = response.data.data.wishlistTotalItems;
		// 	this.setState({
        //         CartCount: count == '0' ? '' : (response.data.data.wishlistTotalItems),
		// 		isLoading: false
        //     });
		// })
		// .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        // this.getCartCount();
    }

    render() {
        // const { isLoading, CartCount } = this.state;
        return (
            <li className='icons'>
                <UserLogo />
                <ul className='accInfo'>
                    <li>
                        <Switch>
                            <Route path='/register' component={RegisterNow}>
                            RegisterNow </Route>
                        </Switch>
                    </li>
                </ul>
            </li>
        );
    }
}  

export default UserAccInfo;
