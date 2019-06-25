import React from 'React';
import {
	cartDeleteItemAPI
} from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';

class CartDeleteItem extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			orderItemId: props.orderItemId
		};
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
	//   this.setState({quantity: event.target.value});
	  this.handleCartItemDelete(event.target.value);
	}
	handleCartItemDelete(qty) {
		const data = {  
			orderItem:[
				{  
					orderItemId: this.state.orderItemId
				}
			]
		}
		apiManager
        .post(cartDeleteItemAPI, data)
        .then(response => {
            this.setState({
                quantity: qty,
                isLoading: false,
            });
            console.log('@@@@ Cart Item Delete @@@', response.data.data);
        })
        .catch(error => {
            this.setState({
            error,
            isLoading: false,
            });
        });
	}
    render() {
      return (
        <form className='cartQty' >
			
        </form>
      );
    }
  }
  
  export default CartDeleteItem;