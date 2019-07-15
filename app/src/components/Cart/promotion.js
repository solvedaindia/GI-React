import React from 'react';
import {
  cartGetPromoAPI,
  cartApplyPromoAPI,
} from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import ViewAllPromo from './viewAllPromo';

class GetCartPromo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promo: null,
      isLoading: false,
      viewAll: false,
      error: null,
    };
  }

  componentDidMount() {
    this.handlePromotion();
  }

  handlePromotion() {
    apiManager
      .get(cartGetPromoAPI)
      .then(response => {
        this.setState({
          promo: response.data.data,
          isLoading: false,
        });
        console.log('Promotion Data', response.data.data);
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  applyPromoCode(promoCode) {
    const data = {
      orderId: this.props.orderID,
      promoCode,
    };
    apiManager
      .post(cartApplyPromoAPI, data)
      .then(response => {
        this.setState({
          promoCode: response.data.data,
          error: null,
        });
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
    const { promo, error } = this.state;
    return (
      <div className="promo">
        {!!error && (
          <div className="promoError">This promo code is not valid.</div>
        )}
        <ul className="promoList">
          {!!promo &&
            promo.slice(0, 3).map((sellerItemData, index) => (
              <li className="promoListItem" key={index}>
                <p className="promoCode">{sellerItemData.promocode}</p>
                <p className="promoDesc">{sellerItemData.description}</p>
                <span
                  className="applyPromo"
                  onClick={this.applyPromoCode.bind(
                    this,
                    sellerItemData.promocode,
                  )}
                >
                  Apply
                </span>
              </li>
            ))}
        </ul>
        <ViewAllPromo
          orderID={this.props.orderID}
          getCartDetails={this.props.getCartDetails}
          promo={promo}
        />
      </div>
    );
  }
}

export default GetCartPromo;
