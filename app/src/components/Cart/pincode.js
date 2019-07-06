import React from 'react';
import '../../../public/styles/cart/cartItem.scss';
import appCookie from '../../utils/cookie';
import PinLocationLogo from '../SVGs/pinLocationIcon';
class Pincode extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            error: null,
            pincodeVal: appCookie.get('pincode')
        }
    }
    updatePincode(props) {
        const pincode = document.getElementById('pincodeVal').value;
        appCookie.set('pincode', pincode, 365 * 24 * 60 * 60 * 1000);
        this.quantity = 1;
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div className='pincodeField'>
                <span className='pinLogo'><PinLocationLogo width={12} height={13} /></span>
                <input
                    className="pincodeVal"
                    name="pincodeVal"
                    id="pincodeVal"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.pincodeVal}
                />
                <a
                    className="pincodeEdit"
                    id="edit"
                    role="button"
                    onClick={this.updatePincode.bind(this, this.props)}
                >
                    Edit
                </a>
            </div>
        )
    }
}
export default Pincode;