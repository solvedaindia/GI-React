import React from 'react';
import apiManager from '../../utils/apiManager';
import { cartRemovePromoAPI } from '../../../public/constants/constants';
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
            <div>
                {promoCode[0]}
            </div>
        <button className="applyBtn" onClick={this.removePromoCode}>
          Remove
        </button>
        {!!error && (
          <div className="promoError">This promo code is not valid.</div>
        )}
      </div>
    );
  }
}

export default AppliedPromoCode;
