import React from 'react';
import apiManager from '../../utils/apiManager';
import { cartApplyPromoAPI } from '../../../public/constants/constants';
import { Button, Modal } from 'react-bootstrap';

class ViewAllPromo extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: null
        }
        this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	applyPromoCode(promoCode) {
        const data = {  
            orderId: this.props.orderID,
            promoCode: promoCode
        }
        apiManager
        .post(cartApplyPromoAPI, data)
        .then(response => {
            this.setState({
                error: null
            })
            this.props.getCartDetails();
            this.handleClose();
            console.log('Promotion Data', response.data.data);
        })
        .catch(error => {
            this.setState({
            error,
            isLoading: false
            });
        });
    }
    /* Handle Modal Close */
	handleClose() {
        this.setState({ show: false,
        error: null });
        
	}

	/* Handle Modal Show */
	handleShow() {
		this.setState({ show: true });
	}
	render(){
        const { promo } = this.props;
        const { error } = this.state;
		return (
            <>
            { !!promo && promo.length>3 && <span className='viewAllPromo' onClick={this.handleShow}>View More</span>}
            <Modal className='modal_emiInstallment viewAllPopUp' show={this.state.show} onHide={this.handleClose}>
				<Modal.Body>
                    {!!error && <div className='promoError'>
                        This promo code is not valid.
                    </div>}
					<Button className="close" onClick={this.handleClose}></Button>
                    <h4 className='heading'>Available Promo codes/Coupons</h4>
                    <ul className='promoList viewAll'>
                        {!!promo && promo.map((sellerItemData, index) => (
                            <li className='promoListItem' key={index}>
                                <p className='promoCode'>{sellerItemData.promocode}</p>
                                <p className='promoDesc'>{sellerItemData.description}</p>
                                <span className='applyPromo' onClick={this.applyPromoCode.bind(this, sellerItemData.promocode)}>Apply</span>
                            </li>
                        ))
                        } 
                    </ul>
                </Modal.Body>
			</Modal>
            </>
		);
	}
}


export default ViewAllPromo;