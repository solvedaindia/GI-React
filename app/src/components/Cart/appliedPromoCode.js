import React from 'react';
import apiManager from '../../utils/apiManager';
import { cartRemovePromoAPI } from '../../../public/constants/constants';
import CrossIcon from '../SVGs/crossIcon';
class AppliedPromoCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
    this.removePromoCode = this.removePromoCode.bind(this);
  }

    removePromoCode() {
        apiManager
        .post(cartRemovePromoAPI + this.props.promoCode[0])
        .then(response => {
            this.props.getCartDetails();
            console.log('Promotion Data', response.data.data);
        })
        .catch(error => {
            this.setState({
            error,
            isLoading: false,
            });
        });
    }

  render() {
    const { error } = this.state;
    const { promoCode } = this.props;
    return (
      <div className="promoField">
            <div className='appliedPromoMsg'>
                <span className='promo'>{promoCode[0]}</span> coupon applied.
				<button className="removeBtn" onClick={this.removePromoCode}>
					<CrossIcon />
				</button>
            </div>
			
			{!!error && (
			<div className="promoError">This promo code is not valid.</div>
			)}
      </div>
    );
  }
}

export default AppliedPromoCode;
