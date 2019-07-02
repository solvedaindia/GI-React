import React from 'React';
import {
	cartDeleteItemAPI
} from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import DeleteLogo from '../SVGs/deleteIcon';

class DeleteCartItem extends React.Component {
    constructor(props) {
		super(props);
      	this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange() {
	//   this.setState({quantity: event.target.value});
	  this.handleDeleteItem();
	}
	handleDeleteItem() {
		const data = {  
			orderItemId: this.props.orderItemId
		}
		apiManager
        .post(cartDeleteItemAPI, data)
        .then(response => {
			this.props.getCartDetails()
            console.log('@@@@ Cart Delete @@@', response.data.data);
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
        <form className='delCartItem' onClick={this.handleChange}>
			<DeleteLogo width={16} height={16}/>
        </form>
      );
    }
  }
  
  export default DeleteCartItem;