import React from 'react';
import apiManager from '../../utils/apiManager';
import { cartRemovePromoAPI } from '../../../public/constants/constants';
import {COUPAN_APPLIED } from '../../constants/app/cartConstants';
import {COUPAN_CODE_NOT_VALID } from '../../constants/app/cartConstants';

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
                <span className='promo'>{promoCode[0]}</span><span> {COUPAN_APPLIED}</span>
				<button className="removeBtn" onClick={this.removePromoCode}>
					<CrossIcon />
				</button>
            </div>
			
			{!!error && (
			<div className="promoError">{COUPAN_CODE_NOT_VALID }</div>
			)}
      </div>
    );
  }
}

export default AppliedPromoCode;
