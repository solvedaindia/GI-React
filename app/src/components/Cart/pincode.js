import React from 'react';
import '../../../public/styles/cart/cartItem.scss';
import appCookie from '../../utils/cookie';
import PinLocationLogo from '../SVGs/pinLocationIcon';
import apiManager from '../../utils/apiManager';
import { pinCodeServiceAPI } from '../../../public/constants/constants';
import { isMobile } from '../../utils/utilityManager';
import EditIcon from '../SVGs/editIcon';
import { is } from 'immutable';

const PINCODE_REGEX = /^[1-9][0-9]{0,5}$/;
class Pincode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
	  pincodeVal: appCookie.get('pincode'),
	  edit: false
    };
  }

	updatePincode(props) {
		const pincode = document.getElementById('pincodeVal').value;
		appCookie.set('pincode', pincode, 365 * 24 * 60 * 60 * 1000);
		this.setState({
			edit: false
		})
		this.getPincodeService();
	}
	editPincode() {
		this.setState({
			edit : true
		})
	}

	handleChange = e => {
			var val = e.target.value;

			if( val === '' || PINCODE_REGEX.test(val)) {
				this.setState({ [e.target.name]: e.target.value,
				edit: true });
			}
	}
	getPincodeService() {
		apiManager
		.get(pinCodeServiceAPI + this.state.pincodeVal)
		.then(response => {
			this.setState({
				error: null
			})
			this.props.getCartDetails();

		})
		.catch(error => {
			this.setState({
			error,
			isLoading: false,
			});
		});
	}


  render() {
	let attrs = {};
	if ( !this.state.edit ) {
		attrs = { readOnly : false }
	}
    return (
		<>
		<div className="pincodeField">
			<span className="pinLogo">
			<PinLocationLogo width={20} height={20} />
			</span>
			<input
				className="pincodeVal"
				className={!this.state.error ? 'pincodeVal' : 'pincodeVal pincodeError'}
				name="pincodeVal"
				id="pincodeVal"
				type="text"
				onChange={this.handleChange}
				value={this.state.pincodeVal}
				{...attrs}
			/>
			{this.state.edit ? 
				<a
				className="pincodeUpdate"
				role="button"
				onClick={this.updatePincode.bind(this, this.props)}
				>
				Done
				</a>
				:
				<a
					className="pincodeEdit"
					role="button"
					onClick={this.editPincode.bind(this, this.props)}
				>
					{!isMobile() ? 'Edit' : 
					<EditIcon />}
				</a>
			}
      	</div>
		{!!this.state.error && <p className='pinErrorMsg'>Pincode is not servicable.</p>}
		</>
    );
  }
}
export default Pincode;
